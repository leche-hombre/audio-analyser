import { Injectable } from '@angular/core';
import {FileReaderEvent} from './file-reader-event';

@Injectable({
  providedIn: 'root'
})
export class AudioAnalyserService {

  constructor(private fileReader: FileReader) { }

  getID3TagFromBlob(arrayBuffer: ArrayBuffer) {

    const dataView = new DataView(arrayBuffer);

    console.log('TAG:', this.readStringFromDataView(dataView, 0, 3));


    // var dataView = new DataView(buff)
    // console.log('TAG:', readString(dataView, 0, 3));
    // console.log('title: ', readString(dataView, 3, 30)); // title
    // console.log('artist: ', readString(dataView, 33, 30)); // artist
    // console.log('album: ', readString(dataView, 63, 30)); // album
    // console.log('year: ', readString(dataView, 93, 4)); // year

    // function readString(dataView, offset, length) {
    //   var o = '';
    //   for (var i = offset; i < offset + length; i++) {
    //     // keep only printable characters
    //     if (i >= 32) o += String.fromCharCode(dataView.getUint8(i));
    //   }
    //   return o;
    // }

  }

  readStringFromDataView(dataView: DataView, offset: number, length: number): string {

    let result = '';

    for (let i = offset; i < offset + length; i++) {
      if (i >= 32) {
        result += String.fromCharCode(dataView.getUint8(i));
      }
    }

    return result;
  }

  getID3TagFromFile(file: File) {

    let ID3Tag;
    const fileBlob = file.slice(file.size - 128, file.size);

    this.fileReader.onload = ((event: FileReaderEvent) => {
      ID3Tag = this.getID3TagFromBlob(event.target.result);
    });

    this.fileReader.readAsArrayBuffer(fileBlob);
  }
}
