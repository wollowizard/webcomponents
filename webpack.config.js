/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    index: './src/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    library: {
      name: 'SdbWebComponents',
      type: 'umd',
      umdNamedDefine: true,
    },
    clean: true,
  },
  externals: {
    // 'lit-element': {
    //   commonjs: 'lit-element',
    //   commonjs2: 'lit-element',
    //   amd: 'lit-element',
    //   root: 'lit-element',
    // },
  },
  devtool: 'inline-source-map',
  devServer: {
    inline: true,
    contentBase: './dist',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.html'],
    modules: ['node_modules', path.resolve(__dirname, './src')],
  },
  resolveLoader: {
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        include: path.resolve(__dirname, 'src/components'),
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: path.resolve(__dirname, 'src/components'),
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: 'asset/inline',
      },
      {
        test: /\.(ttf|otf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.svg/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10,
  //       },
  //     },
  //   },
  // },
};
