// Copy images from the Obsidian vault (notes/) to public/note-assets/
// so that ![[image.png]] embeds resolve. Runs before `dev` and `build`.
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "notes");
const OUT = path.join(__dirname, "..", "public", "note-assets");
const IMAGE = /\.(png|jpe?g|gif|webp|svg|avif)$/i;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.name.startsWith(".")) return [];
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full) : IMAGE.test(e.name) ? [full] : [];
  });
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const files = walk(SRC);
files.forEach((f) => fs.copyFileSync(f, path.join(OUT, path.basename(f))));
console.log(`note-assets: copied ${files.length} image(s)`);
