/* eslint-disable  @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { Site, SiteComponent } from '../../../src/services';

jest.mock('fs');
jest.mock('../../../src/services/site/SiteComponent');

const config = {
    cacheDir: '/path/to/cache',
    contentDir: '/path/to/content'
} as any;

describe('Site.getNavData', () => {
    let site: Site;
    
    beforeEach(() => {
        site = new Site(config);
        (fs.readdirSync as jest.Mock).mockReturnValue([
            'component01.yaml',
            'component02.yaml',
            'component03.yaml',
            'notcomponent.txt',
            'notcomponent.jpg'
        ]);
    });

    it('only creates new SiteComponent instances for files it has not seen before', () => {
        site.getComponentList();
        expect(SiteComponent).toBeCalledTimes(3);
        site.getComponentList();
        expect(SiteComponent).toBeCalledTimes(3);
    });

    it('returns correct data for only the yaml files in the source directory', () => {
        (SiteComponent as jest.Mock).mockImplementation((_, inputFilePath) => ({
            getMetadata: () => ({ uiPath: inputFilePath })
        }));

        const expectedNavData = [
            { uiPath: 'component01' },
            { uiPath: 'component02' },
            { uiPath: 'component03' }
        ];

        const actualNavData = site.getComponentList();

        expect(actualNavData).toStrictEqual(expectedNavData);
    });
});
