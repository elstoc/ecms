const prod = process.env.NODE_ENV === 'production';

const loaderUtils = require('loader-utils');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.tsx',
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  output: {
    publicPath: '/',
    path: __dirname + '/dist/',
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].chunk.[chunkhash].js',
  },
  optimization: {
    minimize: prod,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          alias: {
            '@': '/src',
          },
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            // Note: these options are duplicated in ./storybook/main.ts
            options: {
              modules: {
                auto: true,
                getLocalIdent: (context, _, localName, options) => {
                  // Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.
                  const hash = loaderUtils.getHashDigest(
                    Buffer.from(
                      path.posix.relative(context.rootContext, context.resourcePath) + localName,
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
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: 'favicon.png',
    }),
  ].concat(
    prod
      ? [
          new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
          }),
        ]
      : [],
  ),
};
