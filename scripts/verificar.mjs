// Comprobación de desarrollo opcional, sin dependencias y sin iniciar servidor.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
function filesAt(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? (entry.name.startsWith('.') ? [] : filesAt(path)) : [path];
  });
}
const files = filesAt(root);
const errors = [];
let links = 0;
const htmlFiles = files.filter(path => extname(path) === '.html');
const sources = new Map(htmlFiles.map(path => [path, readFileSync(path, 'utf8')]));
const idsFor = text => [...text.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
for (const [path, source] of sources) {
  const ids = idsFor(source);
  if (new Set(ids).size !== ids.length) errors.push(`${relative(root, path)}: identificadores duplicados`);
  if (!source.includes('lang="es"') || !source.includes('name="viewport"')) errors.push(`${relative(root, path)}: falta idioma o viewport`);
  for (const tag of source.matchAll(/<[^!][^>]*>/g)) {
    for (const match of tag[0].matchAll(/\b(?:src|href|data-document)="([^"]+)"/g)) {
      const reference = match[1];
      if (/^(https?:|mailto:|data:)/.test(reference)) continue;
      if (reference === '#archivo-pendiente' && /data-(?:pending|document)=/.test(tag[0])) continue;
      links++;
      const [filePart, hash] = reference.split('#');
      const target = filePart ? resolve(dirname(path), decodeURIComponent(filePart.split('?')[0])) : path;
      if (!existsSync(target)) errors.push(`${relative(root, path)}: archivo ausente ${reference}`);
      else if (hash && sources.has(target) && !idsFor(sources.get(target)).includes(hash)) errors.push(`${relative(root, path)}: ancla ausente ${reference}`);
      // Linux/GitHub Pages distingue mayúsculas y minúsculas, Windows no.
      if (filePart && existsSync(target)) {
        const actualName = readdirSync(dirname(target));
        const name = target.split(/[\\/]/).pop();
        if (!actualName.includes(name)) errors.push(`${relative(root, path)}: mayúsculas incorrectas ${reference}`);
      }
    }
  }
  for (const image of source.matchAll(/<img\b[^>]*>/g)) if (!/\balt="[^"]*"/.test(image[0])) errors.push(`${relative(root, path)}: imagen sin alt`);
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`OK: ${htmlFiles.length} páginas HTML, ${links} rutas/anclas locales, imágenes con alt e identificadores únicos. Sin servidor ni dependencias.`);
