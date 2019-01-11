require('@babel/polyfill');

const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Merge = require('webpack-merge');

//服务启动控制器：true 启动、构建所有；['ucf-app-order'] 单独启动某些微服务模块
const bootList = ['walsin-app-sales'];

//标准webpack配置暴露
module.exports = (env, argv) => {

    //入口集合
    const entries = {};
    //HTML插件
    const HtmlPlugin = [];
    //启动器控制
    const _bootList = new Set();

    //构造模块加载入口以及html出口
    glob.sync('./ucf-apps/*/src/app.js').forEach(_path => {
        //模块名
        const module = `${_path.split('./ucf-apps/')[1].split('/src/app.js')[0]}`;
        const chunk = `${module}/index`;
        const htmlConf = {
            filename: `${chunk}.html`,
            template: `${_path.split('/app.js')[0]}/index.html`,
            inject: 'body',
            chunks: [chunk],
            hash: env.mode == 'development' ? false : true
        };
        //处理启动器逻辑
        if (bootList && typeof bootList == 'boolean') {
            entries[chunk] = _path;
            HtmlPlugin.push(new HtmlWebPackPlugin(htmlConf));
        } else if (Array.isArray(bootList) && bootList.length > 0) {
            bootList.forEach(item => {
                _bootList.add(item);
            });
            if (_bootList.has(module)) {
                entries[chunk] = _path;
                HtmlPlugin.push(new HtmlWebPackPlugin(htmlConf));
            }
        }


    });
    // process.exit(0);

    //暴露最终Merge后的配置
    return Merge({
        mode: env.mode,
        devtool: env.mode == 'development' ? 'cheap-module-eval-source-map' : 'source-map',
        entry: entries,
        output: {
            //path: path.resolve(__dirname, '..', 'ucf-publish'),
            path: path.resolve(__dirname, 'dist'),
            filename: env.mode == 'development' ? '[name].js' : '[name].[hash:8].js',
            chunkFilename: env.mode == 'development' ? '[name].chunk.js' : '[name].[hash:8].chunk.js',
        },
        devServer: {
            proxy: {
                '/api': {
                    target: 'https://cnodejs.org',
                    secure: false,
                    //pathRewrite: {'^/api' : ''}
                }
            }
        },
        optimization: {
            minimizer: env.mode != 'development' ? [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true // set to true if you want JS source maps
                }),
                new OptimizeCSSAssetsPlugin({})
            ] : []
        },
        resolve: {
            extensions: ['.js', '.jsx', '.less', '.json', '.css'],
            alias: {
                'ucf-apps': path.resolve(__dirname, 'ucf-apps/'),
                'ucf-common': path.resolve(__dirname, 'ucf-common/src/'),
                components: path.resolve(__dirname, 'ucf-common/src/components/'),
                static: path.resolve(__dirname, 'ucf-common/src/static/'),
                utils: path.resolve(__dirname, 'ucf-common/src/utils/')
            }
        },
        module: {
            rules: [{
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'ucf-apps'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            ['dynamic-import-webpack', {
                                'helpers': false,
                                'polyfill': true,
                                'regenerator': true
                            }],
                            '@babel/plugin-proposal-class-properties',
                            ['@babel/plugin-transform-runtime', {
                                'corejs': false,
                                'helpers': true,
                                'regenerator': true,
                                'useESModules': false
                            }]
                        ]
                    }
                }
            }, {
                test: /\.(le|c)ss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: './'
                    }
                }, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: (loader) => [require('autoprefixer')({ browsers: ['last 2 Chrome versions', 'last 2 Firefox versions', 'Safari >= 7', 'ie > 10'] }),
                        require('postcss-flexbugs-fixes')]
                    }
                }, 'less-loader']
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192 * 100,
                        name: env.mode == 'development' ? '[name].[ext]' : '[name].[hash:8].[ext]',
                        outputPath: 'images/',
                        publicPath: '../images'
                    }
                }]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192 * 100,
                        name: env.mode == 'development' ? '[name].[ext]' : '[name].[hash:8].[ext]',
                        outputPath: 'fonts/',
                        publicPath: '../fonts'
                    }
                }]
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: env.mode == 'development' ? '[name].css' : '[name].[hash:8].css',
                chunkFilename: env.mode == 'development' ? '[name].css' : '[name].[hash:8].chunk.css'
            }),
            new webpack.DefinePlugin({
                GROBAL_HTTP_CTX: JSON.stringify("/ucf_demo")
            }),
            ...HtmlPlugin
        ]
    }, env.mode != 'development' ? {//production环境
        //plugins: [new CleanWebpackPlugin(['dist']),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static'
        // })]
    } : {});
}