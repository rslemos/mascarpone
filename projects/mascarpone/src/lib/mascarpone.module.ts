import { NgModule } from '@angular/core';
import { OnBlurDirective } from './on-blur.directive';
import { OnInputDirective } from './on-input.directive';
import { FnDirective } from './fn.directive';
import { ShadowInputComponent } from './shadow-input/shadow-input.component';
import { ShadowDirective } from './shadow.directive';

@NgModule({
  imports: [
  ],
  declarations: [
    OnBlurDirective,
    OnInputDirective,
    FnDirective,
    ShadowInputComponent,
    ShadowDirective,
  ],
  exports: [
    OnBlurDirective,
    OnInputDirective,
    FnDirective,
    ShadowInputComponent,
    ShadowDirective,
  ]
})
export class MascarponeModule { }
