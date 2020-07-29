import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {MenuComponent} from './menu/menu.component';
import {BpmCalculatorComponent} from './bpm-calculator/bpm-calculator.component';
import {MatCardModule, MatIconModule, MatMenuModule} from '@angular/material';
import {FileDropzoneComponent} from './file-dropzone/file-dropzone.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatMenuModule,
        MatCardModule
      ],
      declarations: [
        AppComponent,
        MenuComponent,
        BpmCalculatorComponent,
        FileDropzoneComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'virtual-dj'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('virtual-dj');
  });
});
