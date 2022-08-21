module.exports = {
    runtimeCompiler: true,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('balm-ui-plus', 'balm-ui/dist/balm-ui-plus.js')
            .set('balm-ui-next', 'balm-ui/dist/balm-ui-next.js')
            .set('balm-ui-css', 'balm-ui/dist/balm-ui.css');
    }
};
