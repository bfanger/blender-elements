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
                loader: 'raw'
            }
        ]
    }
}
