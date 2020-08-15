import {AudioAnalysis} from './audio-analysis';
import {DefaultAnalysis} from './default-analysis';
import {Injectable} from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import {WaveformSettings} from './waveform-settings';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {FileUtils} from './file-utils';
import * as MusicTempo from 'music-tempo';
@Injectable({
  providedIn: 'root'
})
export class AudioAnalyserService {

  waveSurfer;
  audioFile: BehaviorSubject<File> = new BehaviorSubject(new File([], ''));

  constructor(private fileUtils: FileUtils) {}

  async analyseAudioFile(): Promise<AudioAnalysis> {
    return {
      bpm: await this.getBeatsPerMinute(),
      title: this.getTitleFromFilename(),
      key: this.getKey()
    };
  }

  getTitleFromFilename(): string {
    return this.fileUtils.removeFileExtension(this.audioFile.value.name);
  }

  async getBeatsPerMinute(): Promise<number> {
    const audioContext = new AudioContext();
    const audioArrayBuffer = await this.readFileAudioFileAsArrayBuffer(this.audioFile.value);
    const audioBuffer = await audioContext.decodeAudioData(audioArrayBuffer);
    const bpm = Math.round(this.calculateBPM(audioBuffer).tempo);
    console.log(`BEATS PER MINUTE: ${bpm}`);
    return bpm;
  }

  async readFileAudioFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = (ev: ProgressEvent) => {
        resolve(fileReader.result as ArrayBuffer);
      };
      fileReader.readAsArrayBuffer(file);
    });
  }


  private calculateBPM(audioBuffer: AudioBuffer): MusicTempo {

    let audioData = [];

    if (audioBuffer.numberOfChannels === 2) {
    const firstChannel = audioBuffer.getChannelData(0);
    const secondChannel = audioBuffer.getChannelData(1);

    for (let i = 0; i < audioBuffer.length; i++) {
      audioData[i] = (firstChannel[i] + secondChannel[i]) / 2;
    }

    } else {
      audioData = [...audioBuffer.getChannelData(0)];
    }

    return new MusicTempo(audioData);
  }

  getKey(): string {
    return DefaultAnalysis.key;
  }

  displayWaveForm(waveformSettings: WaveformSettings) {
    this.waveSurfer = WaveSurfer.create({
      ...waveformSettings
    });

    const audioFile = this.audioFile.value;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(audioFile);

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
