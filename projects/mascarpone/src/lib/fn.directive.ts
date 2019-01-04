import { Directive } from '@angular/core';

import { MASK } from './mask-fn';
import { AbstractMaskFnCaller } from './abstract-masking';

@Directive({
  selector: '[maskFn]',
  // tslint:disable-next-line:use-input-property-decorator
  inputs: [ 'maskFn' ],
  providers: [
    {provide: MASK, useExisting: FnDirective, multi: false},
  ]
})
export class FnDirective extends AbstractMaskFnCaller {
}
