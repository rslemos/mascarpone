import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { HostListener } from '@angular/core';
import { HostBinding } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Inject } from '@angular/core';
import { Optional } from '@angular/core';

import { MaskShadow } from '../mask-shadow';
import { MASKSHADOW } from '../mask-shadow';

const VALUE_PROPERTY = {
  get: function(): string { return (<HTMLInputElement>this.children[0]).value; },
  set: function(value: string) { (<HTMLInputElement>this.children[0]).value = value; }
};

const SELECTIONSTART_PROPERTY = {
  get: function(): number { return (<HTMLInputElement>this.children[0]).selectionStart; },
  set: function(selectionStart: number) { (<HTMLInputElement>this.children[0]).selectionStart = selectionStart; }
};

const SELECTIONEND_PROPERTY = {
  get: function(): number { return (<HTMLInputElement>this.children[0]).selectionEnd; },
  set: function(selectionEnd: number) { (<HTMLInputElement>this.children[0]).selectionEnd = selectionEnd; }
};

const SELECTIONDIRECTION_PROPERTY = {
  get: function(): string { return (<HTMLInputElement>this.children[0]).selectionDirection; },
  set: function(selectionDirection: string) { (<HTMLInputElement>this.children[0]).selectionDirection = selectionDirection; }
};

const MINLENGTH_PROPERTY = {
  get: function(): number { return (<HTMLInputElement>this.children[0]).minLength; },
  set: function(minLength: number) { (<HTMLInputElement>this.children[0]).minLength = minLength; }
};

const MAXLENGTH_PROPERTY = {
  get: function(): number { return (<HTMLInputElement>this.children[0]).maxLength; },
  set: function(maxLength: number) { (<HTMLInputElement>this.children[0]).maxLength = maxLength; }
};

const DATA_ALIGNMENT_PROPERTY = {
  value: 'left',
  writable: true,
};

@Component({
  selector: 'mask-shadow-input',
  template: `
<input #input type="text"
    minlength="minlength" maxlength="maxlength"
    (input)="oninput($event)" (blur)="onfocusevent($event)" (focus)="onfocusevent($event)"
>
<div>
  <span name="ghost">&#8203;{{input.value}}</span>
  <span name="shadow">&#8203;{{s?.maskshadow?.slice(input.value.length)}}</span>
</div>
`,
  styleUrls: ['./shadow-input.component.scss'],
})
export class ShadowInputComponent {
  @HostBinding('attr.data-alignment')
  @Input() alignment: 'left' | 'right';

  constructor(
    private elementRef: ElementRef,
    @Optional() @Inject(MASKSHADOW) public s: MaskShadow,
  ) {
      const element = elementRef.nativeElement;
      // forward properties of nested input
      Object.defineProperty(element, 'value', VALUE_PROPERTY);
      Object.defineProperty(element, 'selectionStart', SELECTIONSTART_PROPERTY);
      Object.defineProperty(element, 'selectionEnd', SELECTIONEND_PROPERTY);
      Object.defineProperty(element, 'selectionDirection', SELECTIONDIRECTION_PROPERTY);
      Object.defineProperty(element, 'minLength', MINLENGTH_PROPERTY);
      Object.defineProperty(element, 'maxLength', MAXLENGTH_PROPERTY);
      Object.defineProperty(element, 'data-alignment', DATA_ALIGNMENT_PROPERTY);
  }

  @HostListener('input', ['$event'])
  oninput(event: UIEvent): void {
    /* we don't need to do anything; */
    /* angular will trigger change detection */
  }

  onfocusevent(event: FocusEvent): void {
    // this.elementRef.nativeElement.dispatchEvent(event);
    this.elementRef.nativeElement.dispatchEvent(new FocusEvent(event.type, {
      bubbles: event.bubbles,
      cancelable: event.cancelable,
      // scoped: event.scoped,
      view: event.view,
      detail: event.detail,
      relatedTarget: event.relatedTarget,
    }));
  }

}
