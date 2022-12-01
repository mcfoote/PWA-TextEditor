const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")


module.exports = () => {
  return {
    mode: 'development',
    //target: 'node',
    resolve: {
      fallback: {
        /*
        "url": require.resolve("url/"),
        "path": require.resolve("path-browserify"),
        "util": require.resolve("util/"),
        "stream": require.resolve("stream-browserify"),
        "fs": require.resolve("commonjs fs"),
        "url": require.resolve("url/"),
        "querystring": require.resolve("querystring-es3"),
        "http": require.resolve("stream-http"),

        /*
        "fs": false,
        "http": false,
        "zlib": false,
        "path": false,
        "crypto": false,
        "stream": false,
        "zlib": false,
        "querystring": false,
        "url": false,
        "util": false,
        "net": false
        */
      },
    },
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new NodePolyfillPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'a Progressive Web App based text editor',
        background_color: '#db6927',
        theme_color: '#db6927',
        start_url: './',
        public: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')
          },
        ],
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
