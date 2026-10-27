const cuerpo = document.querySelector('#tabla-productos');
const mensaje = document.querySelector('#mensaje');
const buscar = document.querySelector('#buscar');
let productos = [];

function celda(texto) {
  const td = document.createElement('td');
  td.textContent = texto;
  return td;
}

function pintar(lista) {
  cuerpo.innerHTML = '';
  lista.forEach(p => {
    const fila = document.createElement('tr');
    fila.append(celda(p.nombre), celda(p.categoria),
                celda('$' + p.precio.toFixed(2)), celda(p.cantidad));
    cuerpo.append(fila);
  });
}

async function cargarProductos() {
  try {
    const respuesta = await fetch('data/productos.json');
    if (!respuesta.ok) throw new Error('HTTP ' + respuesta.status);
    productos = await respuesta.json();
    pintar(productos);
  } catch (error) {
    mensaje.textContent = 'No se pudo cargar el inventario: ' + error.message;
    mensaje.classList.remove('d-none');
  }
}

buscar.addEventListener('input', () => {
  const texto = buscar.value.toLowerCase();
  pintar(productos.filter(p =>
    p.nombre.toLowerCase().includes(texto) ||
    p.categoria.toLowerCase().includes(texto)));
});

cargarProductos();
