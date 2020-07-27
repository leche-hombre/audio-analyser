import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bpm-calculator',
  templateUrl: './bpm-calculator.component.html',
  styleUrls: ['./bpm-calculator.component.scss']
})
export class BpmCalculatorComponent implements OnInit {

  beatsPerMinute: number;
  private defaultBeatsPerMinute = 0;
  private millisecondsSinceLastBeat: number[] = [];
  private lastBeatTime: number;

  constructor() {
  }

  ngOnInit() {
  }

  calculateBeatsPerMinute(millisecondsSinceLastBeat: number[]): number {
    const sumOfBeats = millisecondsSinceLastBeat.reduce(((previousValue, currentValue) => previousValue + currentValue),
      this.defaultBeatsPerMinute);
    return (sumOfBeats / millisecondsSinceLastBeat.length);
  }

  setBeatsPerMinute() {
    this.appendMillisecondsSinceLastBeat();
    if (this.millisecondsSinceLastBeat.length >= 2) {
      this.beatsPerMinute = this.calculateBeatsPerMinute(this.millisecondsSinceLastBeat);
    }
  }

  appendMillisecondsSinceLastBeat() {
    const currentTime = new Date().getTime();
    if (this.lastBeatTime) {
      const timeDifference = currentTime - this.lastBeatTime;
      this.millisecondsSinceLastBeat.push(timeDifference);
    }
    this.lastBeatTime = currentTime;
  }

  private resetBeatsPerMinute() {
    this.millisecondsSinceLastBeat = [];
    this.lastBeatTime = 0;
  }

}
