import { Directive } from '@angular/core';
import { Input } from '@angular/core';

import { MASK } from './mask-fn';
import { Mask } from './mask-fn';
import { MaskFn } from './mask-fn';

@Directive({
  selector: '[maskFn]',
  providers: [
    {provide: MASK, useExisting: FnDirective, multi: false},
  ]
})
export class FnDirective implements Mask {
  @Input() public maskFn: MaskFn;

  mask(value: string): string {
    if (this.maskFn) {
      const maskFn = this.maskFn; // avoids binding a reference to the directive to `this`
      return maskFn(value);
    }

    throw new Error('either a masking function or a masking component should be provided');
  }
}
