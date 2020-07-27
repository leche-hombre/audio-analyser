import * as WaveformData from 'waveform-data';
import fileToArrayBuffer from 'file-to-array-buffer';
// import * as fileToArrayBuffer from 'file-to-array-buffer';


export class AudioWaveformGenerator {

  async generateWaveform(audioFile: File) {
    const audioArrayBuffer = await fileToArrayBuffer(audioFile);
  }

}
