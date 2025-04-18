import sharp from 'sharp';

import { ImageSize } from '@/contracts/gallery';

type ResizeConfig = {
  desc: ImageSize;
  width: number;
  height: number;
  quality: number;
  stripExif: boolean;
  addBorder: boolean;
  version?: number;
};

export const resizeImage = async (sourceImage: Buffer, config: ResizeConfig): Promise<Buffer> => {
  const { width, height, quality, stripExif, addBorder } = config;

  let resizeSharp = sharp(sourceImage).resize(width, height, { fit: 'inside' });

  if (!stripExif) {
    resizeSharp = resizeSharp.keepExif();
  }

  if (addBorder) {
    resizeSharp = resizeSharp.extend({
      top: 2,
      bottom: 2,
      left: 2,
      right: 2,
      background: { r: 60, g: 60, b: 60, alpha: 1 },
    });
  }

  return await resizeSharp.jpeg({ quality }).toBuffer();
};
