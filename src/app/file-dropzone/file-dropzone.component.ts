import {Component, HostListener, OnInit} from '@angular/core';
import {AudioAnalyserService} from '../audio-analyser.service';

@Component({
  selector: 'app-file-dropzone',
  templateUrl: './file-dropzone.component.html',
  styleUrls: ['./file-dropzone.component.scss']
})
export class FileDropzoneComponent implements OnInit {

  fileOver: boolean;
  private files: FileList;

  constructor(private audioAnalyserService: AudioAnalyserService) { }

  ngOnInit() {
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileOver = true;

    console.log('dragging over drop zone');
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileOver = false;

    console.log('drag leaving');
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileOver = false;
    this.files = event.dataTransfer.files;

    if (this.files.length > 0) {
      console.log(`Found ${this.files.length} file${this.files.length > 1 ? 's' : ''}.`);
      this.audioAnalyserService.updateAudioSourceURL(this.files[0]);
    }

    console.log('dropping file');
  }
}
