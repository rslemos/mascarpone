import { Directive } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Inject } from '@angular/core';
import { HostListener } from '@angular/core';

import { Subject } from 'rxjs';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { MASK } from './mask-fn';
import { Mask } from './mask-fn';

@Directive({
  selector: '[maskOnInput]'
})
export class OnInputDirective implements OnInit {
  private readonly changes = new Subject<UIEvent>();

  @Input() maskDelay = 500;

  constructor(
    @Inject(MASK) private _mask: Mask
  ) {
  }

  ngOnInit(): void {
    this.changes
      .pipe(debounce(() => interval(this.maskDelay)))
      .subscribe(event => this.debouncedInput(event));
  }

  @HostListener('input', ['$event'])
  input(event: UIEvent): void {
    this.changes.next(event);
  }

  private debouncedInput(event: UIEvent) {
    const target = <HTMLInputElement>event.target;

    // extract data
    const {value} = target;

    // apply masking
    const result = this._mask.mask(value);

    if (target.value === result) {
      return;
    }

    // inject data
    target.value = result;

    // value/selection changed; redispatch event
    target.dispatchEvent(event);
  }
}
