import { TestBed } from '@angular/core/testing';

import { TotalesService } from './totales.service';

describe('TotalesService', () => {
  let service: TotalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
