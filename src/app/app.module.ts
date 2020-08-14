import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BpmCalculatorComponent } from './bpm-calculator/bpm-calculator.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatTooltipModule
} from '@angular/material';
import { MenuComponent } from './menu/menu.component';
import { FileDropzoneComponent } from './file-dropzone/file-dropzone.component';
import { AnalysisResultComponent } from './analysis-result/analysis-result.component';
import {AudioAnalyserService} from './audio-analyser.service';

@NgModule({
  declarations: [
    AppComponent,
    BpmCalculatorComponent,
    MenuComponent,
    FileDropzoneComponent,
    AnalysisResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [AudioAnalyserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
