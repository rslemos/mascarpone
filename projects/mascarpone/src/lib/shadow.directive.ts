import { Directive } from '@angular/core';
import { Input } from '@angular/core';

import { MaskShadow } from './mask-shadow';
import { MASKSHADOW } from './mask-shadow';

@Directive({
  selector: '[maskShadow]',
  providers: [
    {provide: MASKSHADOW, useExisting: ShadowDirective, multi: false},
  ]
})
export class ShadowDirective implements MaskShadow {
  // tslint:disable-next-line:no-input-rename
  @Input('maskShadow') public maskshadow = '';
}
