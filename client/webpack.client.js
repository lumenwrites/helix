const path = require('path')

module.exports = {
    /* Tell webpack the root file of our app */
    entry: './index.js',

    /* Tell webpack to put output file into ./build/server.js. */
    output: {
	filename: 'client.js',
	path: path.resolve(__dirname, 'build')
    },

    /* Run babel on all files it runs through,
       converting ES6 and JSX code into regular ES5. */
    module: {
	rules: [
	    {
		test: /\.js?$/,
		loader: 'babel-loader',
		exclude: /node_modules/,
		options: {
		    presets: ['react', "es2015", 'stage-0']
		}
	    },
	    {
		test: /\.css$/,
		loader: 'style-loader!css-loader'
	    },
	    {
		test: /\.(png|woff|woff2|eot|ttf|svg)$/,
		loader: 'url-loader?limit=100000'
	    }	    
	]
    }
}


