# Despliegue en Hostinger — paso a paso

**Tiempo estimado**: 30-45 minutos
**Pre-requisitos**: cuenta de Hostinger activa con hosting compartido + dominio comprado (`tocayopina.com` o el que decidas).

---

## 1. Preparar el dominio en Hostinger

Si tu dominio ya está comprado en Hostinger, salta a §2.

### Si el dominio lo tienes en otro registrador (GoDaddy, Namecheap, etc.):

**Opción A (recomendada)** — Apunta los nameservers a Hostinger:
1. En tu registrador, cambia los nameservers a:
   - `ns1.dns-parking.com`
   - `ns2.dns-parking.com`
2. Espera 24-48 h a propagación.
3. En Hostinger panel → Dominios → "Añadir dominio" → introduce `tocayopina.com`.

**Opción B** — Apunta solo los registros A:
1. En tu registrador, añade un registro A apuntando a la IP del servidor Hostinger (la verás en el panel: "Plan de Hosting" → "Detalles").
2. Añade un CNAME `www` → `tocayopina.com`.

---

## 2. Acceder al File Manager

1. Login en `https://www.hostinger.com/`
2. Panel → tu hosting → **"Administrar"**
3. En el menú lateral → **"Archivos"** → **"Administrador de archivos"**.
4. Te abrirá una vista de archivos. La carpeta raíz pública es **`public_html`**.

**Si ya hay un `index.html` por defecto en `public_html`**: bórralo (es el de "bienvenida" de Hostinger).

---

## 3. Subir el bundle

Hay dos opciones:

### Opción A — Subir el ZIP (más rápida, recomendada)

1. En este proyecto local, ejecuta:
   ```bash
   cd /Users/uriel/Desktop/toca-y-opina
   ./build-hostinger.sh
   ```
   (o si no existe ese script, sigue las instrucciones de §6 más abajo)

2. Esto generará `toca-y-opina-hostinger.zip` (~25 MB).

3. En el File Manager de Hostinger:
   - Entra en `public_html/`
   - Botón **"Subir archivos"** → arrastra `toca-y-opina-hostinger.zip`
   - Espera a que termine la subida
   - Click derecho sobre el zip → **"Extraer aquí"**
   - Borra el ZIP después

### Opción B — FTP/SFTP

1. En Hostinger panel → "Avanzado" → "Cuentas FTP" → crea una.
2. Anota: host, usuario, contraseña, puerto (21).
3. Usa FileZilla o Cyberduck:
   - Conéctate
   - Navega a `public_html/`
   - Sube TODO el contenido del proyecto **excepto**:
     - `Desechos/` (clutter)
     - `node_modules/` (no se usa en producción)
     - `.git/` (versioning, no se sirve)
     - `.claude/` (config local)
     - `.gitignore`
     - `.cron-progress.md`
     - `package.json`, `package-lock.json` (no se usan)
     - `tailwind.config.js` (no se usa con CDN)
     - `BRAND_BOOK.md`, `SEO_AUDIT.md`, `SOCIAL_30D.md`, `GO_TO_MARKET.md`, `DEPLOY_HOSTINGER.md`, `NEGOCIOS.md`, `CLAUDE.md` (docs internos)
     - `assets/img/_originals/`
     - `instagram/` (workflow interno)

---

## 4. Configurar SSL (HTTPS gratuito)

1. Hostinger panel → tu hosting → **"Avanzado"** → **"Certificado SSL"**
2. Click **"Configurar SSL"** en el dominio
3. Marca **"Forzar HTTPS"**
4. Espera 5-10 minutos a que se active

(Esto es complementario al `.htaccess` que ya fuerza HTTPS.)

---

## 5. Verificación final

Una vez subido todo, abre en navegador:

```
✓ https://tocayopina.com/          → landing principal (200)
✓ https://tocayopina.com/blog/     → blog index
✓ https://tocayopina.com/calculadora.html → calculadora
✓ https://tocayopina.com/sitemap.xml → sitemap XML
✓ https://tocayopina.com/robots.txt → robots
✓ https://tocayopina.com/favicon.ico → favicon (32×32 mínimo)
✓ https://tocayopina.com/og-image-doesnt-exist.html → 404 estilizado
```

### Test PageSpeed Insights
```
https://pagespeed.web.dev/analysis?url=https://tocayopina.com/
```
Target: **≥ 90 mobile, ≥ 95 desktop**.

### Test Open Graph (compartir en WhatsApp/Twitter)
```
https://www.opengraph.xyz/?url=https://tocayopina.com/
```
Debe mostrar el preview de la `og-image.jpg`.

### Test Schema.org rich results
```
https://search.google.com/test/rich-results?url=https://tocayopina.com/
```
Debe detectar: Product, Organization, LocalBusiness, FAQPage.

---

## 6. Actualizar dominio en archivos (si NO es tocayopina.com)

Si compras un dominio diferente (ej. `toca-y-opina.es`), busca y reemplaza:

```bash
# En el proyecto local, antes de generar el zip
grep -rl "tocayopina.com" --include="*.html" --include="*.xml" --include="*.txt" --include=".htaccess" . | xargs sed -i '' 's/tocayopina\.com/TU-DOMINIO.es/g'
```

Archivos afectados:
- `index.html` (canonical, og:url, og:image, etc)
- `blog/*.html` (canonical, og)
- `sitemap.xml`
- `robots.txt`
- `404.html` (no necesario, usa rutas relativas)

---

## 7. Después de publicar

### Google Search Console
1. https://search.google.com/search-console
2. Add property → introduce `https://tocayopina.com/`
3. Verifica vía meta tag (te dará un `<meta name="google-site-verification" ...>` que añadirás al `<head>` del index.html y blog posts).
4. Cuando esté verificado:
   - Sitemaps → añadir `sitemap.xml`
   - Inspect URL para forzar indexación inicial

### Google Analytics 4 (opcional, recomendado)
1. https://analytics.google.com → crear propiedad
2. Te darán un `G-XXXXXXXXXX` (Measurement ID)
3. Añade el snippet en el `<head>` de cada `.html`:
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### Email transactional (futuro)
Hostinger ofrece email gratis (`uriel@tocayopina.com`). Crearlo en Panel → Emails → Email gratuito.

---

## 8. Troubleshooting

| Síntoma | Causa | Solución |
|---|---|---|
| URL devuelve 403 | Permisos archivos | Click derecho en File Manager → cambiar permisos a 644 (archivos) y 755 (carpetas) |
| Imágenes no cargan | Ruta absoluta `/` | Verificar que rutas son relativas en `.html` |
| HTTPS no funciona | SSL aún activándose | Esperar 30 min y reintentar |
| .htaccess no aplica | Apache .htaccess deshabilitado | Hostinger lo soporta — verifica que el fichero subió bien (ojo: archivos `.` ocultos por defecto en File Manager) |
| 404 en `/blog/articulo` | Falta extensión .html | El `.htaccess` ya lo maneja. Verificar que el `.htaccess` está en `public_html/` |

---

## 9. Resumen de archivos a desplegar

Lista exacta de **lo que va a Hostinger** (en `public_html/`):

```
public_html/
├── .htaccess                          ← Configuración Apache (importante)
├── 404.html                           ← Página 404 estilizada
├── apple-touch-icon.png               ← Icono iOS 180×180
├── favicon.ico                        ← Favicon multi-tamaño
├── index.html                         ← Landing principal
├── calculadora.html                   ← Calculadora detallada
├── robots.txt                         ← Crawler config
├── sitemap.xml                        ← Sitemap para buscadores
├── assets/
│   └── img/
│       ├── og-image.jpg               ← OG image (social preview)
│       ├── logo-200.jpg               ← Logo cuadrado
│       ├── hero-stand-granite.jpg     ← Hero photo
│       ├── founder-uriel.jpg          ← Foto fundador
│       ├── produccion-tu.jpg          ← Producción→Tu Negocio
│       ├── paso-1.jpg ... paso-3.jpg  ← 3 pasos
│       ├── paso-nfc.jpg               ← NFC highlight
│       ├── negocio-1.jpg ... negocio-8.jpg  ← Negocios reales
│       ├── maquina-a1-1.mp4 + poster  ← Vídeo fabricación
│       ├── maquina-a1-2.mp4 + poster
│       ├── maquina-a1-3.mp4 + poster
│       ├── maquina-h2d.mp4 + poster
│       ├── supply-chain.jpg           ← (referencia, opcional)
│       ├── step2-nfc-tap.jpg          ← (referencia, opcional)
│       └── orbit/
│           ├── frame-001.jpg
│           ├── frame-002.jpg
│           ├── ...
│           └── frame-097.jpg          ← 97 frames del 360°
└── blog/
    ├── blog.css
    ├── index.html
    ├── como-aparecer-top-google-maps.html
    ├── como-conseguir-mas-resenas-en-google.html
    ├── como-pedir-resenas-a-clientes-sin-parecer-pesado.html
    ├── como-responder-resenas-negativas-google.html
    ├── cuanto-vale-una-resena-en-google.html
    ├── plantillas-mensajes-pedir-resenas-google.html
    ├── qr-vs-nfc-para-resenas-cual-convierte-mas.html
    ├── resenas-google-delta-del-ebro.html
    └── sobre-uriel-historia-toca-y-opina.html
```

**Total**: ~25 MB.

---

## 10. ¿Y si fallo?

Llama o WhatsApp al soporte de Hostinger 24/7 en español. Suelen responder en < 5 min y son útiles para problemas básicos de hosting compartido. Para dudas de DNS, ellos te lo explican mejor que yo.
