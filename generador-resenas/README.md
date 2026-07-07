# Generador de páginas de reseñas por negocio

Crea, para cada negocio, una micro-web personalizada (`index.html` + `opinion.html`)
con el mismo diseño premium que la joyería. El cliente escanea el stand → llega a
una página con el logo del negocio → 4-5★ van a Google, 1-3★ a una opinión privada
(con Google siempre disponible, sin esconderlo nunca → cumple la ley).

## Cómo añadir un negocio (2 minutos)

1. Abre **`clientes.json`** y añade un objeto a la lista:

```json
{
  "slug": "perruqueria-marta",
  "nombre": "Perruqueria Marta",
  "place_id": "ChIJ....",
  "email": "marta@exemple.ad",
  "direccion": "Av. Meritxell, 10 · Andorra la Vella",
  "eslogan": "Perruqueria des de 2008"
}
```

2. Ejecuta el generador:

```bash
node generador-resenas/generar.js
```

3. Se crea la carpeta `/perruqueria-marta/` en la raíz → será `tocayopina.es/perruqueria-marta/`.
4. Publica: `./build-hostinger.sh` (ya regenera y empaqueta todos los negocios de `clientes.json`)
   → sube el zip a Hostinger `public_html/` y extrae.
5. Programa el **NFC/QR del stand** apuntando a `https://tocayopina.es/perruqueria-marta/`.

## Subir UN negocio sin tocar el resto de la web (lo seguro)

En vez de resubir la web entera (84 MB), empaqueta **solo la carpeta de ese negocio**:

```bash
./generador-resenas/montar.sh perruqueria-marta
```

Genera **`perruqueria-marta.zip`** (unos KB). Lo subes al File Manager de Hostinger dentro de
`public_html/`, botón derecho → **Extract**. Solo crea/actualiza la carpeta `/perruqueria-marta/`;
**no toca** `index.html`, el blog ni nada más → cero riesgo de romper la web.

## Campos

| Campo | ¿Obligatorio? | Qué es |
|---|---|---|
| `slug` | **Sí** | Nombre de la carpeta / URL. Minúsculas, sin acentos, con guiones. |
| `nombre` | **Sí** | Nombre del negocio (aparece en la página y en el email). |
| `place_id` *(o `google_url`)* | **Sí** | Place ID de Google **o**, directamente, su enlace de reseñas en `google_url` (ej. `g.page/r/.../review`). Ver abajo. |
| `email` | **Sí** | Email donde llegan las opiniones privadas (1-3★). |
| `direccion` | No | Dirección que aparece abajo en la página. |
| `eslogan` | No | Frase bajo el logo (ej. "Forn artesà des de 1978"). |
| `pregunta1` / `pregunta2` | No | Título grande. Por defecto: "Com ha anat / la teva experiència?". |
| `lede` | No | Frase bajo el título. |
| `lang` | No | Idioma `<html lang>`. Por defecto `ca`. |
| `logo_blanc` / `logo_negre` | No | Ruta (relativa a `generador-resenas/`) a los logos PNG. Si no hay, usa un **monograma** con las iniciales. |
| `bg`,`gold`,`gold_bright`,`on_dark`,`muted`,`subtle` | No | Colores del tema. Por defecto, paleta negro/oro. |

## El Place ID de cada negocio

- El negocio entra en su **Google Business Profile → "Consigue más reseñas"** → enlace tipo `g.page/r/XXXX/review`, o
- busca su **Place ID** en `https://developers.google.com/maps/documentation/places/web-service/place-id`
  y se pone en `place_id`.

## Logo del negocio

- **Con logo:** pon los PNG en `generador-resenas/logos/<slug>/` y referéncialos:
  `"logo_blanc": "logos/perruqueria-marta/logo-blanc.png"` (versión clara, para fondo oscuro)
  y `"logo_negre"` (para el favicon). Se copian solos a la carpeta del negocio.
- **Sin logo:** no pongas nada → sale un monograma elegante con las iniciales.

## Importante

- ⚠️ **FormSubmit** (el email de las opiniones privadas) pide **activarse una vez**: la primera vez
  que se envía una opinión, llega un correo de confirmación al email del negocio que hay que pulsar.
  Haz tú una prueba y púlsalo **antes** de entregar el stand.
- Las páginas llevan `noindex` → no compiten en Google con la web del negocio.
- La joyería **Joieria Nova Joia** está hecha a mano (diseño a medida) y vive fuera de este generador.
- Borra o sustituye el negocio de ejemplo (`forn-sant-jordi`) cuando metas clientes reales.
