import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { Configuration } from 'webpack';

export const PATHS = {
    dist: path.resolve('dist'),
    index: path.resolve('src', 'index.ts'),
    html: path.resolve('public', 'index.html'),
    assets: path.resolve('public', 'assets'),
};

export default (): Configuration => ({
    entry: PATHS.index,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: PATHS.dist,
        clean: true,
        asyncChunks: false,
    },
    optimization: {
        splitChunks: false,
        runtimeChunk: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.html,
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: PATHS.assets, to: 'assets' }],
        }),
    ],
});
