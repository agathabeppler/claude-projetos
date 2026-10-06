// Renderiza quadros em instantes (segundos) de uma composição, reaproveitando um único bundle.
// uso: COMP=Video node storyboard.mjs <pasta_saida> <seg1> <seg2> ...
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';
const [outDir, ...secs] = process.argv.slice(2);
fs.mkdirSync(outDir, {recursive: true});
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({serveUrl, id: process.env.COMP || 'Video'});
for (const s of secs.map(Number)) {
  const frame = Math.min(Math.round(s * composition.fps), composition.durationInFrames - 1);
  for (let tent = 0; tent < 3; tent++) {
    try {
      await renderStill({serveUrl, composition, frame, output: path.join(outDir, `q_${String(Math.round(s * 100)).padStart(6, '0')}.png`), scale: 0.5});
      break;
    } catch (e) {
      if (tent === 2) throw e;
    }
  }
  console.log('ok', s);
}
