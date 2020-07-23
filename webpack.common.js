const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:  './src/main.jsx',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'react antd',
            template: 'index.html',
            filename: 'index.html'
        }),
    ],
    output: {
        filename: 'js/[name].[hash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.less'],
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'stage-0'],
                        plugins: ['transform-decorators-legacy', 'transform-decorators']
                    }
                },
                include: path.resolve(__dirname, './src'),
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'happypack/loader?id=happyBabel',
                include: path.resolve(__dirname, './src'),
                exclude: /node_modules/
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                include: /fonts?/,
                options: {
                    limit: 1024,
                    name: '/static/fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                exclude: /fonts?/,
                options: {
                    limit: 4096,
                    name: '/static/images/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    name: '/static/media/[name].[hash:7].[ext]'
                }
            },
        ]
    }
}