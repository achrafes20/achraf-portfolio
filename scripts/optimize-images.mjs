/**
 * Optimise les images du portfolio.
 *
 * - convertit les PNG/JPG de public/images en WebP (largeur max 1600 px, qualité 80) ;
 * - renomme dossiers et fichiers en kebab-case (sans espaces ni underscores) ;
 * - supprime les originaux convertis ;
 * - écrit src/data/image-sizes.json (largeur/hauteur de chaque image) pour que
 *   le navigateur réserve la place des images avant leur chargement (pas de CLS).
 *
 * Usage : npm run images
 * Le script est idempotent : on peut le relancer après avoir ajouté de nouvelles images.
 */
import { readdir, rm, mkdir, writeFile, rmdir, stat, rename } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const SIZES_FILE = path.join(ROOT, "src", "data", "image-sizes.json");
const MAX_WIDTH = 1600;
const QUALITY = 80;
const SOURCE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

const kebab = (value) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-zA-Z0-9.-]/g, "")
    .replace(/-+/g, "-")
    .toLowerCase();

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

async function removeEmptyDirectories(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    let childPath = path.join(directory, entry.name);
    // Windows/macOS ignorent la casse : "AgileFlow" et "agileflow" sont le même dossier.
    // On renomme en deux temps pour obtenir des chemins en minuscules, indispensables
    // sur un hébergeur Linux (Vercel) qui, lui, distingue la casse.
    if (entry.name !== kebab(entry.name) && entry.name.toLowerCase() === kebab(entry.name)) {
      const finalPath = path.join(directory, kebab(entry.name));
      await rename(childPath, `${childPath}.tmp`);
      await rename(`${childPath}.tmp`, finalPath);
      childPath = finalPath;
    }
    await removeEmptyDirectories(childPath);
  }
  if (directory !== IMAGES_DIR && (await readdir(directory)).length === 0) {
    await rmdir(directory);
  }
}

const toPublicUrl = (filePath) => "/" + path.relative(PUBLIC_DIR, filePath).split(path.sep).join("/");

const sizes = {};
let savedBytes = 0;

for (const file of await walk(IMAGES_DIR)) {
  const extension = path.extname(file).toLowerCase();
  const relativeDir = path.relative(IMAGES_DIR, path.dirname(file));
  const targetDir = path.join(IMAGES_DIR, ...relativeDir.split(path.sep).filter(Boolean).map(kebab));

  if (extension === ".webp") {
    const { width, height } = await sharp(file).metadata();
    sizes[toPublicUrl(file)] = { width, height };
    continue;
  }
  if (!SOURCE_EXTENSIONS.has(extension)) continue;

  const target = path.join(targetDir, kebab(path.basename(file, path.extname(file))) + ".webp");
  await mkdir(targetDir, { recursive: true });

  const { size: originalSize } = await stat(file);
  const info = await sharp(file)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(target);

  if (path.resolve(target) !== path.resolve(file)) await rm(file);
  savedBytes += originalSize - info.size;
  sizes[toPublicUrl(target)] = { width: info.width, height: info.height };
  console.log(`${toPublicUrl(file)} -> ${toPublicUrl(target)} (${Math.round(originalSize / 1024)} Ko -> ${Math.round(info.size / 1024)} Ko)`);
}

await removeEmptyDirectories(IMAGES_DIR);

const sortedSizes = Object.fromEntries(Object.entries(sizes).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(SIZES_FILE, JSON.stringify(sortedSizes, null, 2) + "\n");

console.log(`\n${Object.keys(sizes).length} images référencées, ${Math.round(savedBytes / 1024 / 1024 * 10) / 10} Mo économisés.`);
