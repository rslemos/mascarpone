import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowInputComponent } from './shadow-input.component';

describe('ShadowInputComponent', () => {
  let component: ShadowInputComponent;
  let fixture: ComponentFixture<ShadowInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShadowInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadowInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
