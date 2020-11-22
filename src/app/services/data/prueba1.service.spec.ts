import { TestBed } from '@angular/core/testing';

import { Prueba1Service } from './prueba1.service';

describe('Prueba1Service', () => {
  let service: Prueba1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Prueba1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
