module.exports = {
    entry: './src/index.ts',
    devtool: 'source-map',
    output: {
        filename: 'dist/blender-elements.js',
        library: 'Blender',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript'
            },
            {
                test: /\.css$/,
                loader: 'style!css-loader?modules&localIdentName=[local]🌀' //&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5] 
            }
        ]
    }
}
