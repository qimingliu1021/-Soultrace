## 🧠 SoulTrace

1. **User initiates session - Divination process**: Display the question - Where is the city that belongs to me?
2. **User input**:
   - Important city they've been to and story behind it
   - Three three-digit numbers
3. **Hexagram analysis**:
   - Based on I Ching data (`lib/iching.ts`)
   - Map direction + element + emotional tone
4. **Life path generation**:
   - Claude/GPT-4 analyzes yao progression (初爻 → 上爻) → emotion + story
5. **Poetry generation**:
   - (poem of Life)
6. **Image generation / scraping**:
   - Based on each line's symbolism and user's cities
7. **Video generation**:
   - Combine poem + image + music into a dynamic visual using **Remotion**
8. **Display & export**:
   - Preview the story
   - Download / share

---

## 🎯 API

Routes (under `/api/`)

| Route                       | Description                                                             |
| --------------------------- | ----------------------------------------------------------------------- |
| `/api/generate-hexagram`    | Return hexagram index, name, and 6 line changes                         |
| `/api/life-path-generation` | Analyze hexagram + user data into structured emotional phases           |
| `/api/generate-images`      | Generate visual concepts per yao line or fetch Unsplash (CODEX FITS IN) |
| `/api/generate-poem`        | Return a poem (GPT-5/Claude)                                            |
| `/api/generate-video`       | Combine images + voice + poem into Remotion timeline                    |
| `/api/audio-generation`     | Store session data for history tracking (OPTIONAL)                      |

---

## 🧩 Core Concepts Used from I Ching

- **64 Hexagrams** with:
  - Six lines (爻) from 初爻 to 上爻
  - Corresponding imagery: animal, natural symbol, emotion
- **后天八卦** direction mapping (e.g. 巽 = 东南)
- **先天八卦** direction mapping (e.g. 巽 = 东南)

---

## 🎥 Video Generation with Remotion

- `app/video/page.tsx` uses `@remotion/player`
- On backend:
  - Construct `composition.tsx` with poem, image assets, and music
  - Use `remotion render` or API render to export `.mp4`
- Optional customization:
  - Transition types
  - Music variation (based on emotion tone)
  - Text-on-screen animation sync with voice

---

## 🎨 AI Capabilities per Step

| Step         | AI Model         | Output                                |
| ------------ | ---------------- | ------------------------------------- |
| 卦象分析     | GPT-4 / Claude   | 阴阳象征 + 爻动变化 + 方向解读        |
| 生命路径叙述 | Claude 3         | 把六爻变迁串成一段人生故事            |
| 诗歌生成     | GPT-4 / Claude   | 《生命之歌》+《城市之歌》带情绪节奏感 |
| 图像提示生成 | GPT-4            | 用意象生成图像 prompt 或搜索关键词    |
| 语音合成     | OpenAI TTS       | 合成诗歌的朗读声音                    |
| 视频编排     | Codex + Remotion | 编排动画、字幕、配图                  |

---

## 🛠️ TODO

- [ ] 城市数据库构建（五行方向分类）
- [ ] UI 优化：抽卦页面、诗歌展示页、视频预览页
- [ ] Remotion 视频模板结构实现
- [ ] 图像生成 prompt 自动化
- [ ] Claude prompt 版本控制（调节输出风格）
- [ ] 提供“再次生成”按钮，鼓励用户多次探索

---

## ✨ Contributors

- **Qiming Liu (刘骐铭)** - Co-founder, Story & System Designer
- **Bingbing** - Cultural Vision & Content Advisor
- **GPT + Claude Agents** - AI Engine

---

## 📌 Inspirations

- 《易经》 (I Ching)
- Carl Jung & Richard Wilhelm’s translation
- Shan Hai Jing 山海经 imagery
- Personal memory, emotional geography, and poetic self-tracing

---

## 🧭 License

This project is for creative & research use under the [MIT License](./LICENSE).

---

Let me know if you'd like this exported as a real `README.md` file or split into multiple documentation pages (like for a GitHub Wiki or Notion).
