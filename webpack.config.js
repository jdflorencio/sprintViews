const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const PUBLIC_DIR = 'public'
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
    entry: [path.resolve(__dirname, 'src', 'main.js'), path.resolve(__dirname, 'src', 'main.scss')],
    mode: 'development',
    target: 'web',
    devServer: {
        contentBase: path.join(__dirname, PUBLIC_DIR),
        hot: true,
        port: 5000
    },
    output: {
        filename: '[name]-[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    // Disables attributes processing
                    attributes: false,
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'bundle.css'
                        }
                    },
                    { loader: 'extract-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                includePaths: ['./node_modules/']
                            }
                        }
                    }
                ]
            },
            {
                exclude: /node_modules/,
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }

        ],

    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, PUBLIC_DIR, 'index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
} 