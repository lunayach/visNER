import { TestBed } from '@angular/core/testing';

import { NerService } from './ner.service';

describe('NerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NerService = TestBed.get(NerService);
    expect(service).toBeTruthy();
  });
});
