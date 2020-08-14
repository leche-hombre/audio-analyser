import {AudioAnalysis} from './audio-analysis';
import {DefaultAnalysis} from './default-analysis';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioAnalyserService {

  constructor() {}

  analyseAudioFile(audioFile: File): AudioAnalysis {
    return {
      title: this.getTitle(),
      artist: this.getArtist(),
      bpm: this.getBeatsPerMinute(),
      key: this.getKey(),
      waveform: this.getWaveform()
    };
  }

  getTitle(): string {
    return DefaultAnalysis.title;
  }

  getArtist(): string {
    return DefaultAnalysis.artist;
  }

  getBeatsPerMinute(): number {
    return DefaultAnalysis.bpm;
  }

  getKey(): string {
    return DefaultAnalysis.key;
  }

  getWaveform() {
    return DefaultAnalysis.waveform;
  }

}
