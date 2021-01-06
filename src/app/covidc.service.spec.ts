import { TestBed } from '@angular/core/testing';

import { CovidcService } from './covidc.service';

describe('CovidcService', () => {
  let service: CovidcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
