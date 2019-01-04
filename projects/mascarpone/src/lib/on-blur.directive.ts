import { Directive } from '@angular/core';

import { AbstractMaskingDirective } from './abstract-masking';

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
  selector: '[maskOnBlur]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(blur)': 'maskImmediately($event)',
  },
  // tslint:disable-next-line:use-input-property-decorator
  inputs: [ 'maskon: maskOnBlur', ],
})
export class OnBlurDirective extends AbstractMaskingDirective {
  protected readonly _directiveName = 'maskOnBlur';
}
