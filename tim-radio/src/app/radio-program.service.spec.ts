import { TestBed } from '@angular/core/testing';

import { RadioProgramService } from './radio-program.service';

describe('RadioProgramService', () => {
  let service: RadioProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadioProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
