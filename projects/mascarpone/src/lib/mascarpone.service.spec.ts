import { TestBed } from '@angular/core/testing';

import { MascarponeService } from './mascarpone.service';

describe('MascarponeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MascarponeService = TestBed.get(MascarponeService);
    expect(service).toBeTruthy();
  });
});
