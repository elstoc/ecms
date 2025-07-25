const getStringConfig = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} not found`);
  }
  return value;
};

const getOptionalStringConfig = (key: string, defaultValue: string): string => {
  return process.env[key] ?? defaultValue;
};

const getBooleanConfig = (key: string): boolean => {
  const stringConfig = getStringConfig(key);
  return stringConfig.toLowerCase() === 'true';
};

const getIntConfig = (key: string): number => {
  const value = getStringConfig(key);
  const numericValue = parseInt(value);
  if (!Number.isInteger(numericValue)) {
    throw new Error(`Environment variable ${key} is not a number`);
  }
  return numericValue;
};

export type Config = {
  logLevel: string;
  apiUrl: string;
  apiPort: number;
  uiUrl: string;
  dataDir: string;
  storageWriteUid?: number;
  storageWriteGid?: number;
  enableAuthentication: boolean;
  jwtRefreshExpires: string;
  jwtAccessExpires: string;
  jwtRefreshSecret: string;
  jwtAccessSecret: string;
  footerText: string;
  siteTitle: string;
  omdbApiKey: string;
  galleryPageSize: number;
  videoDbPageSize: number;
  calibreDbPageSize: number;
};

export const getConfig = (): Config => {
  return {
    logLevel: getStringConfig('LOG_LEVEL'),
    apiUrl: getStringConfig('API_URL'),
    apiPort: getIntConfig('API_PORT'),
    uiUrl: getStringConfig('UI_URL'),
    dataDir: getStringConfig('DATA_DIR'),
    storageWriteUid: parseInt(getOptionalStringConfig('STORAGE_WRITE_UID', '0')),
    storageWriteGid: parseInt(getOptionalStringConfig('STORAGE_WRITE_GID', '0')),
    enableAuthentication: getBooleanConfig('ENABLE_AUTHENTICATION'),
    jwtRefreshExpires: getOptionalStringConfig('JWT_REFRESH_EXPIRES', ''),
    jwtAccessExpires: getOptionalStringConfig('JWT_ACCESS_EXPIRES', ''),
    jwtRefreshSecret: getOptionalStringConfig('JWT_REFRESH_SECRET', ''),
    jwtAccessSecret: getOptionalStringConfig('JWT_ACCESS_SECRET', ''),
    footerText: getOptionalStringConfig('FOOTER_TEXT', ''),
    siteTitle: getOptionalStringConfig('SITE_TITLE', ''),
    omdbApiKey: getOptionalStringConfig('OMDB_API_KEY', ''),
    galleryPageSize: parseInt(getOptionalStringConfig('GALLERY_PAGE_SIZE', '25')),
    videoDbPageSize: parseInt(getOptionalStringConfig('VIDEODB_PAGE_SIZE', '80')),
    calibreDbPageSize: parseInt(getOptionalStringConfig('CALIBREDB_PAGE_SIZE', '80')),
  };
};
