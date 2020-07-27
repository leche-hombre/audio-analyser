import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmCalculatorComponent } from './bpm-calculator.component';

describe('BpmCalculatorComponent', () => {
  let component: BpmCalculatorComponent;
  let fixture: ComponentFixture<BpmCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpmCalculatorComponent ]
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
    const beatsPerMinuteValues = [0.45, 0.45, 0.45];
    const sumOfBeatsPerMinute = beatsPerMinuteValues.reduce(((previousValue, currentValue) => previousValue + currentValue), 0);
    const expectedBeatsPerMinute = sumOfBeatsPerMinute / beatsPerMinuteValues.length;
    const result = component.calculateBeatsPerMinute(beatsPerMinuteValues);
    expect(result).toEqual(expectedBeatsPerMinute);
  });
});
