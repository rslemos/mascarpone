import { NgModule } from '@angular/core';
import { FnDirective } from './fn.directive';
import { OnBlurDirective } from './on-blur.directive';
import { OnInputDirective } from './on-input.directive';
import { ShadowInputComponent } from './shadow-input/shadow-input.component';

@NgModule({
  imports: [
  ],
  declarations: [
    FnDirective,
    OnBlurDirective,
    OnInputDirective,
    ShadowInputComponent,
  ],
  exports: [
    FnDirective,
    OnBlurDirective,
    OnInputDirective,
    ShadowInputComponent,
  ],
})
export class MascarponeModule { }
