import { TestBed } from '@angular/core/testing';

import { ProjectHandlerService } from './project-handler.service';

describe('ProjectHandlerService', () => {
  let service: ProjectHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
