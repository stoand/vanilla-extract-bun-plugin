import { type BunPlugin } from 'bun';
import { dirname, join } from 'path';

import {
    cssFileFilter,
    virtualCssFileFilter,
    processVanillaFile,
    getSourceFromVirtualCssFile,
    compile,
    vanillaExtractTransformPlugin,
    type IdentifierOption,
    type CompileOptions,
} from '@vanilla-extract/integration';

const vanillaCssNamespace = 'vanilla-extract-css-ns';

export const VanillaCssPlugin: BunPlugin = {
    name: 'VanillaCss',

    setup(build) {
        build.onResolve({ filter: virtualCssFileFilter }, args => {
            return {
                path: args.path,
                namespace: vanillaCssNamespace,
            };
        });

        build.onLoad({ filter: /.*/, namespace: vanillaCssNamespace }, async ({ path }) => {

            let { source, fileName } = await getSourceFromVirtualCssFile(path);

            const rootDir = process.cwd();

            const resolveDir = dirname(join(rootDir, fileName));

            return {
                contents: source,
                loader: 'css',
                resolveDir,
            };
        });

        build.onLoad({ filter: cssFileFilter }, async ({ path }) => {

            const identOption = build.config.minify ? 'short' : 'debug';

            const { source, watchFiles } = await compile({
                filePath: path,
                identOption,
            });

            const contents = processVanillaFile({
                source,
                filePath: path,
                identOption,
            });

            return {
                contents,
                loader: 'js',
                watchFiles,
            };
        });
    },
};

