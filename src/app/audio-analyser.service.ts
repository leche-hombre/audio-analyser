import {AudioAnalysis} from './audio-analysis';
import {DefaultAnalysis} from './default-analysis';
import {Injectable} from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import {WaveformSettings} from './waveform-settings';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {FileUtils} from './file-utils';

@Injectable({
  providedIn: 'root'
})
export class AudioAnalyserService {

  waveSurfer;
  audioFile: BehaviorSubject<File> = new BehaviorSubject(new File([], ''));

  constructor(private fileUtils: FileUtils) {}

  analyseAudioFile(): AudioAnalysis {
    return {
      title: this.getTitleFromFilename(),
      bpm: this.getBeatsPerMinute(),
      key: this.getKey()
    };
  }

  getTitleFromFilename(): string {
    return this.fileUtils.removeFileExtension(this.audioFile.value.name);
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

    const blobAudioURL = this.audioFile.value;

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

  updateAudioFile(audioSourceFile: File) {
    this.audioFile.next(audioSourceFile);
  }

}
