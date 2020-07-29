import { TestBed } from '@angular/core/testing';

import { AudioAnalyserService } from './audio-analyser.service';

describe('AudioAnalyserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AudioAnalyserService = TestBed.get(AudioAnalyserService);
    expect(service).toBeTruthy();
  });

  it('reads an ID3 tag from an MP3 file', () => {
    const fileReader = new FileReader();
    const audioAnalyser = new AudioAnalyserService(fileReader);
    const file = new File([], 'blah.mp3');
    audioAnalyser.getID3TagFromFile(file);
  });
});
