import { Component, OnInit } from '@angular/core';
import {DefaultAnalysis} from '../default-analysis';
import {Analysis} from '../analysis';

@Component({
  selector: 'app-analysis-result',
  templateUrl: './analysis-result.component.html',
  styleUrls: ['./analysis-result.component.scss']
})
export class AnalysisResultComponent implements OnInit {

  analysis: Analysis;

  constructor() {
    this.analysis = DefaultAnalysis;
  }

  ngOnInit() {
  }
}
