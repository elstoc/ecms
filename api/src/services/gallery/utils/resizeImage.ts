import sharp from 'sharp';

import { ImageSize } from '@/contracts/gallery';

type ResizeConfig = {
  desc: ImageSize;
  width: number;
  height: number;
  quality: number;
  stripExif: boolean;
  version?: number;
  sharpen: boolean;
};

export const resizeImage = async (sourceImage: Buffer, config: ResizeConfig): Promise<Buffer> => {
  const { width, height, quality, stripExif, sharpen } = config;

  let resizeSharp = sharp(sourceImage).resize(width, height, { fit: 'inside' });

  if (!stripExif) {
    resizeSharp = resizeSharp.keepMetadata();
  }

  if (sharpen) {
    // See https://www.libvips.org/API/current/method.Image.sharpen.html for sharpen guidance
    resizeSharp = resizeSharp.sharpen({ sigma: 0.5, m1: 1, m2: 1, y2: 3, y3: 5 });
  }

  return await resizeSharp.jpeg({ quality }).toBuffer();
};
