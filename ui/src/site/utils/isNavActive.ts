export const isNavActive = (locationPath: string, navPath: string) => {
  const currentPath = locationPath.replace(/^\//, '');

  const navMatchesPath = currentPath === navPath;
  const navMatchesParent = navPath && currentPath.startsWith(navPath);

  return navMatchesPath || navMatchesParent;
};
