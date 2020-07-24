const path = require('path'); // 引入文件路径
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin'); //根据模板生成html

module.exports = {
    // 入口文件
    entry: ['./src/index.js'],
    // 输出
    output: {
        publicPath: "http://localhost:8081/", //配合devServer本地Server;
        path: path.join(__dirname, 'dist'), //打包出口路径
        filename: 'index.js' //打包文件名
    },
    // 模块
    module: {
        rules: [{
                //正则匹配后缀.css文件;
                test: /\.css$/,
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
                }]
            },
        ]
    },
    // 插件
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 模块热替换插件
        //处理.css文件
        new MiniCssExtractPlugin({
            filename: [name].css
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html', // 生成html模板路径
            filename: 'index.html',
            inject: 'body'
        }),
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