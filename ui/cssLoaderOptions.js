import loaderUtils from 'loader-utils';
import path from 'path';

export const cssLoaderOptions = {
  loader: 'css-loader',
  options: {
    modules: {
      auto: true,
      getLocalIdent: (context, _, localName, options) => {
        // Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.
        const hash = loaderUtils.getHashDigest(
          // eslint-disable-next-line no-undef
          Buffer.from(path.posix.relative(context.rootContext, context.resourcePath) + localName),
          'md5',
          'base64',
          5,
        );
        // Use loaderUtils to find the file or folder name
        const className = loaderUtils.interpolateName(
          context,
          '[name]__' + localName + '__' + hash,
          options,
        );
        // Remove the .module that appears in every classname when based on the file and replace all "." with "_".
        return className.replace('.module_', '_').replace(/\./g, '_');
      },
    },
  },
};
