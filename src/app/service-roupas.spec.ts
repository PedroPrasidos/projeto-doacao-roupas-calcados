import { TestBed } from '@angular/core/testing';

import { ServiceRoupas } from './service-roupas';

describe('ServiceRoupas', () => {
  let service: ServiceRoupas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRoupas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
