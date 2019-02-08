import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MascarponeModule } from 'mascarpone';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MascarponeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
