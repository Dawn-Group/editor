const path = require('path');
const merge = require('webpack-merge');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = Math.floor(Math.random() * 1000) + 8000;
const ENV = process.env.NODE_ENV;
const entry = {
    main: ENV === 'production' ? './src':'./example',
   // react: ["react", "react-dom"]
}
const output = {
    path: ENV === 'production' ? path.resolve(__dirname, "lib") : path.resolve(__dirname, "dist"),
    libraryTarget: 'commonjs2',
   // library: "BoldButton",
    chunkFilename: "chunks/js/[hash:8]_[name]_[id].js",
    filename: ENV === 'production' ? "index.js": "dist/js/[name]_[hash].js"
};

const resolve = {
    extensions: [".js", ".css", ".ts", ".tsx", ".less"],
    symlinks: true,
    alias: {
        "@src": path.resolve(__dirname, "src"),
     //   "react": "react/cjs/react.production.min.js",
     //   "react-dom": "react/cjs/react-dom.production.min.js"
    }     
}

const externals = {
    "react": "React",
    "react-dom": "ReactDOM"
}

const jsRule = {
    test: /\.(ts|js)x?$/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader",
        options: {
            cacheDirectory: ".cache"
        } 
    }
}

const styleRule = {
    loader: 'style-loader'
};

const cssRule = {
    loader: "css-loader"
};

const scssRule = {
    loader: "sass-loader"
}


const plugins = [
    new HtmlWebpackPlugin({
        template: "./template.html",
        filename: "index.html"
    })
]

const devServer = {
    host: "localhost",
    port,
    open: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    proxy: {
        '^/proxy': {
            target: 'https://alpha-labs.aidigger.com',
            pathRewrite: {
                '/proxy/*': ''
            },
            changeOrigin: true,
            headers: {
                "Access-COntrol-Allow-Origin": "*",
                withCredentials: true,
                cookie: "",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Aceept, Connection, User-Agent, Cookie"
            }
        }
    }
}  

const optimization = {
    nodeEnv: ENV,
    runtimeChunk: true,
    removeEmptyChunks: true,
    namedModules: true,
    splitChunks: {
        automaticNameDelimiter: '~',
        chunks: "all",
        name: true,
        cacheGroups: {
            commons: {
                name: 'commons',
                chunks: 'initial',
                reuseExistingChunk: true,
                minChunks: 2
            }
        }
    }
}

const performance = {
    hints: false,
    maxEntrypointSize: 300000,
    maxAssetSize: 300000,
    assetFilter: function (assetFilename) {
        return /\.(css|jsx?|tsx?)$/.test(assetFilename);
    }
}

const ComConfig = {
    mode: ENV,
    entry, 
    output,
    resolve,
    devtool: "eval-source-map",
  //  plugins,
    module: {
        rules: [
            jsRule, 
            {
                test: /\.css$/,
                use: [styleRule, cssRule]
            },
           /*  {
                test: /\.scss$/,
                use: [styleRule, cssRule, scssRule]
            } */
        ]
    },
    performance
}

if ("production" === ENV){
    module.exports = merge.strategy({
        'module.rules': 'replace'
    })(ComConfig, {
      //  externals,
        module: {
            rules: [
                jsRule,
                {
                    test: /\.css$/,
                    use: [ExtractCssChunks.hotLoader, ExtractCssChunks.loader, cssRule]
                },
                {
                    test: /\.scss$/,
                    use: [ExtractCssChunks.hotLoader, ExtractCssChunks.loader, cssRule, scssRule]
                }
            ]
        },  
        plugins: [
            new CleanWebpackPlugin([ENV === 'production' ?'lib': 'dist'], { verbose: true, watch: true, beforeEmit: true}),
            new ExtractCssChunks({
                filename: "css/[name]_[hash:8].css",
                chunkFilename: "chunks/css/[name]_[hash:8]_[id].css",
                hot: false, 
                orderWarning: true, 
                reloadAll: true, 
                cssModules: true
            })
        ],
     //   optimization,
      //  performance
    });
} else {
    module.exports = merge(ComConfig, {
        devtool: "eval-source-map",
        plugins,
        devServer
    })
}