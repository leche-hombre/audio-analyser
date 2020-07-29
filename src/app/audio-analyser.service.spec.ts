import { TestBed } from '@angular/core/testing';

import { AudioAnalyserService } from './audio-analyser.service';

describe('AudioAnalyserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AudioAnalyserService = TestBed.get(AudioAnalyserService);
    expect(service).toBeTruthy();
  });
});
