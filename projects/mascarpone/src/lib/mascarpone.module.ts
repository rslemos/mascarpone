import { NgModule } from '@angular/core';
import { MascarponeComponent } from './mascarpone.component';
import { OnBlurDirective } from './on-blur.directive';
import { OnInputDirective } from './on-input.directive';
import { FnDirective } from './fn.directive';
import { ShadowInputComponent } from './shadow-input/shadow-input.component';

@NgModule({
  imports: [
  ],
  declarations: [
    MascarponeComponent,
    OnBlurDirective,
    OnInputDirective,
    FnDirective,
    ShadowInputComponent,
  ],
  exports: [
    MascarponeComponent,
    OnBlurDirective,
    OnInputDirective,
    FnDirective,
    ShadowInputComponent,
  ]
})
export class MascarponeModule { }
