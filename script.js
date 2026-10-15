// Año actual en el pie de página
document.getElementById('anio').textContent = new Date().getFullYear();

// Contador animado de cifras
function animarContadores() {
  document.querySelectorAll('.contador').forEach(function (el) {
    var meta = parseInt(el.dataset.meta, 10);
    var actual = 0;
    var paso = Math.max(1, Math.ceil(meta / 60));
    var timer = setInterval(function () {
      actual += paso;
      if (actual >= meta) { actual = meta; clearInterval(timer); }
      el.textContent = actual.toLocaleString('es-CL');
    }, 25);
  });
}

var seccionCifras = document.getElementById('cifras');
var yaAnimado = false;
if ('IntersectionObserver' in window) {
  new IntersectionObserver(function (entradas, obs) {
    if (entradas[0].isIntersecting && !yaAnimado) {
      yaAnimado = true;
      animarContadores();
      obs.disconnect();
    }
  }, { threshold: 0.4 }).observe(seccionCifras);
} else {
  animarContadores();
}

// Formulario de contacto (solo validación y mensaje, sin envío real)
var form = document.getElementById('formContacto');
var aviso = document.getElementById('avisoForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }
  form.reset();
  form.classList.remove('was-validated');
  aviso.classList.remove('d-none');
  setTimeout(function () { aviso.classList.add('d-none'); }, 6000);
});
