import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmCalculatorComponent } from './bpm-calculator.component';
import {MatCardModule} from '@angular/material';

const beatsPerMinuteValues = [0.45, 0.45, 0.45];
const minimumBeatsRequired = 2;

describe('BpmCalculatorComponent', () => {
  let component: BpmCalculatorComponent;
  let fixture: ComponentFixture<BpmCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpmCalculatorComponent ],
      imports: [MatCardModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpmCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calculates BPM', () => {
    const sumOfBeatsPerMinute = beatsPerMinuteValues.reduce(((previousValue, currentValue) => previousValue + currentValue), 0);
    const expectedBeatsPerMinute = 60 / (sumOfBeatsPerMinute / beatsPerMinuteValues.length);
    const result = component.calculateBeatsPerMinute(beatsPerMinuteValues);
    expect(result).toEqual(expectedBeatsPerMinute);
  });

  it('resets BPM', () => {
    for (let i = 0; i <= minimumBeatsRequired; i++) {
      component.setBeatsPerMinute();
    }
    expect(component.beatsPerMinute).toBeGreaterThan(component.defaultBeatsPerMinute);
    component.resetBeatsPerMinute();
    expect(component.beatsPerMinute).toEqual(component.defaultBeatsPerMinute);
  });
});
