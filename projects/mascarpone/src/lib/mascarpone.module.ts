import { NgModule } from '@angular/core';
import { MascarponeComponent } from './mascarpone.component';
import { OnBlurDirective } from './on-blur.directive';
import { OnInputDirective } from './on-input.directive';
import { FnDirective } from './fn.directive';

@NgModule({
  imports: [
  ],
  declarations: [
    MascarponeComponent,
    OnBlurDirective,
    OnInputDirective,
    FnDirective,
  ],
  exports: [
    MascarponeComponent,
    OnBlurDirective,
    OnInputDirective,
    FnDirective,
  ]
})
export class MascarponeModule { }
