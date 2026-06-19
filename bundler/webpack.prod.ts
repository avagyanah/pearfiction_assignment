import TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';

export default (): Configuration =>
    merge(common(), {
        mode: 'production',
        devtool: false,
        optimization: {
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                        format: {
                            comments: false,
                        },
                    },
                }),
            ],
        },
        performance: {
            hints: false,
        },
        stats: {
            assets: true,
            assetsSort: '!size',
            modules: false,
            chunks: false,
            children: false,
            timings: true,
            version: false,
            hash: false,
            builtAt: false,
            warnings: true,
            errors: true,
        },
    });
