import { Inject } from '@angular/core';
import { Optional } from '@angular/core';

import { SelectionDirection } from './mask-fn';
import { MASK } from './mask-fn';
import { Mask } from './mask-fn';
import { MaskFn } from './mask-fn';
import { makeFull } from './lcs';

export abstract class AbstractMaskFnCaller implements Mask {
  public maskFn: MaskFn;

  mask(value: string, selectionStart: number, selectionEnd: number, selectionDirection: SelectionDirection): string | {
    value: string,
    selectionStart: number,
    selectionEnd: number,
    selectionDirection: SelectionDirection,
  } {
    if (this.maskFn) {
      const maskFn = this.maskFn; // avoids binding a reference to the directive to `this`
      return maskFn(value, selectionStart, selectionEnd, selectionDirection);
    }

    throw new Error('either a masking function or a masking component should be provided');
  }
}

export abstract class AbstractMaskingDirective extends AbstractMaskFnCaller {
  protected abstract readonly _directiveName: string;

  public set maskon(maskfn: '' | MaskFn) {
    if (maskfn === '') {
      this.maskFn = null;
      return;
    }

    if (this._mask !== this) {
      throw new Error(`cannot set ${this._directiveName} with another masking component already set`);
    }

    this.maskFn = maskfn;
  }

  constructor(
    @Optional() @Inject(MASK) private _mask: Mask
  ) {
    super();
    this._mask = this._mask || this;
  }

  protected maskImmediately(event: UIEvent) {
    const target = <HTMLInputElement>event.target;

    // extract data
    const {value, selectionStart, selectionEnd, selectionDirection} = target;
    const selectionDirection0: SelectionDirection =
      ['forward', 'backward', 'none'].indexOf(selectionDirection) >= 0
        ? <SelectionDirection>selectionDirection
        : null;

    // apply masking
    let result = this._mask.mask(value, selectionStart, selectionEnd, selectionDirection0);
    if (typeof result === 'string') {
      result = makeFull(value, result, selectionStart, selectionEnd, selectionDirection0);
    }

    if (target.value === result.value &&
      target.selectionStart === result.selectionStart &&
      target.selectionEnd === result.selectionEnd &&
      target.selectionDirection === result.selectionDirection) {
      return;
    }

    // inject data
    if (target.setSelectionRange) {
      target.value = result.value;
      target.setSelectionRange(result.selectionStart, result.selectionEnd, result.selectionDirection);
    } else {
      ({
          value: target.value,
          selectionStart: target.selectionStart,
          selectionEnd: target.selectionEnd,
          selectionDirection: target.selectionDirection
      } = result);
    }

    // value/selection changed; redispatch event
    target.dispatchEvent(event);
  }
}
