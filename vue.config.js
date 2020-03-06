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
}