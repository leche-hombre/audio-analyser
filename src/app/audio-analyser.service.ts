import {AudioAnalysis} from './audio-analysis';
import {DefaultAnalysis} from './default-analysis';
import {Injectable} from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import {WaveformSettings} from './waveform-settings';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioAnalyserService {

  waveSurfer;

  audioSourceURL: BehaviorSubject<File> = new BehaviorSubject(new File([], ''));

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

  displayWaveForm(waveformSettings: WaveformSettings) {
    this.waveSurfer = WaveSurfer.create({
      ...waveformSettings
    });

    const blobAudioURL = this.audioSourceURL.value;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(blobAudioURL);

    fileReader.onload = (ev: ProgressEvent) => {
      this.waveSurfer.load(fileReader.result);
    };
  }

  clearWaveForm() {
    if (this.waveSurfer) {
      this.waveSurfer.destroy();
    }
  }

  updateAudioSourceURL(audioSourceURL: File) {
    this.audioSourceURL.next(audioSourceURL);
  }

}
