import { Component } from '@angular/core';
import { MASK } from 'mascarpone';
import { Mask } from 'mascarpone';

class MyMask implements Mask {
  public mask(value: string): string {
    console.error(`mask: ${value}`);
    return value;
  }
}

@Component({
  selector: 'mask-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [
  //   {provide: MASK, useClass: MyMask, multi: false},
  // ]
})
export class AppComponent {
  title = 'mascarpone-demo';

  public myMaskingFn(value: string): string {
    console.error(`mask: ${value}`, this);
    return value;
  }
}
