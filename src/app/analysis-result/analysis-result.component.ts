import { Component, OnInit } from '@angular/core';
import {AudioAnalysis} from '../audio-analysis';
import {AudioAnalyserService} from '../audio-analyser.service';

@Component({
  selector: 'app-analysis-result',
  templateUrl: './analysis-result.component.html',
  styleUrls: ['./analysis-result.component.scss']
})
export class AnalysisResultComponent implements OnInit {

  analysis: AudioAnalysis;

  constructor(private audioAnalyserService: AudioAnalyserService) {
    this.analysis = this.audioAnalyserService.analyseAudioFile({} as File);
  }

  ngOnInit() {
    this.audioAnalyserService.audioSourceURL.subscribe(() => {
      this.updateAudioInfo();
      this.updateWaveForm();
    });
  }

  updateAudioInfo() {
    this.analysis.title = this.audioAnalyserService.getTitleFromFilename();
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
