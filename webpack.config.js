const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

module.exports = {
    mode: 'production',
    entry: {
        filename: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        assetModuleFilename: 'assets/[name][ext]'
    },
    
    

    plugins: [
        
        new HtmlWebpackInlineSVGPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        
    ],

    module: {
        rules: [{
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader", "postcss-loader"],
            },
            {
                test: /\.css$/i,                                                                                                                                                             
                use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],    
            },
            {
                test: /\.(png|svg|jpg|jpeg )$/i,
                type: 'asset/resource'
            },
           
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                type: 'asset/resource',
                generator: {
                  filename: 'fonts/[name][ext]'
                } 
              }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 4200,
        hot: true
    }
}