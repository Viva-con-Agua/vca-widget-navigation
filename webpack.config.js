const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname + '/../src/user-widget-plugin.js'),
    output: {
        path: path.resolve(__dirname + '/dist/'),
        publicPath: '/dist/',
        filename: 'widget-user.min.js',
        libraryTarget: 'window',
        library: 'UserWidget'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    cssSourceMap: true,
                    transformToRequire: {
                        video: ["src", "poster"],
                        source: "src",
                        img: "src",
                        image: "xlink:href"
                    }
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
}

// module.exports=[
//
//     // browser based implementation
//     merge(commonConfig, {
//         entry: path.resolve(__dirname + '/../src/user-widget-plugin.js'),
//         output: {
//             filename: 'widget-user.min.js',
//             libraryTarget: 'window',
//             library: 'UserWidget'
//         }
//     }),


    // for the node based implementation
    // merge(commonConfig, {
    //
    // })
// ]