process.env.NODE_ENV = 'production';

var webpack = require('webpack');
var config  = require('./webpack.config_production.js');

webpack(config, function(err, stats) {
    if(err) throw new Error(err);

    console.log(stats.toString({ colors: true }));
})