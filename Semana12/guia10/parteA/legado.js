/* Inventario - sitio de la distribuidora (versión heredada, jQuery) */
var productos = [];

$(function () {

  // Eliminar un producto
  $('#tabla tbody').on('click', '.btn-eliminar', function () {
    var id = $(this).data('id');
    productos = $.grep(productos, function (p) { return p.id !== id; });
    dibujar();
  });

  // Buscar mientras se escribe
  $('#buscar').on('input', function () {
    dibujar();
  });

  // Mostrar solo los productos con stock bajo
  $('#solo-bajo').on('change', function () {
    dibujar();
  });

  // Agregar un producto
  $('#form-producto').on('submit', function (e) {
    e.preventDefault();
    var datos = {};
    $.each($(this).serializeArray(), function (i, campo) {
      datos[campo.name] = campo.value;
    });
    var nombre = datos.nombre.trim();
    if (nombre === '') {
      $('#mensaje').text('El nombre es obligatorio').show();
      return;
    }
    $('#mensaje').hide();
    var maxId = 0;
    $.each(productos, function (i, p) {
      if (p.id > maxId) maxId = p.id;
    });
    productos.push({
      id: maxId + 1,
      nombre: nombre,
      categoria: datos.categoria,
      precio: parseFloat(datos.precio),
      cantidad: parseInt(datos.cantidad, 10)
    });
    this.reset();
    dibujar();
  });

  cargar();
});

function cargar() {
  $.ajax({ url: 'data/productos.json', method: 'GET', dataType: 'json' })
    .done(function (datos) {
      productos = datos;
      dibujar();
    })
    .fail(function () {
      $('#mensaje').text('No se pudo cargar el inventario').show();
    });
}

function dibujar() {
  var texto = $('#buscar').val().toLowerCase();
  var soloBajo = $('#solo-bajo').prop('checked');
  var tbody = $('#tabla tbody').empty();

  $.each(productos, function (i, p) {
    if (soloBajo && p.cantidad >= 5) return;
    if ((p.nombre + ' ' + p.categoria).toLowerCase().indexOf(texto) === -1) return;
    var boton = $('<button class="btn btn-sm btn-outline-danger btn-eliminar">Eliminar</button>').attr('data-id', p.id);
    var fila = $('<tr>').append(
      $('<td>').text(p.nombre),
      $('<td>').text(p.categoria),
      $('<td>').text('$' + p.precio.toFixed(2)),
      $('<td>').text(p.cantidad),
      $('<td>').append(boton)
    );
    tbody.append(fila);
  });

  $('#contador').text($('#tabla tbody tr').length + ' productos');
}
