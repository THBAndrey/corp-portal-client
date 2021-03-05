module.exports = {
    publicPath: '',
    outputDir: './../www',
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].meta = {
                'http-equiv': 'Content-Security-Policy',
                content:
                    "default-src *; style-src * 'unsafe-inline'; script-src * 'unsafe-inline' 'unsafe-eval'; media-src *; img-src * filesystem: data:"
            };

            return args;
        });
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
    },
    devServer: {
        port: 3000,
        proxy: {
            '^/api': {
                target: 'http://corport-demo.goodt.org/'
            }
        }
    }
};
