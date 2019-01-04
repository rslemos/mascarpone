import { Directive } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { HostListener } from '@angular/core';

import { Subject } from 'rxjs';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { AbstractMaskingDirective } from './abstract-masking';

@Directive({
  selector: '[maskOnInput]',
  // tslint:disable-next-line:use-input-property-decorator
  inputs: [ 'maskon: maskOnInput', ],
})
export class OnInputDirective extends AbstractMaskingDirective implements OnInit {
  protected readonly _directiveName = 'maskOnInput';

  private readonly changes = new Subject<UIEvent>();

  @Input() maskDelay = 500;

  ngOnInit(): void {
    this.changes
      .pipe(debounce(() => interval(this.maskDelay)))
      .subscribe(event => this.maskImmediately(event));
  }

  @HostListener('input', ['$event'])
  input(event: UIEvent): void {
    this.changes.next(event);
  }
}
