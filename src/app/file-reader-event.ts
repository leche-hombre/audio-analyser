import {FileReaderEventTarget} from './file-reader-event-target';

export interface FileReaderEvent extends ProgressEvent {
  target: FileReaderEventTarget;
}
