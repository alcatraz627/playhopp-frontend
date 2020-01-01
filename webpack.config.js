const webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, options) => ({
    entry: './src/index.js',
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            "includePaths": [
                                // To be able to use @import "~/<lib...>" in scss files
                                require('path').resolve(__dirname, 'node_modules'),
                            ],
                        },
                    }
                ]
            },
            {
                test: /\.(jp?eg|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            },
            {
                test: /\.(eot|svg|ttf|woff2?|otf)$/,
                use: 'file-loader',
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({}),
        new webpack.DefinePlugin({
            __MODE__: `"${options.mode}"`
        }),
        new HtmlWebpackPlugin({
            favicon: "./assets/logo.png",
            template: "./dist/index.html",
            minify: true,
            showErrors: true
        })
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: "source-map",
    devServer: {
        disableHostCheck: true,
        contentBase: './dist',
        overlay: true,
        hot: true,
        port: 9000,
        compress: true,
        historyApiFallback: true,
        progress: true,
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:8000',
        //         changeOrigin: true,
        //     }
        // }
    }
})
