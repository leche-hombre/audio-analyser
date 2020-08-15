export class FileUtils {

  constructor() {}

  removeFileExtension(filename: string): string {
    return filename.slice(0, filename.lastIndexOf('.'));
  }

}
