// Genera los tres PDF de muestra (uno por proyecto) a partir de este contenido.
// Uso: node generar.cjs   (después imprime cada HTML a PDF con Chrome headless)
const fs = require("fs");
const path = require("path");

const apps = [
  {
    slug: "app-inspecciones",
    titulo: "App de inspecciones técnicas en campo",
    etiqueta: "Demo con datos ficticios · Celular y PC · Funciona sin conexión",
    url: "https://plomada-demo-cyan.vercel.app",
    resumen:
      "Registrar en el lugar las inspecciones mensuales de edificios y equipos, en vez de anotar en papel y pasar después todo a una planilla. La app arma el recorrido por zonas, lleva el informe de cada equipo y genera la liquidación del mes.",
    hace: [
      "Recorrido del mes por zona, con el avance de equipos visitados.",
      "Ficha por edificio: contactos, horario de acceso, notas y equipos con su número de registro.",
      "Informe mensual por equipo, que se arrastra al mes siguiente.",
      "Mensaje de WhatsApp prearmado al contacto del edificio.",
      "Altas y bajas del mes.",
      "Liquidación por conservador, con descarga en Excel y en un archivo para cargar en el organismo de control.",
      "Funciona sin señal y sincroniza al volver la conexión.",
    ],
    decisiones: [
      "La base vive en el dispositivo y la nube es un espejo: la app no depende de la señal.",
      "Reglas del negocio aisladas y probadas con más de 60 tests.",
      "Copias de seguridad automáticas antes de cada operación destructiva.",
      "En la versión real, cada persona ve solo su cartera (cuentas por persona y roles).",
    ],
    estado: "En uso diario, en implementación para la empresa donde trabajo.",
    pasos: [
      ["Abrí la demo. Arriba vas a ver el cartel «Demo con datos ficticios».", 1],
      ["En Recorrido elegí una zona (Norte, Centro o Sur) y mirá los edificios del mes.", 1],
      ["Tocá un edificio para abrir su ficha: contactos, horario, equipos y notas.", 2],
      ["Mirá la pestaña Vistos con lo ya visitado del mes.", 3],
      ["Entrá a Liquidación: totales por conservador y descarga de Excel y del archivo de control.", 4],
      ["Para empezar de cero, tocá «Reiniciar demo».", null],
    ],
    pantallas: [
      ["inspecciones-1-recorrido.jpg", "Recorrido del mes por zona"],
      ["inspecciones-2-ficha.jpg", "Ficha de un edificio"],
      ["inspecciones-3-vistos.jpg", "Edificios ya visitados"],
      ["inspecciones-4-liquidacion.jpg", "Liquidación y descargas"],
    ],
    stack: "React · TypeScript · Vite · PWA offline-first · Supabase",
  },
  {
    slug: "app-gastos-compartidos",
    titulo: "App de gastos compartidos",
    etiqueta: "Demo con datos ficticios · Celular y PC · Funciona sin conexión",
    url: "https://gastos-demo.vercel.app",
    resumen:
      "Llevar los gastos de una casa o de una pareja sin planilla: cada uno carga lo suyo en pocos toques, se divide solo y el balance del mes muestra quién le debe a quién.",
    hace: [
      "Carga rápida: monto, categoría, quién pagó y si es compartido o personal.",
      "Balance del mes en tiempo real, con la opción de marcar el mes como saldado.",
      "Gastos personales privados: cada persona ve los compartidos y solo los suyos.",
      "Categorías y subcategorías editables.",
      "Presupuestos por rubro, con barras de avance y aviso al pasarse.",
      "Gráficos de análisis por categoría.",
      "Borrado con «deshacer» y funcionamiento sin conexión.",
    ],
    decisiones: [
      "Un gasto cargado sin señal se guarda y se sube solo al volver la conexión.",
      "La privacidad por persona está resuelta en la base de datos, no solo en la pantalla.",
      "Se importaron 18 meses de historia desde la planilla original.",
      "Pocos toques para cargar: lo que no se usa a diario queda en «más opciones».",
    ],
    estado: "En uso diario.",
    pasos: [
      ["Abrí la demo y elegí «Viendo como»: Ana o Leo.", 1],
      ["En Cargar escribí un monto, elegí categoría y quién pagó, y guardalo.", 1],
      ["En Mes mirá el balance, el gráfico por categoría y la lista de gastos.", 2],
      ["En Análisis comparás los rubros del mes.", 3],
      ["En Presupuestos mirás las barras de avance por rubro.", 4],
      ["Cambiá de Ana a Leo: los gastos personales de Ana no se ven. Para empezar de cero, tocá «Reiniciar demo».", null],
    ],
    pantallas: [
      ["gastos-1-cargar.jpg", "Cargar un gasto"],
      ["gastos-2-mes.jpg", "Balance del mes"],
      ["gastos-3-analisis.jpg", "Análisis por categoría"],
      ["gastos-4-presupuestos.jpg", "Presupuestos por rubro"],
    ],
    stack: "React · TypeScript · Tailwind · Supabase · PWA offline-first",
  },
  {
    slug: "plataforma-entradas",
    titulo: "Plataforma de venta de entradas con control de acceso",
    etiqueta: "Demo con datos ficticios · Pago simulado · Celular y PC",
    url: "https://ticketera-demo-three.vercel.app",
    resumen:
      "Sistema completo para un lugar de shows: venta online con pago, entrada con código QR, control de ingreso en la puerta y panel de ventas con liquidación. La demo reproduce todo el recorrido con un pago simulado.",
    hace: [
      "Cartelera y página por evento, con tipos de entrada y cupos.",
      "Compra con reserva de cupo y vencimiento.",
      "Pago con Mercado Pago (en la demo, simulado).",
      "Entrada con código QR.",
      "App de puerta que valida el QR sin conexión: responde PASA o YA ENTRÓ.",
      "Panel en vivo: vendidas, cobrado, ingresos, capacidad y ventas por día.",
      "Liquidación por evento, RRPP con comisión, códigos de descuento y cortesías.",
      "En la versión real: entradas con consumición canjeables en barra.",
    ],
    decisiones: [
      "La reserva de cupo es atómica: en una prueba con 100 intentos simultáneos contra un cupo de 20, se reservaron exactamente 20 y no hubo sobreventa.",
      "El pago se confirma consultando a Mercado Pago, sin confiar en el aviso que llega.",
      "La puerta baja la lista del evento y valida aunque se caiga la señal.",
      "Roles separados: administración, puerta y barra.",
    ],
    estado: "Etapa de piloto.",
    pasos: [
      ["Abrí la demo y elegí un evento de la cartelera.", 1],
      ["Elegí tus entradas con el «+» y tocá «Comprar».", 2],
      ["Completá datos inventados y tocá «Aprobar pago». El pago es simulado, no se cobra nada.", 3],
      ["Mirá tus entradas con su QR, en «Mis entradas».", 4],
      ["En Puerta usá el PIN 2468 y escribí el código de una entrada: la primera vez dice PASA, la segunda YA ENTRÓ.", 5],
      ["En Panel usá el PIN 1357 para ver ventas, capacidad y liquidación. Para empezar de cero, tocá «Reiniciar demo».", 6],
    ],
    pantallas: [
      ["ticketera-1-cartelera.jpg", "Cartelera de eventos"],
      ["ticketera-2-evento.jpg", "Evento y selección de entradas"],
      ["ticketera-4-pago.jpg", "Pago simulado"],
      ["ticketera-5-entrada.jpg", "Compra confirmada, con sus entradas"],
      ["ticketera-7-puerta-valida.jpg", "Puerta: validación del código"],
      ["ticketera-8-panel.jpg", "Panel de ventas y capacidad"],
    ],
    stack: "Next.js · React · Tailwind · Supabase · Mercado Pago",
    notaPin: "Los PIN son públicos y solo valen dentro de la demo.",
  },
];

const css = `
@page{size:A4;margin:12mm 14mm;}
*{box-sizing:border-box;}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
body{margin:0;color:#1c2128;font-family:"Archivo",system-ui,Arial,sans-serif;font-size:10pt;line-height:1.5;}
h1,h2,h3,p,ul,ol{margin:0;padding:0;}
ul,ol{list-style:none;}
.serif{font-family:"Newsreader",Georgia,serif;}
.mono{font-family:"IBM Plex Mono",ui-monospace,Consolas,monospace;}
.top{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1.2pt solid #245e8c;padding-bottom:6pt;}
.top .n{font-weight:600;font-size:9.5pt;}
.top .e{font-family:"IBM Plex Mono",monospace;font-size:7.4pt;color:#7c848b;letter-spacing:.06em;text-transform:uppercase;}
h1{font-family:"Newsreader",Georgia,serif;font-weight:500;font-size:24pt;line-height:1.08;margin-top:14pt;letter-spacing:-.01em;}
.etq{margin-top:6pt;font-family:"IBM Plex Mono",monospace;font-size:8pt;color:#245e8c;letter-spacing:.06em;text-transform:uppercase;}
.lead{margin-top:10pt;font-size:11pt;color:#2c333b;max-width:150mm;}
h2{font-family:"IBM Plex Mono",monospace;font-weight:500;font-size:7.8pt;letter-spacing:.14em;text-transform:uppercase;color:#245e8c;margin:15pt 0 5pt;padding-bottom:3pt;border-bottom:.5pt solid #d7dde1;}
.lista li{position:relative;padding-left:11pt;margin-top:3pt;color:#2c333b;}
.lista li::before{content:"";position:absolute;left:0;top:.55em;width:4pt;height:4pt;background:#245e8c;}
.pasos li{display:grid;grid-template-columns:16pt 1fr;gap:6pt;margin-top:5pt;color:#2c333b;}
.pasos .num{font-family:"IBM Plex Mono",monospace;font-size:8.5pt;font-weight:600;color:#fff;background:#245e8c;width:14pt;height:14pt;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-top:1pt;}
.demo{margin-top:12pt;padding:8pt 10pt;border:.8pt solid #245e8c;background:#eef1f4;}
.demo b{font-weight:600;}
.demo a{color:#184568;font-family:"IBM Plex Mono",monospace;font-size:9.5pt;word-break:break-all;}
.nota{margin-top:5pt;font-size:8.5pt;color:#4b535c;}
.meta{margin-top:11pt;font-family:"IBM Plex Mono",monospace;font-size:7.8pt;color:#4b535c;line-height:1.6;}
.meta b{color:#1c2128;font-weight:500;}
.pagina2{page-break-before:always;}
.grid{display:grid;gap:12pt 12pt;margin-top:8pt;justify-content:center;}
.g2{grid-template-columns:repeat(2,52mm);}
.g3{grid-template-columns:repeat(3,54mm);}
figure{margin:0;}
figure img{display:block;width:100%;height:auto;border:.8pt solid #b7c0c6;border-radius:9pt;}
figcaption{margin-top:4pt;font-family:"IBM Plex Mono",monospace;font-size:7.4pt;color:#4b535c;letter-spacing:.02em;}
figcaption b{color:#245e8c;}
.pie{margin-top:12pt;font-family:"IBM Plex Mono",monospace;font-size:7.4pt;color:#7c848b;text-align:center;}
`;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

for (const a of apps) {
  const li = (arr) => arr.map((x) => `<li>${esc(x)}</li>`).join("");
  const pasos = a.pasos
    .map(([t, img], i) => `<li><span class="num">${i + 1}</span><span>${esc(t)}</span></li>`)
    .join("");
  const cols = a.pantallas.length > 4 ? "g3" : "g2";
  const figs = a.pantallas
    .map(
      ([f, t], i) =>
        `<figure><img src="img/${f}" alt="${esc(t)}"><figcaption><b>${i + 1}.</b> ${esc(t)}</figcaption></figure>`
    )
    .join("");
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${esc(a.titulo)}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&family=Newsreader:wght@400;500;600&display=swap">
<style>${css}</style></head><body>
<section>
  <div class="top"><span class="n">Mariano Fernández Burnengo</span><span class="e">Ingeniero electrónico · Desarrollo de software</span></div>
  <h1>${esc(a.titulo)}</h1>
  <p class="etq">${esc(a.etiqueta)}</p>
  <p class="lead">${esc(a.resumen)}</p>
  <h2>Qué hace</h2><ul class="lista">${li(a.hace)}</ul>
  <h2>Cómo está resuelto</h2><ul class="lista">${li(a.decisiones)}</ul>
  <p class="meta"><b>Stack</b> ${esc(a.stack)}<br><b>Estado</b> ${esc(a.estado)}<br><b>Cómo se construyó</b> Con herramientas de IA (Claude Code), bajo mi diseño, revisión y pruebas.</p>
</section>
<section class="pagina2">
  <div class="top"><span class="n">${esc(a.titulo)}</span><span class="e">Pantallas de la demo</span></div>
  <div class="grid ${cols}">${figs}</div>
</section>
<section class="pagina2">
  <div class="top"><span class="n">${esc(a.titulo)}</span><span class="e">Cómo probar la demo</span></div>
  <h2>Paso a paso</h2><ol class="pasos">${pasos}</ol>
  <div class="demo"><b>Demo en línea:</b> <a href="${a.url}">${a.url}</a>
    <p class="nota">Todos los datos son inventados y lo que hagas queda solo en tu navegador. ${a.notaPin ? esc(a.notaPin) : ""} Se puede abrir desde el celular o la compu.</p></div>
  <p class="pie">Mariano Fernández Burnengo · Ingeniero electrónico · Buenos Aires</p>
</section>
</body></html>`;
  fs.writeFileSync(path.join(__dirname, a.slug + ".html"), html);
  console.log("escrito", a.slug + ".html");
}
