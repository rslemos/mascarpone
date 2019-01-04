import { Inject } from '@angular/core';

import { SelectionDirection } from './mask-fn';
import { MASK } from './mask-fn';
import { Mask } from './mask-fn';
import { makeFull } from './lcs';

export abstract class AbstractMaskingDirective {
  constructor(
    @Inject(MASK) private _mask: Mask
  ) {
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
    const result0 = this._mask.mask(value);
    const result = makeFull(value, result0, selectionStart, selectionEnd, selectionDirection0);

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
