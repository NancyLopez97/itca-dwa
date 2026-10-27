$(document).ready(function () {

  $.getJSON('data/productos.json', function (datos) {
    $.each(datos, function (i, p) {
      $('#tabla-productos').append(
        '<tr><td>' + p.nombre + '</td><td>' + p.categoria +
        '</td><td>$' + p.precio.toFixed(2) + '</td><td>' + p.cantidad + '</td></tr>'
      );
    });
  }).fail(function () {
    $('#mensaje').text('Error al cargar los datos').show();
  });

  $('#buscar').keyup(function () {
    var texto = $(this).val().toLowerCase();
    $('#tabla-productos tr').each(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(texto) > -1);
    });
  });

  $('#btn-limpiar').click(function () {
    $('#buscar').val('');
    $('#tabla-productos tr').show();
  });

});
