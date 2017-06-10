const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  target: 'node',

  entry: path.join(__dirname, 'index.js'),

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              'es2015',
            ],
          },
        },
      },
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
      {
        test: /\.proto$/,
        loader: 'proto-loader',
      },
      {
        // Could probably be solved in a better, less ugly way
        test: /MumbleMessageMap\.js$/,
        loader: 'string-replace-loader',
        query: {
          search: 'protobufjs.loadProtoFile( path.join( __dirname, \'Mumble.proto\' ) )',
          // eslint-disable-next-line comma-dangle
          replace: 'protobufjs.loadJson(require(\'./Mumble.proto\'))'
        },
      },
    ],
  },

  resolve: {
    alias: {
      ByteBuffer: 'bytebuffer',
      Long: 'long',
    },
  },

  plugins: [
    new webpack.NormalModuleReplacementPlugin(
        /^bindings$/,
        // eslint-disable-next-line comma-dangle
        require.resolve(path.join(__dirname, 'bindings'))
    ),
    new CleanWebpackPlugin(
      [
        'build',
      ],
      {
        exclude: [
          'config.json', 'music', /.+\.(pem|crt|key)/,
        ],
      // eslint-disable-next-line comma-dangle
      }
    ),
  ],

  node: {
    __dirname: false,
  },
};
