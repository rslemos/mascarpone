import { Directive } from '@angular/core';
import { Input } from '@angular/core';

import { SelectionDirection } from './mask-fn';
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
