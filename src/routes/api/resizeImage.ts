import sharp from 'sharp';
export async function resizeImage(
  fileName: string,
  Width: number,
  Height: number,
  edited_image: string
): Promise<void> {
  await sharp(`images/${fileName}.jpg`)
    .resize({
      width: Width as unknown as number,
      height: Height as unknown as number,
    })
    .toFile('./images/edited-images/' + edited_image);
}
