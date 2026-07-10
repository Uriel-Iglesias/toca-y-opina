#!/usr/bin/env node
/**
 * Generador de páginas de reseñas por negocio (Toca y Opina).
 *
 * Lee clientes.json y, por cada negocio, crea la carpeta /<slug>/ en la raíz
 * del proyecto con index.html + opinion.html (y copia el logo si lo hay).
 *
 * Uso:   node generador-resenas/generar.js
 * Sube:  ./build-hostinger.sh  (ya regenera y empaqueta automáticamente)
 *
 * Sin dependencias: solo Node estándar.
 */
const fs = require('fs');
const path = require('path');

const GEN = __dirname;
const ROOT = path.resolve(GEN, '..');

const STAR_FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l2.95 6.1 6.65.95-4.8 4.7 1.15 6.6L12 18.9 6.05 21l1.15-6.6-4.8-4.7 6.65-.95z' fill='%23E6BE69'/%3E%3C/svg%3E";

// Valores por defecto (paleta joyería negro/oro · catalán). Se pueden sobreescribir por negocio.
const DEFAULTS = {
  lang: 'ca',
  bg: '#0F0D0A', on_dark: '#EFE8D8', muted: '#B2A892', subtle: '#857C6B',
  gold: '#C49A4A', gold_bright: '#E6BE69',
  pregunta1: 'Com ha anat',
  pregunta2: 'la teva experiència?',
  lede: 'La teva valoració ens importa de veritat. Toca les estrelles.',
  eslogan: '',
  direccion: '',
};

const REQUIRED = ['slug', 'nombre', 'email'];

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const slugify = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2)
  .map((w) => w[0].toUpperCase()).join('') || '★';

function readTpl(name) {
  return fs.readFileSync(path.join(GEN, 'plantilla', name), 'utf8');
}

function buildOne(raw, tplIndex, tplOpinion) {
  const c = Object.assign({}, DEFAULTS, raw);

  for (const k of REQUIRED) {
    if (!c[k] || String(c[k]).trim() === '') {
      throw new Error(`Falta el campo obligatorio "${k}" en: ${JSON.stringify(raw)}`);
    }
  }
  if ((!c.place_id || !String(c.place_id).trim()) && (!c.google_url || !String(c.google_url).trim())) {
    throw new Error(`Falta "place_id" o "google_url" en: ${JSON.stringify(raw)}`);
  }
  const googleUrl = (c.google_url && String(c.google_url).trim())
    ? String(c.google_url).trim()
    : 'https://search.google.com/local/writereview?placeid=' + encodeURIComponent(c.place_id);

  const slug = slugify(c.slug);
  if (slug !== c.slug) console.warn(`  ⚠ slug normalizado: "${c.slug}" → "${slug}"`);

  const outDir = path.join(ROOT, slug);
  fs.mkdirSync(outDir, { recursive: true });

  // Logo: imagen real (logo_blanc) o monograma de iniciales.
  let logoHtml, favicon;
  if (c.logo_blanc) {
    const assetsDir = path.join(outDir, 'assets');
    fs.mkdirSync(assetsDir, { recursive: true });
    fs.copyFileSync(path.join(GEN, c.logo_blanc), path.join(assetsDir, 'logo-blanc.png'));
    fs.copyFileSync(path.join(GEN, c.logo_negre || c.logo_blanc), path.join(assetsDir, 'logo-negre.png'));
    logoHtml = `<img class="logo" src="assets/logo-blanc.png" alt="${esc(c.nombre)}" />`;
    favicon = 'assets/logo-negre.png';
  } else {
    logoHtml = `<div class="logo-mono">${esc(initials(c.nombre))}</div>`;
    favicon = STAR_FAVICON;
  }

  const map = {
    LANG: esc(c.lang), NOMBRE: esc(c.nombre), FAVICON: favicon,
    BG: c.bg, ON_DARK: c.on_dark, MUTED: c.muted, SUBTLE: c.subtle, GOLD: c.gold, GOLD_BRIGHT: c.gold_bright,
    LOGO: logoHtml,
    ESLOGAN_BLOCK: c.eslogan ? `<p class="eyebrow">${esc(c.eslogan)}</p>` : '',
    PREGUNTA1: esc(c.pregunta1), PREGUNTA2: esc(c.pregunta2), LEDE: esc(c.lede),
    DIRECCION: esc(c.direccion),
    GOOGLE_URL: googleUrl,
    EMAIL: encodeURIComponent(c.email),
  };
  const apply = (tpl) => tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in map ? map[k] : m));

  fs.writeFileSync(path.join(outDir, 'index.html'), apply(tplIndex));
  fs.writeFileSync(path.join(outDir, 'opinion.html'), apply(tplOpinion));
  return slug;
}

function main() {
  const file = path.join(GEN, 'clientes.json');
  if (!fs.existsSync(file)) { console.error('No existe clientes.json'); process.exit(1); }
  let clientes;
  try { clientes = JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (e) { console.error('clientes.json no es JSON válido: ' + e.message); process.exit(1); }
  if (!Array.isArray(clientes)) { console.error('clientes.json debe ser una lista [ ... ]'); process.exit(1); }

  const tplIndex = readTpl('index.html');
  const tplOpinion = readTpl('opinion.html');

  if (clientes.length === 0) { console.log('clientes.json vacío — nada que generar.'); return; }

  const done = [];
  for (const c of clientes) {
    const slug = buildOne(c, tplIndex, tplOpinion);
    done.push(slug);
    console.log(`  ✓ /${slug}/  →  tocayopina.es/${slug}/`);
  }
  console.log(`\n✓ ${done.length} página(s) generada(s): ${done.join(', ')}`);
}

main();
