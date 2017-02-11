//Реализацию промисов мы будем использовать из проекта bluebird
global.Promise         = require('bluebird');
var webpack            = require('webpack');
var path               = require('path');
//Сборка css
var ExtractTextPlugin  = require('extract-text-webpack-plugin');
//Удаляем хеши старых собранных ресурсов для осуществления очередной сборки
var CleanWebpackPlugin = require('clean-webpack-plugin');

var publicPath         = 'http://localhost:8051/public/assets';
var cssName            = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';
var jsName             = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';

//@todo попробовать поразбивать бандлы на отдельные

//плагины webpack, которые будут использоваться в сборке
var plugins = [
    //задаём с помощью DefinePlugin глобальные переменные сборки
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER:  JSON.stringify(true),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }
    }),
    new ExtractTextPlugin(cssName)
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new CleanWebpackPlugin([ 'public/assets/' ], {
            root: __dirname,
            verbose: true,
            dry: false
        })
    );
    //плагины оптимизации
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
}

module.exports = {
    //точки входа (выполнение в старых браузерах, client.js - через него будут изначально идти все запросы)
    entry: ['babel-polyfill', './src/client.js'],
    eslint: { configFile: '.eslintrc' },
    debug: process.env.NODE_ENV !== 'production',
    // webpack будет искать SomeClass в файлах SomeClass.js или SomeClass.jsx прежде, чем сообщит, что не может найти указанный файл.
    resolve: {
        root:               path.join(__dirname, 'src'),
        modulesDirectories: ['node_modules'],
        extensions:         ['', '.js', '.jsx']
    },
    plugins,
    //сюда webpack положит все файлы после сборки
    output: {
        path: `${__dirname}/public/assets/`,
        filename: jsName,
        publicPath
    },
    module: {
        //указываем список конвееров и правила как webpack их интепретировать
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
            },
            { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
            { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
            { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
            { test: /\.svg/, loader: 'url-loader?limit=26000&mimetype=image/svg+xml' },
            { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' },
            { test: /\.jsx?$/, loader: process.env.NODE_ENV !== 'production' ? 'react-hot!babel!eslint-loader' : 'babel', exclude: [/node_modules/, /public/] },
            { test: /\.json$/, loader: 'json-loader' },
        ]
    },
    //добавляем source-map чтобы понимать где и в какм файле приложения произошла ошибка
    devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : null,
    //указываем заголовок, чтобы не было конфликтов CORS с webpack-dev-server
    devServer: {
        headers: { 'Access-Control-Allow-Origin': '*' }
    }
};