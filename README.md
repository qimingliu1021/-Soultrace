# 🌌 Soultrace — Generative City Journey via I Ching, GPT‑5 & Remotion

Last weekend at the **OpenAI Hackathon** hosted by **Cerebral Valley**, we (Qiming Liu, Bingbing Ma, and Qiusi Agre “Sophie”) built **Soultrace** — a system that transforms a user’s life story into a cinematic short film using the **I Ching (易经)**, **multi‑agent GPT‑5**, and creative tooling like **Remotion** and **CodeX**.

---

## 🎨 Concept

Soultrace allows a user to:

1. Perform an **I Ching divination**.
2. Input key **cities** and **important life decisions**.
3. Receive a **personalized narrative**, told through:
   - Symbolic trigrams
   - AI‑generated poetry
   - Emotionally matched cityscapes
   - Custom voice narration & BGM
   - A final composited short film

This project explores **emotional geography**, **cultural symbolism**, and **AI‑based memory reconstruction**.

---

## 🛠 Technical Architecture

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Dynamic Pages**:
  - `/divination` — draw trigrams
  - `/city-input` — input memories
  - `/life-path` — preview generated story
  - `/preview` — video preview & download
- **Rendering Engine**: [Remotion](https://www.remotion.dev/) for video composition
- **UI Libraries**: TailwindCSS, Geist UI, HeadlessUI
- **Voice Synth**: OpenAI TTS API

### AI Workflow

| Stage             | Tool / Model      | Output Description                                             |
| ----------------- | ----------------- | -------------------------------------------------------------- |
| Trigram Analysis  | Claude 3 / GPT‑4  | Transforms numbers into 易经卦象, interprets Yin/Yang flow     |
| Life Simulation   | Claude 3          | Simulates key choices via hexagram progression (初 → 上爻)     |
| Poetry Generation | GPT‑4 / Claude    | Generates 《Poem of Life》《Poem of City》with emotional meter |
| Visual Prompting  | GPT‑4 / Codex     | Generates story-driven image prompts and HTML compositions     |
| Image Retrieval   | Agent / Puppeteer | Crawls for matching cityscape visuals                          |
| Voice Narration   | OpenAI TTS        | Synthesizes emotional readings of poems                        |
| Final Assembly    | Codex + Remotion  | Renders high-res MP4 with BGM, images, subtitles               |

---

## ⚙️ Backend & Agent Orchestration

### Agents

- **Hexagram Engine** — converts user numbers into primary, mutual, and transformed trigrams.
- **Poetry Agent** — generates life-stage-specific verses using Claude 3 and stylistic system prompts.
- **Visual Agent** — parses poem and trigram tone → creates HTML/CSS/JS visual “scenes” via Codex.
- **City Agent** — cross-references five-element data and emotional resonance for U.S. city matching.

### MCP (Multi‑Agent Coordination Protocol)

- Powered by **OpenAI Responses API** and **MCP Server**.
- Agents work asynchronously: poem → visual → narration → animation → assembly.
- Responses API allowed rapid iteration, cutting GPT latency nearly in half.

---

## ✨ Contributors

- **Qiming Liu (刘骐铭)** — Responses API, MCP coordination logic, image & poetry agents, Remotion integration.
- **Qiusi Agre (Sophie)** — Artistic direction, prompt-engineered layered cityscapes with shadow variations.
- **Bingbing Ma** — Life-simulation agent, trigram mapping and cultural insight.

---

## 🌱 Outcome

Within 48 hours, we built:

- An interactive Next.js frontend.
- An agent-powered backend that could transform 3 numbers + city memories → into a poetic script → into a generative video with voice narration.

---

## 📌 Tech Stack

- `Next.js` + `Remotion` + `TailwindCSS`
- `Claude 3`, `GPT‑4`, `OpenAI TTS`
- `Responses API`, `MCP Server`, `Codex`
- `Puppeteer` (image crawler), `FFmpeg` (video post-processing)

---

## 💡 Next Steps

- [ ] Automate five-element mapping across all U.S. cities
- [ ] Improve visual-to-poetry alignment via embedding feedback loop
- [ ] Add multi-pass rendering in Remotion (intro → poem → image → finale)
- [ ] Experiment with AI Agent feedback (life-path emotion correction)
- [ ] Wrap into product prototype (export/share + city recommendation dashboard)

---

## 🧭 License

This project is for creative & research use under the [MIT License](./LICENSE).

---
