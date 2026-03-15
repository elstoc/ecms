import sharp from 'sharp';

import { ImageSize } from '@/contracts/gallery';

type ResizeConfig = {
  desc: ImageSize;
  width: number;
  height: number;
  quality: number;
  stripExif: boolean;
  version?: number;
};

export const resizeImage = async (sourceImage: Buffer, config: ResizeConfig): Promise<Buffer> => {
  const { width, height, quality, stripExif } = config;

  let resizeSharp = sharp(sourceImage).resize(width, height, { fit: 'inside' });

  if (!stripExif) {
    resizeSharp = resizeSharp.keepMetadata();
  }

  return await resizeSharp.jpeg({ quality }).toBuffer();
};
