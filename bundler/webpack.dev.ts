import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { merge } from 'webpack-merge';
import common from './webpack.common';

export default (): Configuration & { devServer?: DevServerConfiguration } =>
    merge(common(), {
        mode: 'development',
        devtool: 'inline-source-map',
        performance: {
            hints: false,
        },
        stats: {
            preset: 'errors-warnings',
            timings: true,
        },
        devServer: {
            static: './dist',
            port: 8080,
            open: false,
            client: {
                logging: 'warn',
            },
        },
    });
