import { NgModule } from '@angular/core';
import { MascarponeComponent } from './mascarpone.component';
import { OnBlurDirective } from './on-blur.directive';
import { OnInputDirective } from './on-input.directive';

@NgModule({
  imports: [
  ],
  declarations: [
    MascarponeComponent,
    OnBlurDirective,
    OnInputDirective,
  ],
  exports: [
    MascarponeComponent,
    OnBlurDirective,
    OnInputDirective,
  ]
})
export class MascarponeModule { }
