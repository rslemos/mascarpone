import { NgModule } from '@angular/core';
import { OnBlurDirective } from './on-blur.directive';
import { FnDirective } from './fn.directive';

@NgModule({
  imports: [
  ],
  declarations: [
    OnBlurDirective,
    FnDirective,
  ],
  exports: [
    OnBlurDirective,
  ],
})
export class MascarponeModule { }
