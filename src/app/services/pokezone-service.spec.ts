import { TestBed } from '@angular/core/testing';

import { PokezoneService } from './pokezone-service';

describe('PokezoneService', () => {
  let service: PokezoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokezoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
