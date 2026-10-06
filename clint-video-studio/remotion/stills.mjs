import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
const frames = process.argv.slice(2).map(Number);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({serveUrl, id: process.env.COMP || 'Main'});
for (const f of frames) {
  await renderStill({serveUrl, composition, frame: f, output: `stills/f${f}.png`});
  console.log('ok', f);
}
