import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import react from "@vitejs/plugin-react";
import { createServer } from "vite";

const projectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = join(projectDir, "github-pages");

await rm(outputDir, { recursive: true, force: true });
await mkdir(join(outputDir, "assets"), { recursive: true });

const vite = await createServer({
  root: projectDir,
  configFile: false,
  appType: "custom",
  plugins: [react()],
  server: { middlewareMode: true },
});

try {
  const page = await vite.ssrLoadModule("/app/page.tsx");
  const body = renderToStaticMarkup(React.createElement(page.default));
  const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Material permanente de formação para leitores e candidatos da Paróquia Nossa Senhora de Lourdes, em Areia Preta, Natal/RN.">
  <meta property="og:title" content="A Voz da Palavra | Formação de Leitores">
  <meta property="og:description" content="Formação permanente para leitores e candidatos, com espiritualidade, técnica e orientação litúrgica.">
  <meta property="og:image" content="assets/og.png">
  <title>A Voz da Palavra | Formação de Leitores</title>
  <link rel="stylesheet" href="style.css">
  <script defer src="script.js"></script>
</head>
<body>${body}</body>
</html>`;

  const css = (await readFile(join(projectDir, "app", "globals.css"), "utf8"))
    .replace('url("/og.png")', 'url("assets/og.png")');

  const browserScript = `(() => {
  const storageKey = "leitores-formacao-permanente";
  const cards = [...document.querySelectorAll("[data-resource-id]")];
  const readSaved = () => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); }
    catch { return []; }
  };
  const update = () => {
    const saved = readSaved();
    cards.forEach((card) => {
      const input = card.querySelector('input[type="checkbox"]');
      const checked = saved.includes(card.dataset.resourceId);
      input.checked = checked;
      card.classList.toggle("completed", checked);
      const label = input.parentElement;
      label.lastChild.textContent = checked ? "Estudado" : "Marcar como estudado";
    });
    const count = cards.filter((card) => saved.includes(card.dataset.resourceId)).length;
    const percent = cards.length ? Math.round((count / cards.length) * 100) : 0;
    const progress = document.querySelector(".progress-card");
    if (progress) {
      progress.querySelector("strong").textContent = percent + "%";
      progress.querySelector(".progress-track span").style.width = percent + "%";
      progress.querySelector("small").textContent = count + " de " + cards.length + " roteiros consultados neste aparelho";
    }
  };
  cards.forEach((card) => {
    const input = card.querySelector('input[type="checkbox"]');
    input.addEventListener("change", () => {
      const current = new Set(readSaved());
      if (input.checked) current.add(card.dataset.resourceId);
      else current.delete(card.dataset.resourceId);
      localStorage.setItem(storageKey, JSON.stringify([...current]));
      update();
    });
  });
  document.querySelector(".print-button")?.addEventListener("click", () => window.print());
  update();
})();`;

  const instructions = `# Publicar no GitHub Pages

1. Envie todos os arquivos desta pasta para a raiz do repositório no GitHub.
2. No repositório, abra Settings > Pages.
3. Em Build and deployment, escolha Deploy from a branch.
4. Selecione a branch main, a pasta /(root) e clique em Save.

O site é estático, não precisa instalar nada e funciona mesmo quando o repositório tem outro nome.
`;

  await Promise.all([
    writeFile(join(outputDir, "index.html"), html, "utf8"),
    writeFile(join(outputDir, "style.css"), css, "utf8"),
    writeFile(join(outputDir, "script.js"), browserScript, "utf8"),
    writeFile(join(outputDir, "README.md"), instructions, "utf8"),
    writeFile(join(outputDir, ".nojekyll"), "", "utf8"),
    cp(join(projectDir, "public", "og.png"), join(outputDir, "assets", "og.png")),
  ]);
} finally {
  await vite.close();
}

console.log(outputDir);
