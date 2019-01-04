import { NgModule } from '@angular/core';
import { MascarponeComponent } from './mascarpone.component';
import { OnBlurDirective } from './on-blur.directive';
import { OnInputDirective } from './on-input.directive';
import { FnDirective } from './fn.directive';
import { ShadowInputComponent } from './shadow-input/shadow-input.component';
import { ShadowDirective } from './shadow.directive';

@NgModule({
  imports: [
  ],
  declarations: [
    MascarponeComponent,
    OnBlurDirective,
    OnInputDirective,
    FnDirective,
    ShadowInputComponent,
    ShadowDirective,
  ],
  exports: [
    MascarponeComponent,
    OnBlurDirective,
    OnInputDirective,
    FnDirective,
    ShadowInputComponent,
    ShadowDirective,
  ]
})
export class MascarponeModule { }
