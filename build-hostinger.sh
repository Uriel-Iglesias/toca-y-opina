#!/bin/bash
# Build script — empaqueta el bundle listo para subir a Hostinger.
# Uso: ./build-hostinger.sh
# Output: toca-y-opina-hostinger.zip en la raíz del proyecto.

set -e

cd "$(dirname "$0")"

OUT="toca-y-opina-hostinger.zip"

echo "→ Limpiando builds anteriores..."
rm -f "$OUT"

echo "→ Generando ZIP..."
zip -r "$OUT" \
  .htaccess \
  404.html \
  apple-touch-icon.png \
  favicon.ico \
  index.html \
  calculadora.html \
  robots.txt \
  sitemap.xml \
  assets/img \
  blog \
  -x "assets/img/_originals/*" \
  -x "assets/img/.tmp/*" \
  -x "assets/img/shots/*" \
  -x "assets/img/.DS_Store" \
  -x "blog/.DS_Store" \
  -x "*.DS_Store" \
  -x "*.bak" \
  > /dev/null

SIZE=$(du -h "$OUT" | cut -f1)
FILES=$(unzip -l "$OUT" | tail -1 | awk '{print $2}')

echo ""
echo "✓ Bundle creado: $OUT"
echo "  · Tamaño: $SIZE"
echo "  · Archivos: $FILES"
echo ""
echo "Siguiente paso: subir $OUT al File Manager de Hostinger en public_html/ y extraer."
echo "Ver DEPLOY_HOSTINGER.md para los detalles."
