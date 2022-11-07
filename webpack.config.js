const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        homepage:'./src/js/homepage.js',
        chat:'./src/js/chat.js',
        addpost:'./src/js/addpost.js',
        routing:'./src/js/routing.js',
        script:'./src/js/script.js',
        index:'./src/index.js'
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/[name].js',
    },
    watch: true
}