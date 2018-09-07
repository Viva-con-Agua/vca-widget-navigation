const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

var commonConfig = {
    output:{
        path: path.resolve(__dirname + '/dist/')
    },
    module:{
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
            }
        ]
    }//,
    // externals:{...},
    // plugins:{...}
}

module.exports=[

    // browser based implementation
    merge(commonConfig, {
        entry: path.resolve(__dirname + '/../src/index.js'),
        output: {
            filename: 'widget-user.min.js',
            libraryTarget: 'window',
            library: 'UserWidget'
        }
    }),


    // for the node based implementation
    merge(commonConfig, {

    })
]