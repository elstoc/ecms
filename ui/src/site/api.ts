import { axiosSecureClient } from '../common/api';

type SiteConfig = {
    authEnabled: boolean;
    footerText: string;
};

enum ComponentTypes {
    gallery = 'gallery',
    markdown = 'markdown',
    videodb = 'videodb'
}

type ComponentMetadataCommon = {
    apiPath: string;
    title: string;
    weight?: number;
    restrict?: string;
}

type GalleryComponentMetadata = ComponentMetadataCommon & {
    type: ComponentTypes.gallery;
    marginPx: number;
    batchSize: number;
    defaultComponent?: boolean;
}

type MarkdownComponentMetadata = ComponentMetadataCommon & {
    type: ComponentTypes.markdown;
    includeNav: boolean;
    defaultComponent?: boolean;
}

type VideoDbComponentMetadata = ComponentMetadataCommon & {
    type: ComponentTypes.videodb;
    defaultComponent?: boolean;
}

type ComponentMetadata = GalleryComponentMetadata | MarkdownComponentMetadata | VideoDbComponentMetadata;

const getSiteComponents = async (): Promise<ComponentMetadata[]> => {
    const { data } = await axiosSecureClient.get<ComponentMetadata[]>('site/components');
    return data;
};

const getSiteConfig = async (): Promise<SiteConfig> => {
    const { data } = await axiosSecureClient.get<SiteConfig>('site/config');
    return data;
};

export { ComponentTypes, GalleryComponentMetadata, VideoDbComponentMetadata, MarkdownComponentMetadata, ComponentMetadata, getSiteComponents, getSiteConfig };
