const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {filename: 'bundle.js', path: path.resolve(__dirname, 'public')},
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        open: false,
        host: `192.168.31.123`,
        port: 1337,
        historyApiFallback: true
    },
    module: {
        rules: [
          {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'},
          {test: /\.tsx?$/, exclude: /node_modules/, use: 'ts-loader'},
          {test: /\.styl$/i, use: [ MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']},
          {test: /\.(png|jpe?g|svg)$/i, use: 'file-loader'},
          {test: /\.(woff|woff2|eot|ttf|otf)$/i, use: 'file-loader'},
        ]
    },
    plugins: [
      new MiniCssExtractPlugin({filename: 'bundle.css'})
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [new TsconfigPathsPlugin({configFile: 'tsconfig.json'})]
    },
    devtool: 'source-map'
};
