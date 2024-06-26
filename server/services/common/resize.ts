import type { MultiPartData } from 'h3'
import sharp from 'sharp';

export const resizeImage = async (files: MultiPartData[], width: number, height: number) => {
    const tasks = files.map(async (file) => {
      const buffer = await sharp(file.data)
        .resize(width, height)
        .webp({ quality: 90, lossless: true })
        .toBuffer();
    
        return {
          data: buffer,
          mimetype: 'image/webp',
          filename: `${file.filename?.split('.')[0]}.webp`,
        } as MultiPartData;
    });
  
  return await Promise.all(tasks)
}