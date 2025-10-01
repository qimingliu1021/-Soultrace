import {promises as fs} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {generateImagePainting} from './paintingAgent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public', 'paintings');
const remotionDir = path.join(projectRoot, 'app', 'remotion');

const slidesConfig = [
  {
    id: 'chongqing-sky-terraces',
    title: 'Chongqing Sky Terraces',
    city: 'Chongqing',
    country: 'China',
    description: 'Layered riverfront towers glow through mist, echoing the mountain city’s vertical rhythm.',
    prompt: 'Generate an HTML/CSS-only digital painting of Chongqing, China: a tiered skyline wrapped in evening mist, twin rivers reflecting neon ribbons, terraced high-rises stacked against silhouetted mountains, purely abstract strokes and gradients, no text anywhere.',
    palette: ['#1D4ED8', '#60A5FA', '#FACC15'],
    aspectRatio: '16:9',
  },
  {
    id: 'newyork-dusk-grid',
    title: 'New York Dusk Grid',
    city: 'New York',
    country: 'USA',
    description: 'The Manhattan grid burns amber against twilight, framed by glass spires and river light.',
    prompt: 'Paint New York City at dusk using only HTML and CSS: aerial view of Manhattan’s grid, warm amber street canyons, reflective skyscrapers, hints of the Hudson and East River glow, energetic brush-like gradients, absolutely no lettering.',
    palette: ['#FB923C', '#F97316', '#38BDF8'],
    aspectRatio: '16:9',
  },
  {
    id: 'lincoln-cathedral-haze',
    title: 'Lincoln Cathedral Haze',
    city: 'Lincoln',
    country: 'England',
    description: 'Gothic spires rise above gentle stone terraces washed in soft morning fog.',
    prompt: 'Create an HTML-rendered city painting of Lincoln, England: elevated view with Lincoln Cathedral silhouetted, soft pastel fog over stone rooftops, winding streets fading into countryside, watercolour-like gradients, no textual elements.',
    palette: ['#9CA3AF', '#FDE68A', '#60A5FA'],
    aspectRatio: '16:9',
  },
  {
    id: 'shanghai-neon-harbour',
    title: 'Shanghai Neon Harbour',
    city: 'Shanghai',
    country: 'China',
    description: 'Pudong’s skyline arcs over the Huangpu, alive with neon reflections in a humid night.',
    prompt: 'Produce an HTML/CSS painting of Shanghai, China: Pudong skyline with Oriental Pearl Tower, sweeping Bund lights mirrored in the Huangpu River, saturated neon and atmospheric haze, stylised gradients, no words at all.',
    palette: ['#9333EA', '#F472B6', '#34D399'],
    aspectRatio: '16:9',
  },
  {
    id: 'chicago-lakefront-aurora',
    title: 'Chicago Lakefront Aurora',
    city: 'Chicago',
    country: 'USA',
    description: 'Lake Michigan mirrors the skyline as cool blues meet jazz-like pulses of light.',
    prompt: 'Render Chicago, USA as an HTML-based painting: lakefront skyline with Willis Tower, cool blues of Lake Michigan blending with rhythmic neon accents, abstract strokes hinting at elevated trains, zero text labels.',
    palette: ['#1E3A8A', '#3B82F6', '#FBBF24'],
    aspectRatio: '16:9',
  },
];

async function main() {
  await fs.mkdir(publicDir, {recursive: true});

  const slides = [];

  for (let index = 0; index < slidesConfig.length; index += 1) {
    const config = slidesConfig[index];
    const result = await generateImagePainting({
      prompt: config.prompt,
      palette: config.palette,
      aspectRatio: config.aspectRatio,
    });

    const extension = result.mimeType?.includes('svg') ? 'svg' : 'png';
    const filename = `slide-${index + 1}.${extension}`;
    if (result.imageB64) {
      const buffer = Buffer.from(result.imageB64, 'base64');
      await fs.writeFile(path.join(publicDir, filename), buffer);
    }

    slides.push({
      id: config.id,
      title: config.title,
      description: config.description,
      prompt: config.prompt,
      palette: config.palette,
      city: config.city,
      country: config.country,
      aspectRatio: config.aspectRatio,
      image: result.imageB64 ? `/paintings/${filename}` : result.imageUrl ?? null,
      meta: {
        model: result.meta?.model,
        usedOpenAI: Boolean(result.meta?.usedOpenAI),
        tokens: result.meta?.tokens ?? null,
        error: result.meta?.error,
      },
    });
  }

  const slidesTsPath = path.join(remotionDir, 'generatedPaintings.ts');
  await fs.mkdir(remotionDir, {recursive: true});

  const tsLines = [
    'export interface PaintingSlide {',
    '  id: string;',
    '  title: string;',
    '  description: string;',
    '  prompt: string;',
    '  palette: readonly string[];',
    '  city: string;',
    '  country: string;',
    '  aspectRatio: string;',
    '  image: string;',
    '  meta: {',
    '    model?: string;',
    '    usedOpenAI?: boolean;',
    '    tokens?: unknown;',
    '    error?: string;',
    '  };',
    '}',
    '',
    `export const paintingSlides: readonly PaintingSlide[] = ${JSON.stringify(slides, null, 2)} as const;`,
    '',
  ];
  await fs.writeFile(slidesTsPath, tsLines.join('\n'), 'utf8');

  console.log(`Generated ${slides.length} slides into`, publicDir);
}

main().catch((error) => {
  console.error('Failed to generate slides', error);
  process.exit(1);
});
