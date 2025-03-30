import { GalleryContents } from '@/contracts/gallery';
import { axiosSecureClient } from '@/shared/api';

export const getGalleryContents = async (
  path: string,
  pages: number,
  includeFile?: string,
): Promise<GalleryContents> => {
  const url = 'gallery/contents/';
  const { data } = await axiosSecureClient.get<GalleryContents>(url, {
    params: { path, pages, includeFile },
  });
  return data;
};
