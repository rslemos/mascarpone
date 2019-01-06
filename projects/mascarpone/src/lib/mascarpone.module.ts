import { NgModule } from '@angular/core';
import { FnDirective } from './fn.directive';
import { OnBlurDirective } from './on-blur.directive';
import { OnInputDirective } from './on-input.directive';

@NgModule({
  imports: [
  ],
  declarations: [
    FnDirective,
    OnBlurDirective,
    OnInputDirective,
  ],
  exports: [
    FnDirective,
    OnBlurDirective,
  ],
})
export class MascarponeModule { }
