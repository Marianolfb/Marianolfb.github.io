/* Encabezado y pie compartidos por las páginas internas. */
(function () {
  var actual = location.pathname.split("/").pop();
  var cab = document.getElementById("cabeza");
  if (cab) {
    var items = [["index.html#soluciones", "Soluciones"], ["index.html#casos", "Casos"], ["demos.html", "Demos"], ["presupuesto.html", "Precios"]];
    cab.innerHTML =
      '<div class="wrap"><a class="marca" href="index.html" aria-label="Mundano, inicio">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M1.8 14.2h20.4" stroke="var(--tierra)" stroke-width="1.6"/><circle cx="12" cy="9" r="2.4" fill="var(--tierra)"/></svg>Mundano</a>' +
      '<nav class="nav" aria-label="Secciones">' +
      items.map(function (i) { return '<a href="' + i[0] + '"' + (i[0] === actual ? ' aria-current="page"' : "") + ">" + i[1] + "</a>"; }).join("") +
      '<a class="btn" href="index.html#contacto">Escribime</a></nav></div>';
  }
  var pie = document.getElementById("pie");
  if (pie) pie.innerHTML = '<div class="wrap"><span>Mundano, por Mariano Burnengo · Buenos Aires · 2026</span><em>Hecho con IA, pensado por personas.</em></div>';
})();

var WHATSAPP = "5491132509004";
function abrirWhatsApp(texto) {
  window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto), "_blank", "noopener");
}
function usd(n) { return "USD " + n.toLocaleString("es-AR"); }
