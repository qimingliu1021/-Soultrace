import {promises as fs} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {generateHtmlPainting} from './paintingAgent.js';

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

function buildSvg({palette, index}) {
  const [primary, secondary, accent] = palette;
  const gradientId = `sky-gradient-${index}`;
  const hazeId = `haze-${index}`;
  const width = 1280;
  const height = 720;
  const buildingLayers = 6;

  const skyline = Array.from({length: buildingLayers}).map((_, layer) => {
    const depth = layer + 1;
    const baseHeight = height * (0.34 + depth * 0.08);
    const randomness = 90 - depth * 8;
    const opacity = 0.32 + depth * 0.08;
    const color = layer % 2 === 0 ? secondary : accent;

    const buildingCount = 8 + layer * 3;
    const widthStep = width / buildingCount;

    let path = `M 0 ${height}`;
    for (let i = 0; i <= buildingCount; i += 1) {
      const x = i * widthStep;
      const variation = Math.sin((i + layer * 2) * 0.9) * randomness;
      const y = Math.max(0, baseHeight - variation);
      const roof = y - (20 + depth * 6);
      path += ` L ${x} ${y} L ${x + widthStep * 0.5} ${roof} L ${x + widthStep} ${y}`;
    }
    path += ` L ${width} ${height}`;

    return `<path d="${path}" fill="${color}" fill-opacity="${Math.min(opacity, 0.95)}" />`;
  });

  return `<!DOCTYPE svg>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primary}" />
      <stop offset="60%" stop-color="${secondary}" />
      <stop offset="100%" stop-color="${accent}" />
    </linearGradient>
    <filter id="${hazeId}">
      <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="4" />
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.4" />
      </feComponentTransfer>
      <feGaussianBlur stdDeviation="6" />
    </filter>
  </defs>
  <rect width="${width}" height="${height}" fill="${primary}" />
  <rect width="${width}" height="${height}" fill="url(#${gradientId})" opacity="0.88" />
  <rect width="${width}" height="${height}" filter="url(#${hazeId})" opacity="0.4" />
  <g opacity="0.16" stroke="rgba(255,255,255,0.18)" stroke-width="1.2" fill="none">
    <path d="M0 ${height * 0.66} Q ${width * 0.28} ${height * 0.52}, ${width * 0.55} ${height * 0.68} T ${width} ${height * 0.54}" />
    <path d="M0 ${height * 0.82} Q ${width * 0.22} ${height * 0.74}, ${width * 0.5} ${height * 0.86} T ${width} ${height * 0.78}" />
  </g>
  <g>
    ${skyline.join('\n    ')}
  </g>
  <g opacity="0.22" fill="rgba(255,255,255,0.32)">
    <circle cx="${width * 0.18}" cy="${height * 0.24}" r="140" />
    <circle cx="${width * 0.74}" cy="${height * 0.18}" r="110" />
    <circle cx="${width * 0.86}" cy="${height * 0.36}" r="180" />
  </g>
</svg>`;
}

async function main() {
  await fs.mkdir(publicDir, {recursive: true});

  const slides = [];

  for (let index = 0; index < slidesConfig.length; index += 1) {
    const config = slidesConfig[index];
    const result = await generateHtmlPainting({
      prompt: config.prompt,
      palette: config.palette,
      aspectRatio: config.aspectRatio,
    });

    const svgContent = buildSvg({
      title: config.title,
      description: config.description,
      palette: config.palette,
      index,
    });

    const filename = `slide-${index + 1}.svg`;
    await fs.writeFile(path.join(publicDir, filename), svgContent, 'utf8');

    slides.push({
      id: config.id,
      title: config.title,
      description: config.description,
      prompt: config.prompt,
      palette: config.palette,
      city: config.city,
      country: config.country,
      aspectRatio: config.aspectRatio,
      image: `/paintings/${filename}`,
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
