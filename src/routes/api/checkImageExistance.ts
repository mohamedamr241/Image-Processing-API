import * as fs from 'fs';
import path from 'path';

export function checkImageExistance(
  fileName: string,
  Width: number,
  Height: number
): boolean {
  if (
    fs.existsSync(
      path.resolve('./') +
        `/images/edited-images/${fileName}_${Width}_${Height}.jpg`
    ) === true
  ) {
    return true;
  }
  return false;
}
