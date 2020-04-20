const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.(jpg|png|mp3|json)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/imgs/[name].[ext]',
          esModule: false
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    compress: true,
    port: 8080,
    open: true,
  },
};
