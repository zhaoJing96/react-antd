const {
    override,
    fixBabelImports,
    addWebpackAlias,
    addLessLoader
} = require('customize-cra')
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
module.exports = override(
    addWebpackAlias({
        ["@"]: path.resolve(__dirname, "src")
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
                '@primary-color': '#1DA57A'
            },
        },
    }),
)