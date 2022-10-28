export type Image = {
    fileName: string;
    width: number;
    height: number;
};

export type Exif = {
    title: string | undefined;
    dateTaken: Date | undefined;
    camera: string | undefined;
    lens: string | undefined;
    exposure: string | undefined;
    iso: string | undefined;
    aperture: string | undefined;
    focalLength: string | undefined;
};

export type Dimensions = {
    width: number | undefined;
    height: number | undefined;
};

export interface IGallery {
    listDir: (fullPath: string) => Promise<Image[]>;
}
