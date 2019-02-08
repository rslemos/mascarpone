import { NgModule } from '@angular/core';
import { FnDirective } from './fn.directive';
import { OnBlurDirective } from './on-blur.directive';

@NgModule({
  imports: [
  ],
  declarations: [
    FnDirective,
    OnBlurDirective,
  ],
  exports: [
    FnDirective,
    OnBlurDirective,
  ],
})
export class MascarponeModule { }
