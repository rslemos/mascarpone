import { Directive } from '@angular/core';
import { Inject } from '@angular/core';
import { HostListener } from '@angular/core';

import { MASK } from './mask-fn';
import { Mask } from './mask-fn';

/**
 * @description
 * Input masking capabilities for `<input type="text">` elements. The mask is
 * applied when the element loses focus.
 *
 * @usageNotes
 *
 * ### Using the mask on blur
 *
 * The following example shows how to use mask on blur on an `<input>` element:
 *
 * ```
 * <input type="text" maskOnBlur>
 * ```
 *
 * The actual {@link MASK} must be provided externally, as an implementation of
 * the {@link Mask} interface.
 *
 * @ngModule MascarponeModule
 * @publicApi
 */
@Directive({
  selector: '[maskOnBlur]'
})
export class OnBlurDirective {
  constructor(
    @Inject(MASK) private _mask: Mask
  ) {
  }

  @HostListener('blur', ['$event'])
  blur(event: UIEvent) {
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
