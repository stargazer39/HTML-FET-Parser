const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const path = require("path"); 
const srcDir = path.join(__dirname,"src");

module.exports = {
    entry:{ 
        "test":path.join(srcDir,"test.ts"),
        "parseFET":path.join(srcDir,"parseFET.ts"),
    },
    mode:"production",
    target: "node",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    externals: [ nodeExternals() ]
}
