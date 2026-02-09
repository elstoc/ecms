import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { fileURLToPath } from 'node:url';
import { dirname } from 'path';
import TerserPlugin from 'terser-webpack-plugin';

import { cssLoaderOptions } from './cssLoaderOptions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prod = process.env.NODE_ENV === 'production';

export default {
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
          cssLoaderOptions,
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
