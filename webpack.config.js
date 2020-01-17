const webpack = require('webpack')
const path = require('path')
const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = {
    mode: 'development',
    context: __dirname + "/src",
    target: 'node',
    entry: "./server/index.js",
    node: {
        __dirname: true
    },
    output: {
        path: __dirname + "/dist",
        filename: "server.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ]
    },
    resolve: {
        alias: {
            models: path.resolve(__dirname, 'src/models/'),
            interfaces: path.resolve(__dirname, 'src/interfaces/')
        }
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/.*/),
        new NodemonPlugin({
            watch: path.resolve('./dist'),
            verbose: false,
            script: './dist/server.js',
            ext: 'js,json',
        })
    ],
    stats: 'minimal'
}