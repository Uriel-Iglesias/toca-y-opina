# Páginas de reseñas por negocio (producto nuevo)

> **Handoff para el próximo chat de Claude.** Este documento tiene todo el contexto.
> Léelo entero antes de tocar nada. El chat anterior se quedó sin memoria; aquí está el estado real.

---

## 1. Qué es el producto

Una **micro-web personalizada por negocio**. El cliente escanea el stand (NFC/QR) y, en
vez de ir directo a Google, llega a una página con **su logo y su nombre** que le pregunta
"¿Qué tal tu experiencia?" con 5 estrellas:

- **4–5★** → botón blanco **"Escribir reseña en Google"** → enlace de reseña del negocio.
- **1–3★** → formulario privado (nombre + comentario) → **WhatsApp del negocio**.
  Debajo, en pequeño y discreto, "o deja tu opinión pública en Google →" (Google **nunca** se esconde).

Footer en todas: **"Hecho con ❤ por Toca y Opina · tocayopina.es"** → publicidad gratis en cada local.

**Precio:** 50–100 € de setup por negocio. Mantenimiento ~cero. Debe durar 5 años.

### La línea legal (NO CRUZAR)
Lo que la ley prohíbe (Google, FTC 2024, Omnibus UE) es **filtrar por sentimiento escondiendo
Google a los descontentos** ("review gating"). Por eso esta página:
- Ofrece **Google a todo el mundo** (también al descontento, en el enlace pequeño de abajo).
- No bloquea, no oculta, no condiciona. Solo **prioriza visualmente** el canal según la experiencia.
- Esto es legal. Esconder Google al descontento NO lo es. **No quitar nunca el enlace de Google del ramal "descontento".**

---

## 2. El archivo

**Demo / plantilla maestra:** [pagina-resenas-demo.html](../pagina-resenas-demo.html)

Es **HTML estático autocontenido** (CSS y JS inline, sin dependencias externas, sin servidor,
sin base de datos). Esto es lo que lo hace fiable a 5 años: no hay nada que se rompa.

### Lo único que cambia por cliente (3 datos + visual)
Está todo junto en el bloque `<script>` al final del archivo:

```js
var GOOGLE_URL = 'https://search.google.com/local/writereview?placeid=PLACE_ID';
var WHATSAPP   = '34690390557';   // nº de WhatsApp del negocio (sin +)
var NEGOCIO    = 'Bar La Plaça';  // nombre del negocio
```

Y en el HTML, la parte visual:
```html
<div class="logo">LP</div>          <!-- monograma o <img src="logo.webp"> -->
<div class="biz">Bar La Plaça</div>
<div class="loc">Andorra la Vella</div>
```
Opcional: el color de acento (`--brand`) y el dorado de las estrellas (`--gold`) en `:root`.

### Cómo conseguir el GOOGLE_URL de cada negocio
El negocio (o nosotros desde su perfil) saca el **enlace de reseña**:
- Google Business Profile → "Consigue más reseñas" → da un enlace corto tipo `g.page/r/XXXX/review`.
- O su **Place ID** (buscador: developers.google.com/maps/documentation/places/web-service/place-id)
  y se monta `https://search.google.com/local/writereview?placeid=PLACE_ID`.

El logo: ideal una imagen real del negocio (`logo.webp` en la misma carpeta) o, si no la tienen,
el monograma de iniciales como en la demo ("LP").

---

## 3. DÓNDE VA (la pregunta del cliente)

El sitio se publica en Hostinger subiendo `toca-y-opina-hostinger.zip` → `public_html`.
Cada negocio es **una subcarpeta con su `index.html`**:

```
public_html/
├── index.html              ← la landing tocayopina.es
├── bar-la-placa/
│   └── index.html          ← se sirve en tocayopina.es/bar-la-placa/
├── peluqueria-marta/
│   └── index.html          ← tocayopina.es/peluqueria-marta/
└── taller-pyrenees/
    └── index.html          ← tocayopina.es/taller-pyrenees/
```

- URL final del cliente: **`tocayopina.es/bar-la-placa/`** (con barra final → sin redirección, más rápido).
- Apache sirve el `index.html` de la carpeta automáticamente. **No hace falta tocar `.htaccess`** ni reglas de rewrite.
- El **slug** = nombre del negocio en minúsculas, sin acentos ni espacios, con guiones
  (`Bar La Plaça` → `bar-la-placa`).
- El **NFC/QR del stand** se programa apuntando a `https://tocayopina.es/bar-la-placa/`.
  (Ahora mismo el stand apunta directo a Google; aquí el cambio es que apunte a esta página).

---

## 4. Producirlas en serie — ✅ HECHO: `generador-resenas/`

Generador construido. Para cada negocio nuevo NO se edita código a mano:

1. Añadir el negocio a **`generador-resenas/clientes.json`** (slug, nombre, place_id, email,
   dirección, eslogan; logo y colores opcionales).
2. `node generador-resenas/generar.js` → crea la carpeta `/<slug>/` con `index.html` + `opinion.html`
   (mismo diseño negro/oro; usa el logo del negocio o un monograma de iniciales si no hay logo).
3. `./build-hostinger.sh` **ya regenera y empaqueta** todos los negocios de `clientes.json` (loop
   automático) → subir el zip a Hostinger.

Estructura: `generador-resenas/` = `plantilla/index.html` + `plantilla/opinion.html` (con `{{HUECOS}}`),
`clientes.json`, `generar.js` (Node sin dependencias) y `README.md` con todos los campos.
Verificado con un negocio de ejemplo (`forn-sant-jordi`, monograma "FS").
La joyería **Joieria Nova Joia** sigue hecha a mano (diseño a medida) y fuera del generador.

---

## 5. Estado actual / decisiones abiertas

- [x] Demo compliant construida y aprobada visualmente por Uriel.
- [x] Enlace "Google" del ramal descontento puesto en color tinta (no azul) — Uriel lo pidió.
- [x] **Primer cliente real construido a mano: Joieria Nova Joia** (joyería, Andorra la Vella, catalán).
  Carpeta `joieria-nova-joia/` → `tocayopina.es/joieria-nova-joia/`. Diseño negro/oro premium propio
  (no la plantilla demo). Ya incluida en `build-hostinger.sh`. Canal privado = **email** vía
  FormSubmit (`info@joieriesnovajoia.com`). Place ID: `ChIJP91j8tCKpRIRXI1-7_2Q9_Y`.
  Sirve de referencia/insumo para el generador en serie (sección 4).
  - ⚠ FormSubmit requiere **activación**: el primer envío manda un email de confirmación a
    `info@joieriesnovajoia.com` que hay que pulsar una vez. Hasta entonces no llegan las opiniones.
- [x] **Canal privado decidido: email** vía FormSubmit (joyería + generador). La demo antigua usaba WhatsApp.
- [x] **Generador en serie construido** → `generador-resenas/` (ver sección 4). Integrado en `build-hostinger.sh`.
- [ ] Logo real por negocio (imagen) vs monograma de iniciales.
- [ ] Cerrar precio: 50 € / 100 € / por tramos.
- [ ] Integración con el stand: reprogramar NFC/QR a la URL de la página.

## 6. Contexto del proyecto (para no repetir errores)
- Negocio: **Toca y Opina** (Andorra). Stands NFC+QR de reseñas Google + seguidores Instagram, 34,90 € c/u.
- Fundadores: **Uriel y Joselí**. WhatsApp ventas: **+34 690 390 557**. IG: **@tocayopina**. Web: **tocayopina.es**.
- Marca basada en **honestidad**: nada de reseñas falsas, sorteos ni incentivos, ni usar cuentas propias.
  Por eso el producto es compliant por diseño (ver sección 1, "la línea legal").
- Sitio = HTML estático + Tailwind **compilado** a `assets/app.css` (NO CDN) + WebP. Build: `build-hostinger.sh`.
