import { Component, OnInit } from '@angular/core';
import {AudioAnalysis} from '../audio-analysis';
import {AudioAnalyserService} from '../audio-analyser.service';
import {DefaultAnalysis} from '../default-analysis';

@Component({
  selector: 'app-analysis-result',
  templateUrl: './analysis-result.component.html',
  styleUrls: ['./analysis-result.component.scss']
})
export class AnalysisResultComponent implements OnInit {

  analysis: AudioAnalysis = DefaultAnalysis;

  constructor(private audioAnalyserService: AudioAnalyserService) {
  }

  ngOnInit() {
    this.audioAnalyserService.audioFile.subscribe(async () => {
      // TODO: Prevent this from happening until the first audio file is available
      await this.updateAudioInfo();
      this.updateWaveForm();
    });
  }

  async updateAudioInfo() {
    this.analysis = await this.audioAnalyserService.analyseAudioFile();
  }

  updateWaveForm() {
    this.clearWaveForm();
    this.audioAnalyserService.displayWaveForm({
      container: '#waveform',
      interact: false,
      waveColor: '#f745db'
    });
  }

  private clearWaveForm() {
    this.audioAnalyserService.clearWaveForm();
  }
}
