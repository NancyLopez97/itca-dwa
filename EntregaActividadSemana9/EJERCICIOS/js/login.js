// Usuarios de prueba
const servicio = new ServicioAutenticacion([
  new Usuario('admin', 'TechStore2026', 'Administrador'),
  new Usuario('vendedor01', 'Ventas2026', 'Vendedor')
]);

const formLogin = document.getElementById('formLogin');
const campoClave = document.getElementById('clave');
const btnVer = document.getElementById('btnVer');

// Mostrar / ocultar contraseña
btnVer.addEventListener('click', () => {
  const oculto = campoClave.type === 'password';
  campoClave.type = oculto ? 'text' : 'password';
  btnVer.textContent = oculto ? 'Ocultar' : 'Ver';
});

formLogin.addEventListener('submit', (evento) => {
  evento.preventDefault();
  formLogin.classList.add('was-validated');
  if (!formLogin.checkValidity()) return;   // formato inválido o vacío

  const nombre = document.getElementById('usuario').value.trim();
  try {
    const usuario = servicio.autenticar(nombre, campoClave.value);
    if (usuario) {
      mostrarMensaje(`Bienvenido, ${usuario.nombre} (${usuario.rol}).`, 'success');
    } else if (servicio.bloqueado) {
      bloquearFormulario();
    } else {
      mostrarMensaje(`Usuario o contraseña incorrectos. Intentos restantes: ${servicio.intentosRestantes}.`, 'danger');
    }
  } catch (error) {
    bloquearFormulario();
  }
});

// Deshabilita todo el fieldset tras 3 intentos
function bloquearFormulario() {
  document.getElementById('campos').disabled = true;
  mostrarMensaje('Acceso bloqueado por demasiados intentos fallidos. Contacte al administrador.', 'warning');
}

// Muestra el resultado en una alerta
function mostrarMensaje(texto, tipo) {
  const caja = document.getElementById('mensaje');
  caja.className = `alert alert-${tipo} mt-3`;
  caja.textContent = texto;
}
