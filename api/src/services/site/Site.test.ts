/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentGroup, Site } from '..';

jest.mock('./ComponentGroup');

const mockStorage = {
  listContentChildren: jest.fn() as jest.Mock,
};

const mockLogger = {
  debug: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
} as any;

const mockComponentGroup = ComponentGroup as any;

const config = {
  dataDir: '/path/to/data',
  enableAuthentication: true,
} as any;

describe('Site', () => {
  let site: Site;
  const list = jest.fn();
  const getGallery = jest.fn();
  const getMarkdown = jest.fn();
  const getVideoDb = jest.fn();
  const getCalibreDb = jest.fn();
  const shutdown = jest.fn();

  beforeEach(() => {
    mockComponentGroup.mockImplementation(() => ({
      list,
      getGallery,
      getMarkdown,
      getVideoDb,
      getCalibreDb,
      shutdown,
    }));
    site = new Site(config, mockStorage as any, mockLogger);
  });

  it('listComponents calls listComponents from root component', async () => {
    await site.listComponents();
    expect(list).toHaveBeenCalledTimes(1);
  });

  it('getGallery calls getGallery from root component', async () => {
    await site.getGallery('/path');
    expect(getGallery).toHaveBeenCalledTimes(1);
  });

  it('getMarkdown calls getMarkdown from root component', async () => {
    await site.getMarkdown('/path');
    expect(getMarkdown).toHaveBeenCalledTimes(1);
  });

  it('getVideoDb calls getVideoDb from root component', async () => {
    await site.getVideoDb('/path');
    expect(getVideoDb).toHaveBeenCalledTimes(1);
  });

  it('getCalibreDb calls getCalibreDb from root component', async () => {
    await site.getCalibreDb('/path');
    expect(getCalibreDb).toHaveBeenCalledTimes(1);
  });

  it('shutdown calls shutdown from root component', async () => {
    await site.shutdown();
    expect(shutdown).toHaveBeenCalledTimes(1);
  });

  describe('getConfig', () => {
    it('returns true & site title / footer text if enableAuthentication is true', () => {
      const newConfig = {
        ...config,
        enableAuthentication: true,
        footerText: 'some-footer-text',
        siteTitle: 'some-site-title',
      };

      site = new Site(newConfig, mockStorage as any, mockLogger);

      expect(site.getConfig()).toStrictEqual({
        authEnabled: true,
        footerText: 'some-footer-text',
        siteTitle: 'some-site-title',
      });
    });

    it('returns false & site title / footer text if enableAuthentication is false', () => {
      const newConfig = {
        ...config,
        enableAuthentication: false,
        footerText: 'some-other-footer-text',
        siteTitle: 'some-other-site-title',
      };

      site = new Site(newConfig, mockStorage as any, mockLogger);

      expect(site.getConfig()).toStrictEqual({
        authEnabled: false,
        footerText: 'some-other-footer-text',
        siteTitle: 'some-other-site-title',
      });
    });
  });
});
