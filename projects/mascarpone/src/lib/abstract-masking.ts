import { Inject } from '@angular/core';
import { Optional } from '@angular/core';

import { MASK } from './mask-fn';
import { Mask } from './mask-fn';
import { MaskFn } from './mask-fn';
import { makeFull } from './lcs';

export abstract class AbstractMaskFnCaller implements Mask {
  public maskFn: MaskFn;

  mask(value: string, selectionStart: number, selectionEnd: number, selectionDirection: string): string | {
    value: string,
    selectionStart: number,
    selectionEnd: number,
    selectionDirection: string,
  } {
    if (this.maskFn) {
      return this.maskFn(value, selectionStart, selectionEnd, selectionDirection);
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
    @Optional() @Inject(MASK) private _mask: Mask | MaskFn
  ) {
    super();
    this._mask = this._mask || this;
  }

  protected maskImmediately(event: UIEvent) {
    const target = <HTMLInputElement>event.target;

    // extract data
    const {value, selectionStart, selectionEnd, selectionDirection} = target;

    // apply masking
    let result;
    if ((<Mask>this._mask).mask !== undefined) {
      result = (<Mask>this._mask).mask(value, selectionStart, selectionEnd, selectionDirection);
    } else {
      result = (<MaskFn>this._mask)(value, selectionStart, selectionEnd, selectionDirection);
    }

    if (typeof result === 'string') {
      result = makeFull(value, result, selectionStart, selectionEnd, selectionDirection);
    }

    if (target.value === result.value &&
      target.selectionStart === result.selectionStart &&
      target.selectionEnd === result.selectionEnd &&
      target.selectionDirection === result.selectionDirection) {
      return;
    }

    // inject data
    ({
        value: target.value,
        selectionStart: target.selectionStart,
        selectionEnd: target.selectionEnd,
        selectionDirection: target.selectionDirection
    } = result);

    // value/selection changed; redispatch event
    target.dispatchEvent(event);
  }
}
