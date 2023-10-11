import { TestBed } from '@angular/core/testing';

import { HtmlDataService } from './html-data.service';

describe('HtmlDataService', () => {
  let service: HtmlDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtmlDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
