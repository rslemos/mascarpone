import { Inject } from '@angular/core';

import { MASK } from './mask-fn';
import { Mask } from './mask-fn';

export abstract class AbstractMaskingDirective {
  constructor(
    @Inject(MASK) private _mask: Mask
  ) {
  }

  protected maskImmediately(event: UIEvent) {
    const target = <HTMLInputElement>event.target;

    // extract data
    const {value} = target;

    // apply masking
    const result = this._mask.mask(value);

    if (target.value === result) {
      return;
    }

    // inject data
    target.value = result;

    // value/selection changed; redispatch event
    target.dispatchEvent(event);
  }
}
