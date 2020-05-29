const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackBundleAnalyzer = require('webpack-bundle-analyzer');

// with below environment setup, babel plugin knows that development is running.
process.env.NODE_ENV = 'production';

module.exports = {
    mode: 'production', //webpack knows to run in development mode. and disables some production-only feaures.
    target: 'web', //it can be also node if we build app to node.
    devtool: 'source-map', // source map for debugging. it can help to see original code in the browser. 
    //NOTE: babel transpile our code into browser-readable content
    entry: './src/index',
    output: { // output directory for files. although all files are in memory for webpack, but we need to declare this.
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js', // filename for bundle
    },
    plugins: [
        new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: "static" }),
        new miniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "process.env.API_URL": JSON.stringify("http://localhost:3001"),
        }),
        new htmlWebpackPlugin({
            template: 'src/index.html',
            favicon: 'src/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [ "babel-loader", "eslint-loader" ]
            },
            {
                test: /(\.css)$/,
                use: [
                    miniCssExtractPlugin.loader,{
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [require('cssnano')],
                            sourceMap: true,
                        }
                    }
                ],
            }
        ],
    }
}