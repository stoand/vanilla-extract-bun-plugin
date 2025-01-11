import { VanillaCssPlugin } from '../src';
import { test } from 'bun:test';

test('works', async () => {
    const result = await Bun.build({
        entrypoints: ['./test/source.ts'],
        plugins: [VanillaCssPlugin],
    });

    if (!result.success) {
        throw 'Build Failed';
    }

    console.log('result:\n', await result.outputs[0].text());
});

