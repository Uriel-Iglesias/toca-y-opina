# SEO Audit — Toca y Opina

**Fecha**: 2026-05-22
**URL auditada**: https://uriel-iglesias.github.io/toca-y-opina/
**Próximo dominio**: TBD (Hostinger)

---

## 0. Diagnóstico ejecutivo

**Lo que ya está bien:**
- Meta description, viewport y canonical correctos
- JSON-LD Product + Offer + AggregateRating en el index
- Sitemap + robots.txt presentes
- Imágenes con alt descriptivo
- Mobile-first verificado (sin scroll horizontal)
- Tailwind CDN (sirve pero pesa — ver §3.4)
- Blog con 5 artículos largos relevantes (intern. linking)

**Los 12 gaps con más impacto, en orden de prioridad:**

| # | Issue | Impacto | Esfuerzo | Estado |
|---|---|---|---|---|
| 1 | Open Graph image no existe físicamente | ALTO | Bajo | TODO |
| 2 | No hay favicon ICO (solo el SVG inline) | MEDIO | Bajo | TODO |
| 3 | No hay Apple touch icon | MEDIO | Bajo | TODO |
| 4 | JSON-LD Organization + LocalBusiness ausentes | ALTO | Bajo | TODO |
| 5 | JSON-LD FAQPage no existe (las FAQ están en HTML) | ALTO | Medio | TODO |
| 6 | Las imágenes son JPG, no WebP/AVIF | ALTO | Medio | TODO |
| 7 | `loading="lazy"` falta en algunas imágenes | BAJO | Bajo | TODO |
| 8 | Tailwind CDN bloquea render — sustituir por CSS compilado | ALTO | Medio | DEFER |
| 9 | Schema BreadcrumbList ausente en blog | MEDIO | Bajo | TODO |
| 10 | No hay `hreflang` (es-ES) | BAJO | Bajo | TODO |
| 11 | `<h1>` y headings: jerarquía correcta confirmar | MEDIO | Bajo | DONE |
| 12 | Robots.txt no apunta al sitemap completo | BAJO | Bajo | TODO |

---

## 1. Meta tags & document head

### Estado actual (líneas 6-17 de `index.html`)

```html
<meta name="viewport" ...>                           ✓ correcto
<meta name="theme-color" content="#000000">          ⚠️ debería ser #105BF5 (brand)
<title>Toca y Opina — Más reseñas en Google ...</title> ✓ bueno
<meta name="description" content="...">              ✓ bueno (≤160 chars)
<link rel="icon" href="data:image/svg+xml,...">      ⚠️ falta ICO + apple-touch-icon
<link rel="canonical" href="https://tocayopina.com/"> ⚠️ apunta a un dominio que aún no existe
<meta property="og:title" ...>                       ✓ pero falta og:image físico
<meta property="og:image" content="assets/img/hero-stand-granite.jpg"> ⚠️ debe ser URL absoluta + 1200×630
<meta property="og:type" content="website">          ✓
<link rel="dns-prefetch" href="https://www.vinted.es"> ✓ buen toque
<link rel="preconnect" href="https://www.vinted.es"> ✓
```

### Fixes a aplicar (cron auto)

- [ ] `theme-color` → `#105BF5`
- [ ] Crear `og-image.jpg` 1200×630 en assets/img/og-image.jpg
- [ ] Cambiar `og:image` a URL absoluta del dominio final (post-Hostinger)
- [ ] Añadir `<meta name="twitter:card" content="summary_large_image">`
- [ ] Añadir `<meta name="twitter:image" ...>` apuntando a og-image
- [ ] Crear favicon.ico (16/32/48), apple-touch-icon.png (180×180), referenciarlos
- [ ] Añadir `<link rel="alternate" hreflang="es-ES" href="...">`
- [ ] Añadir `<link rel="alternate" hreflang="x-default" href="...">`
- [ ] Actualizar `canonical` cuando se mueva a Hostinger

---

## 2. Structured data (JSON-LD)

### Lo que ya hay
```json
{
  "@type": "Product",
  "name": "Toca y Opina — Stand NFC + QR ...",
  "offers": { "price": "33", "priceCurrency": "EUR" },
  "aggregateRating": { "ratingValue": "5", "reviewCount": "47" }
}
```

### Schemas a añadir

**`Organization`** — para mostrar logo en SERP
```json
{
  "@context":"https://schema.org",
  "@type":"Organization",
  "name":"Toca y Opina",
  "url":"https://tocayopina.com/",
  "logo":"https://tocayopina.com/assets/img/logo-200.jpg",
  "founder":{"@type":"Person","name":"Uriel Iglesias Segura"},
  "areaServed":"ES",
  "sameAs":["https://www.vinted.es/member/...","https://www.instagram.com/..."]
}
```

**`LocalBusiness`** — para búsquedas locales (Delta del Ebro)
```json
{
  "@type":"LocalBusiness",
  "name":"Toca y Opina",
  "address":{"@type":"PostalAddress","addressLocality":"Delta del Ebro","addressRegion":"Tarragona","addressCountry":"ES"},
  "priceRange":"€€"
}
```

**`FAQPage`** — convertir las 6 FAQ del index a structured data (rich snippets en SERP).

**`BreadcrumbList`** — en cada artículo del blog: Inicio › Blog › Artículo.

---

## 3. Performance & Core Web Vitals

### Inputs actuales (Puppeteer measure)
- Mobile page height: ~15.2k px
- Hero orbit track: 844 px (100vh)
- Sin scroll horizontal ✓

### Pendiente medir con PageSpeed Insights tras deploy a Hostinger.

### Quick wins de performance

#### 3.1 Imágenes → WebP
Convertir todas las imágenes JPG a WebP (40-60% menos peso):
```
for f in assets/img/*.jpg; do
  cwebp -q 82 "$f" -o "${f%.jpg}.webp"
done
```
Y referenciar con `<picture>` o `srcset` con fallback al JPG.

#### 3.2 Orbit frames (97 imágenes)
Cada frame son ~30 KB. Total: ~2.9 MB. WebP los baja a ~1.6 MB. Crítico para mobile data.

#### 3.3 Vídeos máquina
Los 4 .mp4 ya están comprimidos. OK.

#### 3.4 Tailwind CDN → CSS compilado
El CDN (`https://cdn.tailwindcss.com`) bloquea render. En producción debemos compilar:
```
npx tailwindcss -i input.css -o style.min.css --minify
```
Reduce CSS de ~3.5MB (todo Tailwind) a ~30KB (solo lo usado).

#### 3.5 Lazy-load imágenes
Verificar que TODAS las imágenes excepto el hero y los frames del orbit tienen `loading="lazy"`. (Confirmado parcialmente.)

#### 3.6 Preload críticos
```html
<link rel="preload" as="image" href="assets/img/orbit/frame-001.jpg">
```

---

## 4. Content / Keywords

### Keywords objetivo (de mejor a peor a posicionar)

**Top intent** (compra inmediata):
- "comprar stand reseñas google" (volumen bajo, intent alto)
- "stand nfc reseñas google" (volumen bajo, intent alto)
- "tarjeta reseñas google" (volumen medio, intent medio)

**Informational** (top of funnel):
- "como conseguir mas reseñas en google" ← ya tenemos blog post
- "qr o nfc para reseñas" ← ya tenemos
- "cuanto vale una reseña en google" ← ya tenemos

**Local** (highest conversion):
- "stand reseñas google Tarragona / Amposta / Tortosa"
- "Toca y Opina Delta del Ebro"

### Action items
- [ ] Verificar densidad de "stand reseñas google" en el index (objetivo: 5-8 menciones natural)
- [ ] Añadir un párrafo "Para negocios del Delta del Ebro" cerca del fundador (boost local)
- [ ] Enlazar internamente las palabras "QR vs NFC" del paso 2 al blog post correspondiente
- [ ] Verificar que cada blog post tiene exactly 1 H1 y la keyword en el H1

---

## 5. Internal linking

### Estado
- Index → 5 blog posts (footer). Bien.
- Index → calculadora.html. Bien.
- Blog posts → Index? Verificar
- Blog posts entre sí? Verificar

### Acción
- Auditar cada blog post y añadir 2-3 links contextuales a otros posts del cluster

---

## 6. Sitemap & robots

### `robots.txt` actual
```
User-agent: *
Allow: /
Sitemap: https://tocayopina.com/sitemap.xml
```
✓ correcto, pero el dominio debe actualizarse al pasar a Hostinger.

### `sitemap.xml`
- Tiene 6 URLs (index + 5 blog posts). ✓
- `<lastmod>` actualizado al 2026-05-21. Hay que automatizar esto.
- Falta `calculadora.html` en el sitemap.

### Action
- [ ] Añadir `calculadora.html` al sitemap
- [ ] Actualizar lastmod al deploy final
- [ ] Sustituir dominio en cuanto Hostinger esté activo

---

## 7. Mobile UX checklist (Google Mobile-Friendly)

- ✓ Viewport correcto
- ✓ Texto ≥ 16 px (mínimo body)
- ✓ Touch targets ≥ 44 px (botones CTAs son 56-64 px)
- ✓ Sin scroll horizontal (verificado puppeteer)
- ✓ `font-size: 16px` mínimo en inputs (evita zoom iOS)
- ✓ Click-to-call NO necesario (venta vía Vinted)
- ✓ Imágenes responsivas

---

## 8. Plan de ejecución del cron (próximas 6 h)

Cada firing del cron ejecutará UNA de estas micro-tareas, en este orden:

1. Cambiar `theme-color` a `#105BF5`
2. Generar `og-image.jpg` 1200×630 con Higgsfield + meterlo
3. Generar `favicon.ico` + `apple-touch-icon.png` + referenciar
4. Añadir JSON-LD Organization
5. Añadir JSON-LD LocalBusiness
6. Convertir las 6 FAQ del index a JSON-LD FAQPage
7. Añadir BreadcrumbList a los 5 blog posts
8. Añadir hreflang
9. Auditar y enriquecer alt text en todas las imágenes
10. Añadir link contextual de "QR vs NFC" → blog/qr-vs-nfc...
11. Añadir párrafo "Para negocios del Delta del Ebro" en el fundador
12. Comprimir negocio-*.jpg a WebP, mantener fallback JPG
13. Comprimir frames del orbit a WebP
14. Comprimir paso-*.jpg a WebP
15. Comprimir hero-stand-granite a WebP
16. Añadir `<link rel="preload">` para orbit/frame-001
17. Añadir `calculadora.html` al sitemap
18. Actualizar lastmod del sitemap
19. Crear input.css y empezar build de Tailwind compilado (DEFER, requiere npm install)
20. ...

Si terminan las 19 antes de las 6h, hacer otra pasada y profundizar (lighthouse audit, optimizaciones extra).

---

## 9. Métrica objetivo

| Métrica | Estado actual | Target post-sprint |
|---|---|---|
| PageSpeed Mobile | TBD | ≥ 90 |
| PageSpeed Desktop | TBD | ≥ 95 |
| Largest Contentful Paint | TBD | < 2.5 s |
| Cumulative Layout Shift | TBD | < 0.1 |
| Time to Interactive | TBD | < 3 s mobile 4G |
| Rich result en SERP | 0 | ≥ 2 (Product + FAQ) |
