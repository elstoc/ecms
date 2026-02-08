import type { StorybookConfig } from '@storybook/react-webpack5';
import loaderUtils, { InterpolateOption, LoaderInterpolateOption } from 'loader-utils';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'path';
import { LoaderContext } from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-docs',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          // Replaces existing CSS rules to support CSS Modules
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    // Note: These options are duplicated in webpack.config.js
                    auto: true,
                    getLocalIdent: (
                      context: LoaderContext<LoaderInterpolateOption>,
                      _: string,
                      localName: string,
                      options: InterpolateOption,
                    ) => {
                      // Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.
                      const hash = loaderUtils.getHashDigest(
                        Buffer.from(
                          path.posix.relative(context.rootContext, context.resourcePath) +
                            localName,
                        ),
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
              },
            ],
          },
        ],
      },
    },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    check: false,
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: () => true,
    },
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
      };
    }
    return config;
  },
};
export default config;
