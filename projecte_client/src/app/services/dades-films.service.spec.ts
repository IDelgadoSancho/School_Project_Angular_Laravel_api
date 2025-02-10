import { TestBed } from '@angular/core/testing';

import { DadesFilmsService } from './dades-films.service';

describe('DadesFilmsService', () => {
  let service: DadesFilmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadesFilmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
