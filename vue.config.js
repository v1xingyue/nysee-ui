module.exports = {
    publicPath:
        process.env.NODE_ENV === 'production'
            ? '/'
            : '/',
    outputDir: './dist',
    assetsDir: 'assets',
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            }
        }
    },
    configureWebpack: {
        performance: {
            hints: false
        },
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 250000,
            }
        }
    },
}