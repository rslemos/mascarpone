import { Inject } from '@angular/core';

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

    // apply masking
    const result0 = this._mask.mask(value);
    const result = makeFull(value, result0, selectionStart, selectionEnd, selectionDirection);

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
