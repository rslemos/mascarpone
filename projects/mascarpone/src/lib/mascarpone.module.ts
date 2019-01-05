import { NgModule } from '@angular/core';
import { MascarponeComponent } from './mascarpone.component';
import { OnBlurDirective } from './on-blur.directive';

@NgModule({
  imports: [
  ],
  declarations: [
    MascarponeComponent,
    OnBlurDirective,
  ],
  exports: [
    MascarponeComponent,
    OnBlurDirective,
  ]
})
export class MascarponeModule { }
