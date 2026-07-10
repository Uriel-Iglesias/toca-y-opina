# Estudio de reestructuración completa — julio 2026

*Auditoría en 9 dimensiones (4 agentes especializados + análisis directo) + implementación. Rama: `revamp/estructura-completa`.*

---

## 1 · Diagnóstico general

La web ya vendía bien el **dolor** (que te elijan a ti, no al de al lado) y el **precio de entrada** (34,90 €). Los tres agujeros grandes que frenaban la conversión eran:

1. **El comprador no sabía qué pasa después del clic.** "No pagas online" y "sin pagar nada todavía" insinuaban, pero nunca afirmaban, cuándo y cómo se paga. Un dueño de bar que no sabe si le vas a pedir la tarjeta por WhatsApp, no da el clic.
2. **Las objeciones se respondían… en un JSON-LD invisible.** El schema FAQPage existía en el código pero no había ninguna FAQ visible en la página. El "¿Google me penaliza?" y el "¿y si mi cliente es mayor?" se quedaban sin respuesta justo donde se decide la compra.
3. **La entrega se contaba como limitación, no como ventaja.** "Envíos solo a Andorra" en tono restrictivo, cuando la realidad competitiva es que **nadie más entrega en mano en Andorra** (los vendedores españoles de placas NFC envían solo a "España peninsular").

Además: deriva de contenido en el blog (9 footers decían "Amposta", un artículo prometía un servicio de entrega por las Terres de l'Ebre que ya no existe), deuda técnica (las 25 páginas del blog cargaban el CDN de Tailwind contra la decisión ya tomada de usar CSS compilado; el preload del hero descargaba 278 KB de un JPG que nunca se pintaba), y 170 MB de artefactos de build y backups sueltos en el repo.

## 2 · Estudio de mercado y pricing (verificado julio 2026)

| Competidor | Producto | Precio | Modelo | Entrega |
|---|---|---|---|---|
| TapReview.es | Stand NFC configurado | 17 € | Pago único | Envío España |
| TapReview.es | Tarjeta / placa NFC | 15 € | Pago único | Envío España |
| Tapstar.es | Placa acrílica 12×12 con QR configurado | 49,90 € | Pago único | 24–48 h España **peninsular** |
| Amazon.es (genéricos) | Tarjeta NFC+QR sin configurar | ~10–25 € | Pago único | Sin servicio |
| SaaS reputación (Partoo etc.) | Software reseñas | 30–100 €+/mes | Suscripción | — |

**Veredicto: 34,90 € está bien posicionado. No tocar el precio base.** Está entre el stand low-cost (17 €) y la placa premium (49,90 €), y ninguno de los dos entrega en Andorra ni en mano. Las palancas correctas no eran de precio sino de **encuadre**, y ya están implementadas:

- **Ancla anti-cuota**: "Una agencia te cobraría esto cada mes. El stand lo pagas una vez y es tuyo." (visible en la sección oferta).
- **Ancla ROI**: "Con que te traiga un solo cliente nuevo, ya está pagado." (bajo el titular de packs).
- **Reversión de riesgo total**: pagas al recibirlo en mano → elimina el 100% del riesgo percibido de una marca nueva. Ningún competidor puede ofrecerlo (venden a distancia).
- **Bump del Kit a 4,99 €**: se mantiene. Es un maximizador de take-rate; subirlo a 9,90 € arriesga el ratio de aceptación por un producto digital.
- La escalera 34,90 / 54,90 / 74,90 con €/stand y ahorro tachado se mantiene tal cual (funciona y es simple).

**Ideas de pricing que quedan como decisión de Uriel** (no implementadas):
- Precio orientativo en el bloque B2B ("desde ~25 €/stand a partir de 10") para bajar la fricción de cadenas.
- Tier "servicio" recurrente (regrabado ilimitado + cartel de temporada + informe de reseñas trimestral, ~5-9 €/mes) como MRR futuro — sin romper el "pago único" del producto base.
- La garantía de devolución 30 días que ya estaba publicada en el artículo del Delta: decidir si se ofrece oficialmente en toda la web (es potente, pero compromete).

## 3 · Qué se ha implementado (todo en esta rama)

### Landing (`index.html`) — reestructurada entera
- **Nuevo orden por jerarquía de conversión**: Hero → **Cómo funciona** (subido arriba: el visitante frío entiende el producto antes de ver precios) → Packs (+anclas ROI) → Combos → B2B (movido detrás de los packs: la puerta de entrada es 34,90 €, no el bloque oscuro) → **"Así va tu pedido"** (nuevo: 4 pasos, WhatsApp → confirmación → grabado y prueba → entrega en mano y pago al recibir) → **Garantía "Sin riesgo"** (nuevo: reimpresión gratis + regrabado gratis si cambias de enlace + sin cuotas) → Testimonios → Datos → Oferta → Fundadores → **FAQ visible** (nueva, 6 preguntas, sincronizada con el JSON-LD) → CTA final → Footer completo.
- **Banner reencuadrado**: "📦 Entrega en mano en toda Andorra · 24–72 h" (antes: "Envíos solo a Andorra").
- **Atajo para indecisos**: botón "¿Otra duda? Escríbenos por WhatsApp" con mensaje prellenado.
- **Voz plural en todo** (dos fundadores): "te lo reimprimimos", "respondemos", "¿Lo quieres? Escríbenos."
- **i18n externalizado a `assets/i18n.js`** (−27 KB de HTML, cacheable) y arreglado el bug SEO crítico: antes todo visitante nuevo (incluido Googlebot) recibía catalán bajo `lang="es"`; ahora idioma guardado > idioma del navegador > español, coherente con lo que declara el `<head>`.
- **Rendimiento**: preload del hero corregido a `.webp` (−278 KB por visita en la ruta crítica del LCP).
- **Accesibilidad**: dorado #C98A12 → #8A5E0A (contraste AA), animación sheen respeta `prefers-reduced-motion`, botón de idioma a 44 px, text-white/45 → /50-60.
- **SEO**: title 60 caracteres, description 152, FAQPage JSON-LD = FAQ visible.

### Pedido (`pedido.html`)
- "Pagas al recibirlo" en resumen, footNote y formNote, **en los 4 idiomas**.
- Mensaje de WhatsApp neutro ("Hola, soy…" — antes "Hola Uriel", que borraba a Joselí).
- Miniatura en WebP (−176 KB), `lang="es"` coherente, foco visible en inputs.

### Blog (25 páginas)
- **CDN de Tailwind eliminado** → `assets/app.css` compilado (el `content` del tailwind.config ahora cubre `blog/**`; verificado clase a clase, 122/122 cubiertas).
- Logo real en cabecera (antes: foto de producto de 189 KB recortada en un círculo de 40 px).
- 9 footers "Amposta" → "Andorra". Precios viejos (55/65 €) → vigentes (54,90/74,90 €).
- Schema `Article` → `BlogPosting` (24 artículos). Etiquetas de borrador (`[pillar]`, `[guion 2026]`) fuera de los `<title>`.
- Enlaces legales del footer que apuntaban a anclas inexistentes → `aviso-legal.html` real.
- **Artículo Delta del Ebro**: aviso visible de actualización (operamos desde Andorra; si estás en Terres de l'Ebre, escríbenos y te decimos la próxima fecha), promesas pasadas a "según agenda", voz plural. **Pendiente decisión de Uriel** (§5).

### Páginas nuevas
- **`aviso-legal.html`**: aviso legal + privacidad (quiénes somos, cómo se compra y paga, garantía, datos de WhatsApp, no-afiliación con Google/Meta, política de reseñas legal). Enlazada desde los footers de landing, guía y blog. `noindex`.

### SEO técnico
- `calculadora.html`: canonical añadido, og:image corregida (la anterior daba 404 en producción), y **dos `<img>` que apuntaban a `assets/img/logo.jpg`, un archivo que no existe** → corregidas.
- `404.html` lang normalizado. `robots.txt`: bloqueado `/joieria-nova-joia/` (página de un cliente; no debe diluir el SEO del dominio). `sitemap.xml`: lastmod actualizados.

### Repo y build
- **Bundle de deploy: 97 MB → 12 MB (−88%)**: excluidos anuncios de Meta (56 MB que además quedaban expuestos públicamente en el servidor), 97 frames de orbit sin uso y vídeos mp4 sin referencia en ninguna página.
- Backups y duplicados archivados en `Desechos/archivo-reestructuracion-jul2026/` (index-completo, .bak-prevpivot, logo.heic, "joieria-nova-joia 2").
- `.gitignore` ampliado (zip de deploy, carpeta extraída, HEIC, backups). `package.json` con scripts reales y sin la dependencia `framer-motion` (sin uso).
- Verificado con capturas móvil (390 px, ahora ~11.200 px de alto) y escritorio (1440 px), más pedido y blog.

## 4 · Qué NO se ha tocado (a propósito)

- **Precios base** — están bien posicionados (§2).
- **calculadora.html a fondo** (1.830 líneas, en catalán) — funciona y tiene canonical; una revisión de contenido es proyecto aparte.
- **Fotos nuevas** (`fotos-new/` HEIC) — sin integrar; material para futuras secciones o para tarjetas del blog.
- **Enlazado cruzado entre artículos del blog por sectores afines** — mejora SEO pendiente, mecánica pero laboriosa.

## 5 · Decisiones que necesitan tu «go», Uriel

1. **Deploy**: el zip está listo (`toca-y-opina-hostinger.zip`, 12 MB). No se sube nada a producción sin tu OK.
2. **Artículo del Delta del Ebro**: lo he dejado honesto (aviso + "según agenda"), pero decide: (a) mantener así, (b) despublicar y redirigir, o (c) volver a ofrecer entrega en Terres de l'Ebre oficialmente.
3. **Garantía 30 días devolución**: estaba publicada solo en ese artículo. ¿La asumimos en toda la web o la retiramos?
4. **joieria-nova-joia**: sigue desplegándose (bloqueada en robots). Si el "página de reseñas para clientes" va a ser un servicio real, merece subdominio o carpeta con marca propia.
5. **Medición**: la web no mide nada — vendes a ciegas. Recomendación: Plausible (~9 €/mes, sin banner de cookies) o revisar los access logs de Hostinger. Sin esto no puedes saber cuánta gente llega al pedido y no envía el WhatsApp.
6. **Email de contacto**: el aviso legal solo lista WhatsApp e Instagram. Si activas `hola@tocayopina.es` en Hostinger, lo añado en footers y legal.

## 6 · Siguientes palancas (orden de impacto estimado)

1. **Encender Meta Ads** con los 4 anuncios ya redactados en `estrategia-ventas-y-anuncios.md` (Click-to-WhatsApp, 8–12 €/día) — la web ya está lista para recibir ese tráfico.
2. **Medición** (§5.5) antes o a la vez que los anuncios.
3. **Testimonios verificables**: pedir permiso a Zaida (Gaudeix) y 2-3 clientes más para enlazar su ficha de Google — "negocios de aquí" con nombre y parroquia es el disparador nº1 en un mercado pequeño.
4. **Foto real de un stand en un bar de Andorra** para el hero/testimonios (las actuales de estudio son buenas, pero una en contexto real de Andorra ancla el "somos de aquí").
5. Enlazado cruzado del blog + og-image.webp para compartir más ligero.

---

## 7 · Actualización 8-jul (decisiones de Uriel aplicadas + incidente de producción)

**Decisiones aplicadas:**
- **Garantía de devolución 30 días: RETIRADA** de toda la web (quedaba en 2 puntos del artículo del Delta y 1 en "sobre Uriel"). Se mantiene solo reimpresión gratis + regrabado gratis.
- **Ámbito de entrega: "En mano en Andorra · Envíos a toda España"** en banner, hero, packs, proceso, FAQ (+nueva pregunta "¿Dónde entregáis?"), pedido (4 idiomas), JSON-LD (areaServed AD+ES), aviso legal y aviso del artículo del Delta.
- **Medición sin coste: GoatCounter** (gratis, sin cookies, sin banner de consentimiento) en las 29 páginas públicas, con eventos en los botones clave: cta-hero, packs 1/2/3, oferta, sticky, FAQ-WhatsApp, final, y en pedido: pedido-con-kit, pedido-sin-kit y **whatsapp-enviar** (la conversión real). ⚠️ **Requiere 1 paso de Uriel:** crear cuenta gratis en goatcounter.com con el código exacto `tocayopina` (URL `tocayopina.goatcounter.com`). Hasta entonces los eventos se descartan sin romper nada.

**Incidente de producción diagnosticado (el "no se ve nada" en Safari):**
- `https://tocayopina.es/` devuelve **HTTP 500 vacío**. Causa: existe un **`index.php` roto en public_html** que LiteSpeed prioriza sobre index.html, y el `.htaccess` del servidor no está aplicando `DirectoryIndex` (por eso también `/blog/` da 403 y las URLs inexistentes dan 500 en vez del 404 propio). `/index.html` directo funciona (200) — el contenido está, pero nadie que entre por la raíz lo ve.
- **Blindaje incluido en este build:** el zip ahora lleva un `index.php` propio que sirve `index.html` — al extraerlo machaca el roto y la raíz vuelve a funcionar aunque el DirectoryIndex siga sin aplicarse.
- **Al desplegar, verificar:** (1) extraer el zip EN `public_html/` con "sobrescribir"; (2) confirmar que `.htaccess` existe en public_html tras extraer (los gestores de archivos a veces esconden los archivos con punto — activar "mostrar archivos ocultos"); (3) probar `https://tocayopina.es/` y `https://tocayopina.es/blog/` → deben dar 200.

---

## 8 · Actualización 10-jul: variantes A/B/C y motor de upsell

Se construyeron y renderizaron 3 variantes completas de la landing (guardadas en `Desechos/variantes-jul2026/`):
- **A · Base + capa de oferta** — estructura actual + "Kit GRATIS con 2-3 stands" + urgencia honesta de tanda semanal.
- **B · Oferta primero** — H1 "Tu Google lleno de reseñas. 34,90 €. Una vez.", página 12% más corta, sin sección de datos.
- **C · WhatsApp directo** — todos los CTAs a wa.me prellenado, saltándose pedido.html.

**Veredicto (juez: criterios de claridad, disparador de compra, respaldo, AOV, fricción): gana la A.** B pierde el disparador nº1 (miedo competitivo local) y el respaldo racional con fuentes; C pierde el bump, el upsell y la medición de conversión, y WhatsApp Web en escritorio añade fricción real.

**Motor de upsell implementado en pedido.html (4 idiomas):**
- **"+1 stand por solo 20 €"** en todos los productos (coherente con la escalera: 34,90→54,90→74,90→94,90).
- **"Kit Lleno de Reseñas GRATIS con 2+ stands"** — el bump de 4,99 € solo se cobra con 1 stand; con 2+ aparece como regalo incluido. En el caso estrella (1 stand + upsell), el comprador ve: "añade el 2º por 20 € y el Kit te sale gratis" — doble incentivo a duplicar el ticket.
- El mensaje de WhatsApp final refleja pedido, extras y total exactos. Eventos GoatCounter: `upsell-on/off`, `pedido-con-kit`, `pedido-sin-kit`, `whatsapp-enviar`.
- Verificado en navegador: g1±upsell (ES), g2 (Kit gratis de serie), combo±upsell (CA), mensajes correctos en todos los casos.

**Impacto esperado en AOV:** el camino 34,90 → 54,90 ahora tiene dos empujones (ahorro 14,90 + Kit gratis) y cuesta un clic. La landing lo anuncia (badge en packs 2-3) y el pedido lo cumple.

---

## 9 · Actualización 10-jul (2): pase de diseño con la colección taste-skill

Instaladas 13 skills de diseño (`Leonxlnx/taste-skill`) y aplicadas las 4 relevantes a una landing codificada (design-taste-frontend, redesign-existing-projects, high-end-visual-design, minimalist-ui). Design read: *rediseño-preserve, premium Apple-like, modo claro* (dials 5/5/4). Cambios de capa visual, sin tocar copy con traducciones ni estructura CRO:

- **Eyebrows de 10 → 4** (tope de la skill: 1 por cada 3 secciones; era el ritmo-plantilla nº1).
- **Sombras teñidas** del azul de marca en cards + hover lift con cubic-bezier custom.
- **Feedback háptico**: `:active scale(.98)` y `:focus-visible` en todos los CTAs (landing + pedido).
- **Double-bezel** en la imagen del hero (marco hairline con radio concéntrico).
- **Flecha anidada** en el CTA del hero (button-in-button).
- **Profundidad ambiental**: luz radial azul en el hero, dorada en las secciones oscuras.
- **Stagger** en cascada para las celdas de los grids.
- **Tipografía**: `text-wrap:balance/pretty`, `tabular-nums` en precios.
- **Em-dashes eliminados** del copy visible (клave Personaliza reescrita en 4 idiomas).
- Decisiones contextuales documentadas: se mantiene la fuente del sistema (SF Pro = elección Apple correcta y 0 ms de carga) y los emojis del banner (voz de marca WhatsApp-local).

No aplicadas (no encajan): industrial-brutalist (estética opuesta), stitch (para Google Stitch), brandkit/imagegen-web/imagegen-mobile/image-to-code (generación de imágenes de referencia; la web ya usa fotografía real del producto).
