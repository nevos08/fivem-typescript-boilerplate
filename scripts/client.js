import { build } from './shared'

build({
    entryPoints: ['src/client/index.ts'],
    outfile: 'dist/client.js',
})
