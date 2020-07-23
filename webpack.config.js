const path = require('path'); // 引入文件路径
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //使用 extract-text-webpack-plugin就可以把css从js中独立抽离出来
const HtmlWebpackPlugin = require('html-webpack-plugin'); //根据模板生成html
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin'); //每次打包之前，删除上一次打包生成的文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩CSS模块;

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
                //添加对样式表的处理。css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中
                use: ExtractTextPlugin.extract({
                    use: ExtractTextPlugin.extract({
                        use: [{
                                loader: 'style-loader',
                            }, {
                                loader: 'css-loader?importLoaders=1',
                                options: {
                                    modules: false,
                                }
                            },
                            {
                                loader: 'postcss-loader'
                            }
                        ]
                    })
                })
            },
            {
                //正则匹配后缀.less文件;
                test: /\.less$/,
                //使用html-webpack-plugin插件独立css到一个文件;
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: 'css-loader?importLoaders=1',
                            options: {
                                modules: {
                                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                }
                              }
                        },
                        {
                            loader: 'postcss-loader', //配置参数;
                            options: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer')
                                        ({
                                            browsers: ['ios >= 7.0']
                                        })
                                    ];
                                }
                            }
                        },
                        //加载less-loader同时也得安装less;
                        "less-loader"
                    ]
                })
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
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(), // 模块热替换插件
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html', // 生成html模板路径
            filename: 'index.html',
            inject: 'body'
        }),
        //压缩css（注:因为没有用style-loader打包到js里所以webpack.optimize.UglifyJsPlugin的压缩本身对独立css不管用）;
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g, //正则匹配后缀.css文件;
            cssProcessor: require('cssnano'), //加载‘cssnano’css优化插件;
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            }, //插件设置,删除所有注释;
            canPrint: true //设置是否可以向控制台打日志,默认为true;
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    },
                    warnings: false,
                    compress: {
                        drop_debugger: true,
                        drop_console: true
                    }
                }
            })
        ]
    },
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