const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

// with below environment setup, babel plugin knows that development is running.
process.env.NODE_ENV = 'development';

module.exports = {
    mode: 'development', //webpack knows to run in development mode. and disables some production-only feaures.
    target: 'web', //it can be also node if we build app to node.
    devtool: 'cheap-module-source-map', // source map for debugging. it can help to see original code in the browser. 
    //NOTE: babel transpile our code into browser-readable content
    entry: './src/index',
    output: { // output directory for files. although all files are in memory for webpack, but we need to declare this.
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js', // filename for bundle
    },
    devServer: {
        stats: 'minimal', //reduces information that writes commandline.
        overlay: true, //overlays any error occurs on browser
        historyApiFallback: true, //all sent request will be sent to index.html
        //
        disableHostCheck: true,
        headers: { "Access-Control-Allow-Origin":"*" },
        https: false,
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.API_URL": JSON.stringify("http://localhost:3001"),
        }),
        new htmlWebpackPlugin({
            template: 'src/index.html',
            favicon: 'src/favicon.ico',
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
                use: [ "style-loader", "css-loader" ],
            }
        ],
    }
}