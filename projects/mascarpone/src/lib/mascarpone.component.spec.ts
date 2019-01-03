import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascarponeComponent } from './mascarpone.component';

describe('MascarponeComponent', () => {
  let component: MascarponeComponent;
  let fixture: ComponentFixture<MascarponeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascarponeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascarponeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
