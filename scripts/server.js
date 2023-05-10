import { build } from './shared'

build({
    platform: 'node',
    entryPoints: ['src/server/index.ts'],
    outfile: 'dist/server.js',
    external: ['dotenv'],
})
