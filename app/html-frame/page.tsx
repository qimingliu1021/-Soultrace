'use client';

import {FormEvent, useCallback, useMemo, useState} from 'react';

const defaultHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charSet="utf-8" />
    <title>Soultrace HTML Frame</title>
    <style>
      :root {
        color-scheme: dark;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: radial-gradient(circle at top left, #0b132b 0%, #1c2541 65%, #3a506b 100%);
        font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        color: rgba(255, 255, 255, 0.86);
      }

      figure {
        display: grid;
        gap: 16px;
        max-width: min(520px, 80vw);
        padding: 32px;
        border-radius: 32px;
        background: rgba(4, 9, 24, 0.78);
        box-shadow: 0 32px 60px rgba(8, 14, 38, 0.65);
        backdrop-filter: blur(18px);
      }

      img {
        width: 100%;
        border-radius: 28px;
        border: 1px solid rgba(155, 231, 255, 0.38);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.32);
      }

      figcaption {
        text-align: center;
        font-size: clamp(15px, 1.3vw, 18px);
        letter-spacing: 0.05em;
        text-transform: uppercase;
        opacity: 0.85;
      }
    </style>
  </head>
  <body>
    <figure>
      <img
        alt="Soultrace nebula"
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
      />
      <figcaption>Rendered purely from inline HTML</figcaption>
    </figure>
  </body>
</html>`;

const HtmlFramePage = () => {
  const [htmlSource, setHtmlSource] = useState(defaultHtml);
  const [compiledHtml, setCompiledHtml] = useState(defaultHtml);

  const handleCompile = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setCompiledHtml(htmlSource);
    },
    [htmlSource]
  );

  const handleReset = useCallback(() => {
    setHtmlSource(defaultHtml);
    setCompiledHtml(defaultHtml);
  }, []);

  const stats = useMemo(() => {
    const lineCount = htmlSource.split('\n').length;
    const charCount = htmlSource.length;
    return {lineCount, charCount};
  }, [htmlSource]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#040917] via-[#0d1533] to-[#1e2350] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 py-16">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.6em] text-cyan-200/70">
            Inline HTML Compiler
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            HTML-powered Image Frame
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-200/80 md:text-lg">
            Paste or edit any HTML snippet and compile it directly into the sandboxed frame. The
            <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-[0.85em]">srcDoc</code>
            attribute streams your markup straight into the iframe, letting you prototype visuals
            without leaving the page.
          </p>
        </header>

        <section className="grid gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-start">
          <div className="overflow-hidden rounded-[32px] border border-cyan-200/30 shadow-2xl shadow-cyan-900/40">
            <iframe
              title="Inline HTML Preview"
              className="h-[560px] w-full"
              srcDoc={compiledHtml}
              loading="lazy"
              sandbox="allow-same-origin"
            />
          </div>

          <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-black/20 backdrop-blur">
            <form className="space-y-4" onSubmit={handleCompile}>
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-teal-100/80">
                <span>
                  {stats.lineCount} lines • {stats.charCount} characters
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-full border border-white/20 px-4 py-1.5 uppercase tracking-[0.3em] text-xs text-white/80 transition hover:border-white/40 hover:text-white"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-cyan-400/90 px-4 py-1.5 uppercase tracking-[0.3em] text-xs text-slate-900 transition hover:bg-cyan-300"
                  >
                    Compile
                  </button>
                </div>
              </div>

              <label className="block text-xs uppercase tracking-[0.35em] text-cyan-100/80">
                HTML Source
              </label>
              <textarea
                className="h-[360px] w-full resize-y rounded-2xl border border-white/10 bg-black/30 px-4 py-3 font-mono text-sm leading-relaxed text-teal-100/90 shadow-inner shadow-black/30 focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
                value={htmlSource}
                spellCheck={false}
                onChange={(event) => setHtmlSource(event.target.value)}
              />
              <p className="text-xs text-slate-200/70">
                The frame runs with <code className="rounded bg-white/10 px-1.5 py-0.5 text-[0.85em]">allow-same-origin</code>
                sandboxing. Add inline styles, scripts, or external assets as needed—hit Compile to
                apply your changes instantly.
              </p>
            </form>
          </aside>
        </section>
      </div>
    </main>
  );
};

export default HtmlFramePage;
