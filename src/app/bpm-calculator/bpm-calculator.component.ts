import { Component, OnInit } from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-bpm-calculator',
  templateUrl: './bpm-calculator.component.html',
  styleUrls: ['./bpm-calculator.component.scss']
})
export class BpmCalculatorComponent implements OnInit {

  beatsPerMinute: number;
  defaultBeatsPerMinute = 0;
  private millisecondsSinceLastBeat: number[] = [];
  private lastBeatTime: number;


  constructor() {
  }

  ngOnInit() {
  }

  calculateBeatsPerMinute(millisecondsSinceLastBeat: number[]): number {
    const sumOfBeats = millisecondsSinceLastBeat.reduce(((previousValue, currentValue) => previousValue + currentValue),
      this.defaultBeatsPerMinute);
    return 60 / (sumOfBeats / millisecondsSinceLastBeat.length);
  }

  setBeatsPerMinute() {
    this.appendMillisecondsSinceLastBeat();
    if (this.millisecondsSinceLastBeat.length >= 2) {
      this.beatsPerMinute = Math.floor(this.calculateBeatsPerMinute(this.millisecondsSinceLastBeat));
    }
  }

  private appendMillisecondsSinceLastBeat() {
    const currentTime = new Date().getTime();
    if (this.lastBeatTime) {
      const timeDifference = (currentTime - this.lastBeatTime) / 1000;
      this.millisecondsSinceLastBeat.push(timeDifference);
    }
    this.lastBeatTime = currentTime;
  }

  resetBeatsPerMinute() {
    this.millisecondsSinceLastBeat = [];
    this.lastBeatTime = 0;
    this.beatsPerMinute = this.defaultBeatsPerMinute;
  }

}
