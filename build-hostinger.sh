#!/bin/bash
# Build script — empaqueta el bundle listo para subir a Hostinger.
# Uso: ./build-hostinger.sh
# Output: toca-y-opina-hostinger.zip en la raíz del proyecto.

set -e

cd "$(dirname "$0")"

OUT="toca-y-opina-hostinger.zip"

echo "→ Limpiando builds anteriores..."
rm -f "$OUT"

echo "→ Compilando Tailwind (assets/app.css)..."
npx -y tailwindcss@3.4.17 -c tailwind.config.js -i tailwind-input.css -o assets/app.css --minify 2>/dev/null \
  && echo "  ✓ app.css recompilado" \
  || echo "  ⚠ no se pudo recompilar (sin red?); se usa el app.css existente"

echo "→ Generando ZIP..."
zip -r "$OUT" \
  .htaccess \
  404.html \
  apple-touch-icon.png \
  favicon.ico \
  index.html \
  index.php \
  calculadora.html \
  guia-resenas.html \
  pedido.html \
  aviso-legal.html \
  robots.txt \
  sitemap.xml \
  assets \
  blog \
  joieria-nova-joia \
  -x "assets/img/brand/*" \
  -x "assets/img/_originals/*" \
  -x "assets/img/.tmp/*" \
  -x "assets/img/shots/*" \
  -x "assets/img/ads/*" \
  -x "assets/img/orbit/*" \
  -x "assets/img/*.mp4" \
  -x "assets/img/.DS_Store" \
  -x "blog/.DS_Store" \
  -x "*.DS_Store" \
  -x "*.bak" \
  > /dev/null

echo "→ Generando y empaquetando páginas de negocios (generador-resenas)..."
if [ -f generador-resenas/clientes.json ]; then
  node generador-resenas/generar.js 2>/dev/null || echo "  ⚠ generador omitido"
  for slug in $(node -e "try{JSON.parse(require('fs').readFileSync('generador-resenas/clientes.json','utf8')).forEach(c=>console.log((c.slug||'').toLowerCase()))}catch(e){}"); do
    if [ -d "$slug" ]; then zip -r "$OUT" "$slug" -x "*.DS_Store" > /dev/null && echo "  ✓ /$slug"; fi
  done
fi

SIZE=$(du -h "$OUT" | cut -f1)
FILES=$(unzip -l "$OUT" | tail -1 | awk '{print $2}')

echo ""
echo "✓ Bundle creado: $OUT"
echo "  · Tamaño: $SIZE"
echo "  · Archivos: $FILES"
echo ""
echo "Siguiente paso: subir $OUT al File Manager de Hostinger en public_html/ y extraer."
echo "Ver DEPLOY_HOSTINGER.md para los detalles."
