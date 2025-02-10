import { TestBed } from '@angular/core/testing';

import { DadesDirectorsService } from './dades-directors.service';

describe('DadesDirectorsService', () => {
  let service: DadesDirectorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadesDirectorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
