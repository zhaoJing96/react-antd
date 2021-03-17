const CracoLessPlugin = require("craco-less");
const path = require('path');

module.exports = {
    plugins: [{
        plugin: CracoLessPlugin,
        options: {
            lessLoaderOptions: {
                lessOptions: {
                    modifyVars: {
                        "@primary-color": "#1DA57A"
                    },
                    javascriptEnabled: true
                }
            }
        }
    }],
    babel: {
        plugins: [
            ["@babel/plugin-proposal-decorators", {
                legacy: true
            }]
        ]
    },
    webpack: {
        // 别名
        alias: {
            "@": path.resolve("src"),
            "@utils": path.resolve("src/utils"),
        }
    },
};