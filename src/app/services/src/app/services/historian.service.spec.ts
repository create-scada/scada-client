import { TestBed } from '@angular/core/testing';

import { HistorianService } from './historian.service';

describe('HistorianService', () => {
  let service: HistorianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
