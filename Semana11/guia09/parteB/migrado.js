/*
  Analisis del codigo heredado (legado.js)

  $(document).ready(fn)
    Que hace: ejecuta el codigo cuando el HTML ya cargo.
    Nativo: document.addEventListener('DOMContentLoaded', fn) o poner el script al final del body.

  $.getJSON(url, fn).fail(fn)
    Que hace: pide el JSON, ejecuta fn con los datos y si falla ejecuta el .fail.
    Nativo: fetch(url) con async/await, revisando respuesta.ok, dentro de try/catch.

  $.each(datos, fn) + .append(...)
    Que hace: recorre los productos y agrega una fila a la tabla por cada uno.
    Nativo: datos.forEach(...) con createElement y append.

  $(this).val()
    Que hace: lee lo que se escribio en el buscador.
    Nativo: buscar.value

  .toggle(condicion)
    Que hace: muestra la fila si la condicion es verdadera y la oculta si es falsa.
    Nativo: filtrar el arreglo con filter() y volver a pintar la tabla.

  .show() / .text(...)
    Que hace: .text pone el texto del mensaje y .show lo muestra.
    Nativo: mensaje.textContent = '...' y mensaje.style.display = 'block'

  Puntos de atencion
  1. .keyup(fn) y .click(fn) son formas abreviadas de .on('keyup', fn) y .on('click', fn).
     Estan en desuso desde jQuery 3.3, por eso hoy se usa .on() (o addEventListener en nativo).
  2. Cada fila se arma uniendo texto con + y los datos del producto. Si un nombre trae HTML,
     el navegador lo interpreta (riesgo de XSS). Es mejor usar textContent.
  3. keyup solo se dispara con el teclado. Si se pega texto con el mouse no filtra.
     El evento input si detecta cualquier cambio en el campo.
*/

const cuerpo = document.querySelector('#tabla-productos');
const mensaje = document.querySelector('#mensaje');
const buscar = document.querySelector('#buscar');
const btnLimpiar = document.querySelector('#btn-limpiar');
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
    mensaje.textContent = 'Error al cargar los datos';
    mensaje.style.display = 'block';
  }
}

buscar.addEventListener('input', () => {
  const texto = buscar.value.toLowerCase();
  pintar(productos.filter(p =>
    p.nombre.toLowerCase().includes(texto) ||
    p.categoria.toLowerCase().includes(texto)));
});

btnLimpiar.addEventListener('click', () => {
  buscar.value = '';
  pintar(productos);
});

cargarProductos();
