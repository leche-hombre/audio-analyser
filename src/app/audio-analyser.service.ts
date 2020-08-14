import {AudioAnalysis} from './audio-analysis';
import {DefaultAnalysis} from './default-analysis';
import {Injectable} from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import {WaveformSettings} from './waveform-settings';

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
      key: this.getKey()
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

  displayWaveForm(audioFilePath: string, waveformSettings: WaveformSettings) {
    const waveSurfer = WaveSurfer.create({
      ...waveformSettings
    });
    waveSurfer.load(audioFilePath);
    waveSurfer.on('ready', () => {
      waveSurfer.play();
    });
  }

}
