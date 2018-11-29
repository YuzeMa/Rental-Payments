const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
    },

    module: {
        rules: [
          { test: /\.js$/, use: 'babel-loader' },
          { test: /\.css$/, use: ['style-loader', 'css-loader']}
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({}),
        new HtmlWebpackPlugin({ template: './src/index.html'})
    ]
};

