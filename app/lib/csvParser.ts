// I Ching 数据服务 - 使用 yijing.mjs
// 动态导入yijing数据
let yijingData: any = null;

async function loadYijingData() {
  if (!yijingData) {
    try {
      const module = await import('../../public/yijing.mjs');
      yijingData = module.default;
    } catch (error) {
      console.error('Failed to load yijing data:', error);
      throw new Error('无法加载易经数据');
    }
  }
  return yijingData;
}

export interface IChingHexagram {
  hex: number;
  hex_font: string;
  trad_chinese: string;
  pinyin: string;
  english: string;
  binary: string | number;
  od: string;
  wilhelm_above: {
    chinese: string;
    symbolic: string;
    alchemical: string;
  };
  wilhelm_below: {
    chinese: string;
    symbolic: string;
    alchemical: string;
  };
  wilhelm_symbolic: string;
  wilhelm_judgment: {
    text: string;
    comments: string;
  };
  wilhelm_image: {
    text: string;
    comments: string;
  };
  wilhelm_lines: {
    [key: number]: {
      text: string;
      comments: string;
    };
  };
}

// 获取所有卦象数据
export async function getAllHexagrams(): Promise<IChingHexagram[]> {
  const data = await loadYijingData();
  return Object.values(data) as IChingHexagram[];
}

// 根据数字计算卦象
export async function calculateHexagram(userNumber: number): Promise<IChingHexagram> {
  const hexagrams = await getAllHexagrams();
  const hexagramIndex = (userNumber % 64);
  return hexagrams[hexagramIndex] || hexagrams[0];
}

// 将二进制字符串转换为六爻数组 (1=阳爻, 0=阴爻)
function binaryToLines(binary: string | number): number[] {
  const binaryStr = binary.toString().padStart(6, '0');
  return binaryStr.split('').map(bit => parseInt(bit));
}

// 将六爻数组转换为二进制字符串
function linesToBinary(lines: number[]): string {
  return lines.join('');
}

// 根据二进制字符串查找对应的卦象
async function findHexagramByBinary(binary: string): Promise<IChingHexagram | null> {
  const hexagrams = await getAllHexagrams();
  return hexagrams.find(h => h.binary.toString() === binary) || null;
}

// 计算变卦 (根据动爻改变)
export async function calculateChangedHexagram(originalHexagram: IChingHexagram, userNumber: number): Promise<IChingHexagram | null> {
  const lines = binaryToLines(originalHexagram.binary);
  // 使用用户数字的各位来确定动爻位置
  const changingLineIndex = (userNumber % 6); // 0-5 对应第1-6爻
  const changingLine = lines[changingLineIndex];
  
  // 创建新的六爻数组，改变动爻
  const newLines = [...lines];
  newLines[changingLineIndex] = changingLine === 1 ? 0 : 1;
  
  const newBinary = linesToBinary(newLines);
  return await findHexagramByBinary(newBinary);
}

// 计算互卦 (取中间四爻)
export async function calculateMutualHexagram(originalHexagram: IChingHexagram): Promise<IChingHexagram | null> {
  const lines = binaryToLines(originalHexagram.binary);
  // 第2、3、4爻形成下卦，第3、4、5爻形成上卦
  const lowerTrigram = [lines[1], lines[2], lines[3]]; // 第2、3、4爻
  const upperTrigram = [lines[2], lines[3], lines[4]]; // 第3、4、5爻
  
  const mutualLines = [...upperTrigram, ...lowerTrigram];
  const mutualBinary = linesToBinary(mutualLines);
  
  return await findHexagramByBinary(mutualBinary);
}

// 计算错卦 (阴阳全部反转)
export async function calculateOppositeHexagram(originalHexagram: IChingHexagram): Promise<IChingHexagram | null> {
  const lines = binaryToLines(originalHexagram.binary);
  const oppositeLines = lines.map(line => line === 1 ? 0 : 1);
  const oppositeBinary = linesToBinary(oppositeLines);
  
  return await findHexagramByBinary(oppositeBinary);
}

// 计算综卦 (上下倒置)
export async function calculateInvertedHexagram(originalHexagram: IChingHexagram): Promise<IChingHexagram | null> {
  const lines = binaryToLines(originalHexagram.binary);
  const invertedLines = [...lines].reverse();
  const invertedBinary = linesToBinary(invertedLines);
  
  return await findHexagramByBinary(invertedBinary);
}

// 计算所有相关卦象
export async function calculateAllRelatedHexagrams(originalHexagram: IChingHexagram, userNumber: number) {
  const [changed, mutual, opposite, inverted] = await Promise.all([
    calculateChangedHexagram(originalHexagram, userNumber),
    calculateMutualHexagram(originalHexagram),
    calculateOppositeHexagram(originalHexagram),
    calculateInvertedHexagram(originalHexagram)
  ]);

  return {
    original: originalHexagram, // 本卦
    changed, // 变卦
    mutual, // 互卦
    opposite, // 错卦
    inverted // 综卦
  };
}

// 生成图像提示词
export function generateImagePrompt(
  hexagram: IChingHexagram,
  city: string,
  experience: string,
  difficulty: string
): string {
  const lines = hexagram.wilhelm_lines;
  const lineKeys = Object.keys(lines);
  const randomKey = lineKeys[Math.floor(Math.random() * lineKeys.length)];
  const selectedLine = lines[parseInt(randomKey)]?.text || 'Wisdom from the hexagram';
  
  return `A mystical and spiritual digital art piece representing the I Ching hexagram "${hexagram.trad_chinese}" (${hexagram.english}). 
  
  Visual elements should include:
  - Ancient Chinese calligraphy and symbols
  - The city of ${city} in the background, stylized and ethereal
  - Elements representing the user's experience: ${experience}
  - Visual metaphors for the current difficulty: ${difficulty}
  - The hexagram line wisdom: "${selectedLine}"
  - The judgment: "${hexagram.wilhelm_judgment.text}"
  - The image: "${hexagram.wilhelm_image.text}"
  
  Style: Traditional Chinese ink painting meets modern digital art, with flowing brushstrokes, misty mountains, and spiritual energy. 
  Color palette: Deep blues, golds, and earth tones with ethereal lighting.
  Mood: Contemplative, wise, and transformative.`;
}