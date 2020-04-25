import { TestBed } from '@angular/core/testing';

import { WatchedListService } from './watched-list.service';

describe('WatchedListService', () => {
  let service: WatchedListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchedListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
