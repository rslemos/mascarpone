import { Directive } from '@angular/core';

import { MASK } from './mask-fn';
import { Mask } from './mask-fn';
import { MaskFn } from './mask-fn';

@Directive({
  selector: '[maskFn]',
  // tslint:disable-next-line:use-input-property-decorator
  inputs: [ 'maskFn' ],
  providers: [
    {provide: MASK, useExisting: FnDirective, multi: false},
  ]
})
export class FnDirective implements Mask {
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
