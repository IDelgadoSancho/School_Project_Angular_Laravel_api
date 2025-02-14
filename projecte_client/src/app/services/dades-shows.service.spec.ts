import { TestBed } from '@angular/core/testing';

import { DadesShowsService } from './dades-shows.service';

describe('DadesShowsService', () => {
  let service: DadesShowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadesShowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
