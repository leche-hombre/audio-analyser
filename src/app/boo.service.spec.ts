import { TestBed } from '@angular/core/testing';

import { BooService } from './boo.service';

describe('BooService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BooService = TestBed.get(BooService);
    expect(service).toBeTruthy();
  });
});
