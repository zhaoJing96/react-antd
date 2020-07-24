const path = require('path'); // 引入文件路径
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin'); //浏览器自行打开浏览器
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    // 入口文件
    entry: ['./src/index.js'],
    // 输出
    output: {
        publicPath: "http://localhost:8081/", // 配合devServer本地Server;
        path: path.join(__dirname, 'dist'), // 打包出口路径
        filename: 'index.js' // 打包文件名
    },
    // 模块
    module: {
        rules: [{
                test: /\.css$/,
                //添加对样式表的处理。css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                        }
                    }
                ]
            },
            {
                //正则匹配后缀.less文件;
                test: /\.less$/,
                //使用html-webpack-plugin插件独立css到一个文件;
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                        }
                    }
                ]
            },
            {
                //正则匹配后缀.png、.jpg、.gif图片文件;
                test: /\.(png|jpg|gif)$/i,
                use: [{ //加载url-loader 同时安装 file-loader;
                        loader: 'url-loader',
                        options: {
                            //小于10000K的图片文件转base64到css里,当然css文件体积更大;
                            limit: 10000,
                            //设置最终img路径;
                            name: '/image/[name].[ext]'
                        }
                    },
                    {
                        //压缩图片(另一个压缩图片：image-webpack-loader);
                        loader: 'img-loader?minimize&optimizationLevel=5&progressive=true'
                    },
                ]
            },
            {
                //正则匹配后缀.js 和.jsx文件;
                test: /\.(js|jsx)$/,
                //需要排除的目录
                exclude: '/node_modules/',
                //加载babel-loader转译es6
                use: [{
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react']
                    }
                }],
            },
        ]
    },
    // 插件
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 模块热替换插件
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new OpenBrowserPlugin({
            url: 'http://localhost:8081'
        }) // 浏览器自动运行
    ],
    // 开发中
    devServer: {
        // 配置node本地服务器
        contentBase: './dist',
        hot: true // 本地服务热更新
    },
    resolve: {
        //设置可省略文件后缀名(注:如果有文件没有后缀设置‘’会在编译时会报错,必须改成' '中间加个空格。ps:虽然看起来很强大但有时候省略后缀真不知道加载是啥啊~);
        extensions: [' ', '.css', '.scss', '.sass', '.less', '.js', '.jsx', '.json'],
        //查找module的话从这里开始查找;
        modules: [path.resolve(__dirname, "src"), "node_modules"], //绝对路径;
        //别名设置,主要是为了配和webpack.ProvidePlugin设置全局插件;
        alias: {
            //设置全局jquery插件;
        }
    }
}