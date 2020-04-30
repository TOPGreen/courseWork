import { TestBed } from '@angular/core/testing';

import { CompilationsService } from './compilations.service';

describe('CompilationsService', () => {
  let service: CompilationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompilationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
