/** @type {import('tailwindcss').Config}
 *  Compila assets/app.css (reemplaza el CDN de Tailwind en index/pedido/guia).
 *  build-hostinger.sh lo recompila solo. Manual:
 *    npx -y tailwindcss@3.4.17 -c tailwind.config.js -i tailwind-input.css -o assets/app.css --minify
 *  (Nota: calculadora.html usa su propio assets/tailwind.css, no este.)
 */
module.exports = {
  content: ["./index.html", "./pedido.html", "./guia-resenas.html"],
  theme: {
    extend: {
      fontFamily: { display: ["-apple-system", "BlinkMacSystemFont", '"SF Pro Display"', '"Inter"', "sans-serif"] },
      colors: { ink: "#0A0A0A", ink2: "#1D1D1F", brand: "#105BF5", gold: "#F5B941", paper: "#FAFAFA", line: "#E5E5E7", wa: "#25D366" },
      letterSpacing: { tightest: "-0.045em" },
    },
  },
  plugins: [],
};
