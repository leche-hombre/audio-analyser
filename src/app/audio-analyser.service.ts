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
    const audioArrayBuffer = await this.readAudioFileAsArrayBuffer(this.audioFile.value);
    const audioBuffer = await audioContext.decodeAudioData(audioArrayBuffer);
    const bpm = Math.round(this.calculateBPM(audioBuffer).tempo);
    return bpm;
  }

  async readAudioFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (ev: ProgressEvent) => {
        resolve(fileReader.result as ArrayBuffer);
      };
      try {
        fileReader.readAsArrayBuffer(file);
      } catch (err) {
        reject(err);
      }
    });
  }

  async readAudioFileAsBase64String(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (ev: ProgressEvent) => {
        resolve(fileReader.result as string);
      };
      try {
        fileReader.readAsDataURL(file);
      } catch (err) {
        reject(err);
      }
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

  async displayWaveForm(waveformSettings: WaveformSettings): Promise<void> {
    this.waveSurfer = WaveSurfer.create({
      ...waveformSettings
    });
    const audioFile = this.audioFile.value;
    const base64AudioFile = await this.readAudioFileAsBase64String(audioFile);
    this.waveSurfer.load(base64AudioFile);
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
