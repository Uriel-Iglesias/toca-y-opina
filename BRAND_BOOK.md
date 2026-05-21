# Toca y Opina — Brand Book

**Versión 1.0 · Mayo 2026**
**Owner**: Uriel Iglesias Segura (Delta del Ebro, España)

Documento vivo. Si no está aquí, no es marca: pregunta o decide y vuelve a escribirlo.

---

## 0. Propósito y promesa

**Quiénes somos.** Un solo fundador, una impresora 3D, un stand físico. Hecho a mano en el Delta del Ebro y enviado por Vinted.

**Para quién.** Negocios locales de menos de 50 empleados que ya hacen un buen trabajo pero pierden el 92% de las reseñas que se merecen: cafeterías, peluquerías, restaurantes, talleres, tiendas, hoteles familiares, peluquerías, papelerías.

**Promesa al cliente.** Más reseñas en Google, con un solo gesto. Cinco segundos. Pago único, sin cuotas, sin app.

**Anti-promesa.** No prometemos un número exacto de reseñas/mes. No prometemos virilizar el negocio. No prometemos sustituir al boca-a-boca.

---

## 1. Paleta de color

### Primarios

| Token | Hex | Uso | Notas |
|---|---|---|---|
| `--ink` | `#0A0A0A` | Texto principal, fondos hero | Negro Apple. Nunca uses `#000` puro. |
| `--ink2` | `#1D1D1F` | Texto secundario | Apple system gray 1. |
| `--brand` | `#105BF5` | Marca · CTAs · acentos | El azul Toca y Opina. Único color de marca. |
| `--brand-hover` | `#0B47C4` | CTAs hover | -16% luminosidad sobre brand. |
| `--gold` | `#F5B941` | Acento secundario · badges · estrellas | Mostaza cálida, evoca "review/calidad". |
| `--paper` | `#FAFAFA` | Fondo de secciones alternas | Casi blanco. |
| `--line` | `#E5E5E7` | Bordes y divisores | Apple separator. |
| `--muted` | `#6B6B70` | Texto terciario, captions | Gris medio neutro. |

### Estados / secundarios

| Token | Hex | Uso |
|---|---|---|
| `--success` | `#10B981` | "Aparece tu ficha", checkmarks |
| `--warning` | `#F59E0B` | Avisos suaves |
| `--danger` | `#EF4444` | Errores, "no hagas X" |
| Navy hero bg | `#0F1733` | Fondo de la sección producción→tu negocio |

### Reglas duras

- **NUNCA** uses gradientes excepto los del hero (azul→dorado halo). El brand es plano.
- **NUNCA** uses azul que no sea `#105BF5`. No teal, no cyan, no morado.
- **NUNCA** uses negro `#000`. Siempre `#0A0A0A` o `#1D1D1F`.
- Para fondos oscuros, usa `--ink` o el navy `#0F1733`. Nada más.

---

## 2. Tipografía

**Familia única**: stack del sistema Apple.

```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
             "Inter", "Segoe UI", Helvetica, Arial, sans-serif;
```

Por qué: cero peso adicional, render nativo en cada SO, y SF Pro es la fuente más legible del mundo para textos cortos.

### Escala de tamaños

| Token | Tamaño (clamp) | Peso | Uso |
|---|---|---|---|
| `display-xl` | `clamp(48px, 11vw, 96px)` | 800 | Headline hero (1 por página) |
| `display-lg` | `clamp(38px, 8.5vw, 72px)` | 800 | Section headlines |
| `display-md` | `clamp(30px, 6.5vw, 52px)` | 800 | Sub-headlines / "Soy Uriel" |
| body-lg | `clamp(17px, 4.4vw, 22px)` | 400 | Párrafo hero |
| body | `17px` | 400 | Párrafos normales |
| caption | `13px` | 400 | Notas, copy legal |
| eyebrow | `13px` | 700 uppercase + .16em letter-spacing | Marcador de sección ("CÓMO FUNCIONA") |

### Reglas

- **Letter-spacing -0.045em** en todos los display. Es lo que da el look Apple.
- **Line-height 0.96-1.05** en displays. Ajustado.
- **Line-height 1.45-1.55** en body. Cómodo.
- Cursiva: prohibida. La energía es directa, no editorial.
- Subrayado: solo en links de bloques de texto largos. CTAs son botones.

---

## 3. Logo y marca verbal

### Wordmark
**Toca <span style="color:#105BF5">y</span> Opina**

- La "y" en azul `#105BF5`, font-weight 800, tracking -0.04em
- "Toca" y "Opina" en negro `#0A0A0A`, mismo peso
- Espaciado normal entre palabras

### Logo cuadrado (favicon, app, perfil IG)
- Fondo: cuadrado azul `#105BF5` con esquinas redondeadas (radius 22% del lado)
- Letra "T" blanca, peso 800, centrada
- Versión actual: `assets/img/logo-200.jpg` (200×200 px)

### Reglas
- El wordmark **nunca** va sobre fondos con menos de 4.5:1 de contraste.
- En fondos oscuros: invertir a blanco completo, mantener la "y" en `#3D7DFF` (un tono más luminoso).
- Padding mínimo alrededor del logo: 0.5× la altura del wordmark.
- **Nunca** rotar, distorsionar, ni añadir efectos al logo.

### Marca verbal en otros idiomas
Por ahora, **solo español**. La marca funciona en catalán también, pero el sitio está en español castellano peninsular.

---

## 4. Tono de voz

**Cómo hablamos**: directos, honestos, sin mierda. Conversacional pero sin ser zalamero.

**Inspiración**: Apple (silencio, espacio, palabras justas) + un fundador real (no corporativo, no startupero).

### Reglas claras

| Sí | No |
|---|---|
| "Pedir el mío" | "Comprar ahora" / "Get yours" |
| "33 € pago único" | "A partir de 33 €" / "Solo 33 €" |
| "Hecho a mano en el Delta del Ebro" | "Producción local" |
| "Si te llega defectuoso, te lo reimprimo" | "Garantía total" |
| "Cero quejas, 0 devoluciones" | "Calidad premium" |
| "5 segundos" | "Rápido" |
| "Lo imprimo yo" | "Producción artesanal" |
| "Sin app, sin cuotas, sin formación" | "Solución integral" |

### Lo que evitamos

- **Jerga de startup**: "disruptivo", "escalable", "MVP", "go-to-market" (esto último sí en docs internos, nunca en la web).
- **Anglicismos innecesarios**: "reviews" → "reseñas". "Stand" sí (no hay traducción mejor en español).
- **Promesas vagas**: "más reseñas" → siempre acompañado de "en 5 segundos" o un número.
- **Lenguaje corporativo**: "soluciones para empresas" → "para tu negocio".
- **Trato formal**: tutear siempre. "Tu cliente", "tu mostrador", "tu ficha".

### Voz del fundador (Uriel)

Cuando escribo en primera persona ("yo lo imprimo", "yo te lo reimprimo"), refuerza la prueba de que detrás hay una persona real. Úsalo cuando:
- Compares con marcas industriales ("yo no")
- Hables de fabricación
- Ofrezcas reposición / soporte

NO uses primera persona en:
- Headlines
- CTAs
- Especificaciones técnicas

---

## 5. Fotografía y estilo visual

### Tres registros visuales

**(A) Producto en contexto** (cafeterías, bares, peluquerías reales)
- Real, no retocada. Fondos vivos, mostradores de mármol/granito/madera.
- Stand siempre en primer plano enfocado.
- Iluminación cálida (bombillas pendientes, luz de tarde).
- Ejemplos actuales: `negocio-1.jpg` a `negocio-8.jpg`.

**(B) Ilustración cartoon plana** (3 pasos, NFC, producción→tu negocio)
- Fondo azul brand `#105BF5` o navy `#0F1733`.
- Trazo grueso negro `#0A0A0A`.
- Colores planos + ligero cell-shading.
- Estilo "children's instruction book" — claro, directo, didáctico.
- Mantén consistencia: si Uriel aparece, mismo color de pelo, misma camisa azul.

**(C) Foto fundador** (Uriel)
- Real, sin retoques fuertes.
- Aspect 2:3 o 3:4.
- Encuadre: pecho + cabeza, mirada a cámara o ¾ con sonrisa.
- Fondo neutro / taller real.

### Lo que NUNCA hacemos
- Fotos de stock con personas anónimas.
- Renders 3D fríos / estilo Behance.
- Fondos blancos puros (cae en "Amazon listing").
- Sombras duras / contraste alto.
- Filtros Instagram / VSCO / saturados.

---

## 6. Iconografía

**Sistema**: Lucide-style (línea, 24×24, stroke-width 2.4, redondeo `round`).

Iconos críticos ya en uso:
- Checkmark verde `#22C55E` para "incluido"
- X gris `#9CA3AF` para "no incluido"
- NFC wifi (3 arcos curvos) en blanco/azul
- Estrella amarilla `#F5B941` para reseñas
- Flecha derecha (CTA arrows)
- Reloj para "5 segundos"

### Reglas
- Stroke-width siempre 2.4 (un poco más grueso que el default 2 — más amigable).
- Esquinas siempre redondeadas.
- En fondos oscuros, stroke en blanco. En claros, stroke en `--ink`.
- No mezclar iconos rellenos con outline en la misma pantalla.

---

## 7. Componentes UI (resumen)

### Botones
- **Primario (CTA)**: fondo `--brand`, texto blanco, padding 28px horizontal, height 56px (o 64px para hero), border-radius 999px (pill).
- **Hover**: `--brand-hover`, translate -1px, sombra más profunda.
- **Sheen animation** en CTAs grandes (sólo hero).
- **Secundario (ghost)**: texto `--ink`, sin fondo, mismo padding.

### Cards
- Border-radius **28px** (Apple-ish). Nunca menos de 16px.
- Sombra: `0 1px 2px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.10)`.
- Padding interno: 24px mobile, 32px desktop.

### Inputs
- Background `--paper`, border `--line`, border-radius 16px.
- Height 56px (touch-friendly).
- Focus: border `--brand`.

### Badges
- Pill, padding 4px 12px, text 11px uppercase tracking 0.06em font-weight 800.
- Variantes: gold para "EL MÁS ELEGIDO", emerald para "EN STOCK".

---

## 8. Lema y tagline

**Tagline principal** (hero): _"Más reseñas en Google. Un solo gesto."_

**Subtagline**: _"El stand que pones en tu mostrador. Tu cliente acerca el móvil y la reseña se publica en 5 segundos."_

**One-liner para bios/perfil**: _"Stand físico NFC + QR para reseñas en Google. Hecho a mano en el Delta del Ebro. 33 € pago único."_

**One-liner ultra-corto**: _"Más reseñas. Un gesto."_

---

## 9. Activos visuales fijos

### Imágenes de marca (assets actuales)

| Archivo | Uso | Notas |
|---|---|---|
| `assets/img/logo-200.jpg` | Logo cuadrado 200×200 | Para favicon, IG profile |
| `assets/img/hero-stand-granite.jpg` | Hero photo principal | Producto real en cafetería |
| `assets/img/paso-1.jpg` | Paso 1 illustration | Stand + cliente escaneando |
| `assets/img/paso-2.jpg` | Paso 2 illustration | Móvil con formulario reseña |
| `assets/img/paso-3.jpg` | Paso 3 illustration | Confirmación publicada |
| `assets/img/paso-nfc.jpg` | NFC highlight | Móvil acercándose al stand |
| `assets/img/produccion-tu.jpg` | Producción → Tu Negocio | Visual cero-intermediarios |
| `assets/img/founder-uriel.jpg` | Foto fundador | Recortada 2:3 |
| `assets/img/negocio-1..8.jpg` | Negocios reales | Fotos enviadas por clientes |
| `assets/img/orbit/frame-001..097.jpg` | 360° scroll-scrub | 97 frames |
| `assets/img/supply-chain.jpg` | Diagrama supply chain (no usado) | Quedó como referencia |

### Activos pendientes de crear (TODO sprint)
- [ ] Open Graph image (1200×630) para WhatsApp/FB previews
- [ ] Apple touch icon (180×180)
- [ ] Favicon ICO multi-tamaño (16/32/48)
- [ ] Plantillas para IG: carrusel pack, story, reel cover
- [ ] Imagen "press kit" para enviar a periodistas locales

---

## 10. Aplicaciones (canales)

### Web (esta landing)
- Mobile-first siempre. Diseño 390px → 1280px → 1440px.
- Cargas pesadas: vídeo de orbit (97 frames), 4 vídeos de máquina. Comprimir.

### Vinted (canal de venta principal hoy)
- Foto principal: hero-stand-granite.jpg
- Texto del anuncio: copy basado en tagline. Incluir "Pago único", "Hecho a mano", "NFC + QR", "33 €".

### Instagram (canal de adquisición — pendiente desarrollar)
- @ pendiente confirmar handle (revisar memoria del proyecto)
- Carpeta `instagram/` ya existe en el repo con workflow

### Correo / mensajes
- Despedida: "— Uriel" (no "Atentamente" ni "Saludos cordiales")
- Firma: Uriel · Toca y Opina · Delta del Ebro

---

## 11. SEO y palabras clave de marca

**Marca**: Toca y Opina · tocayopina · toca-y-opina

**Keywords objetivo principales** (long-tail):
- "stand reseñas Google"
- "stand NFC QR Google reseñas"
- "conseguir reseñas en Google bar/restaurante/peluquería"
- "tarjeta NFC reseñas"
- "review stand Google"

**Long-tail locales**:
- "Toca y Opina Delta del Ebro"
- "stand reseñas Amposta / Tortosa / Tarragona"

---

## 12. Qué NO somos

- No somos una agencia de reputación online.
- No somos una app SaaS.
- No somos un marketplace de reseñas.
- No vendemos reseñas falsas. Nunca.
- No somos una marca china importada.
- No somos una franquicia escalable. Esto lo hace una persona.

---

## 13. Evolución del brand book

Cada vez que tomes una decisión visual o de voz que no esté aquí, añádela. Si dudas, vuelve a las **reglas duras** de cada sección. Si el documento crece más de 1000 líneas, simplifica.

**Última actualización**: 2026-05-22 (Uriel + Claude, sprint final).
