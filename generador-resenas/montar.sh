#!/bin/bash
# Empaqueta UN negocio en un zip independiente y SEGURO para subir a Hostinger.
#
#   Uso:  ./generador-resenas/montar.sh <slug>
#
# Resultado: <slug>.zip en la raíz del proyecto.
# Se sube a public_html/ y se extrae. Solo crea/actualiza la carpeta de ESE
# negocio; NO toca index.html, el blog ni el resto de la web. Cero riesgo.

set -e
cd "$(dirname "$0")/.."

SLUG="$1"
if [ -z "$SLUG" ]; then
  echo "Uso: ./generador-resenas/montar.sh <slug>"
  echo "(el <slug> debe existir en generador-resenas/clientes.json)"
  exit 1
fi

echo "→ Generando páginas desde clientes.json..."
node generador-resenas/generar.js

if [ ! -d "$SLUG" ]; then
  echo "✗ No existe la carpeta '$SLUG'. ¿Está en clientes.json con ese slug exacto?"
  exit 1
fi

rm -f "$SLUG.zip"
zip -r "$SLUG.zip" "$SLUG" -x "*.DS_Store" > /dev/null

echo ""
echo "✓ Archivo listo:  $SLUG.zip"
echo ""
echo "  Para publicarlo (sin romper nada):"
echo "  1) File Manager de Hostinger → entra en public_html/"
echo "  2) Sube  $SLUG.zip"
echo "  3) Botón derecho sobre el zip → Extract (Extraer)"
echo "  4) Ya está vivo:  https://tocayopina.es/$SLUG/"
echo ""
echo "  Solo añade la carpeta /$SLUG/. No toca el resto de la web."
