/**
 * Génère public/og-image.png (1200×630), l'aperçu affiché lorsqu'on partage
 * le portfolio sur LinkedIn, WhatsApp, Slack, X, etc.
 *
 * Usage : npm run og
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = path.join(ROOT, "public", "og-image.png");
const LOGO = path.join(ROOT, "public", "logo_claire.png");

const WIDTH = 1200;
const HEIGHT = 630;
const technologies = ["Spring Boot", "React", "Docker", "Kubernetes", "Argo CD", "Grafana"];

let chipX = 80;
const chips = technologies
  .map((label) => {
    const width = label.length * 13 + 36;
    const chip = `
      <rect x="${chipX}" y="448" width="${width}" height="46" rx="10" fill="#18242d" stroke="#28c3bd" stroke-opacity="0.45"/>
      <text x="${chipX + width / 2}" y="478" text-anchor="middle" font-size="21" fill="#d6f5f3" font-family="Segoe UI, Arial, sans-serif">${label}</text>`;
    chipX += width + 14;
    return chip;
  })
  .join("");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#090d11"/>
      <stop offset="100%" stop-color="#10232a"/>
    </linearGradient>
    <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
      <path d="M42 0H0V42" fill="none" stroke="#28c3bd" stroke-opacity="0.07" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect x="0" y="0" width="12" height="${HEIGHT}" fill="#28c3bd"/>
  <text x="80" y="150" font-size="28" fill="#28c3bd" font-family="Consolas, monospace" letter-spacing="2">PORTFOLIO</text>
  <text x="80" y="250" font-size="92" font-weight="700" fill="#f7fbff" font-family="Georgia, serif">Achraf Es-serrar</text>
  <text x="80" y="325" font-size="40" fill="#f97316" font-family="Segoe UI, Arial, sans-serif" font-weight="600">Élève ingénieur Full-Stack &amp; DevOps</text>
  <text x="80" y="385" font-size="27" fill="#b6c2cc" font-family="Segoe UI, Arial, sans-serif">ENSA Tétouan · Recherche un PFE de 6 mois dès janvier/février 2027</text>
  ${chips}
  <text x="80" y="568" font-size="25" fill="#71e6df" font-family="Consolas, monospace">esserrar-achraf.vercel.app</text>
</svg>`;

const logo = await sharp(LOGO).resize(150, 150, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: logo, top: 60, left: WIDTH - 230 }])
  .png({ compressionLevel: 9 })
  .toFile(OUTPUT);

console.log(`Image Open Graph générée : ${path.relative(ROOT, OUTPUT)}`);
