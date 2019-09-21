const webpack = require('webpack')

module.exports = (env, options) => {
    console.log(options.mode)
    let envKeys = {mode: `"${options.mode}"`}

    return {
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
                    test: /\.(scss|sass|css)$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader',
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
            new webpack.DefinePlugin(envKeys),
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
            proxy: {
                '/api': {
                    target: 'http://localhost:8000',
                    changeOrigin: true,
                }
            }
        }
    }
}