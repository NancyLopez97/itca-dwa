const patronISBN = /^(\d{10}|\d{13})$/;

class Libro {
  constructor(titulo, autor, isbn, anioPublicacion, genero) {
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.anioPublicacion = anioPublicacion;
    this.genero = genero;
  }

  mostrarDetalles() {
    return (
      "Titulo: " +
      this.titulo +
      ", Autor: " +
      this.autor +
      ", ISBN: " +
      this.isbn +
      ", Anio de Publicacion: " +
      this.anioPublicacion +
      ", Genero: " +
      this.genero
    );
  }
}

const libros = [];

const obtener = function (id) {
  return document.getElementById(id);
};

const mostrarMensaje = function (texto, tipo) {
  const mensaje = obtener("mensaje");
  mensaje.setAttribute("class", "alert alert-" + tipo);
  mensaje.textContent = texto;
};

const ocultarMensaje = function () {
  obtener("mensaje").setAttribute("class", "d-none");
};

const limpiarCampos = function () {
  obtener("titulo").value = "";
  obtener("autor").value = "";
  obtener("isbn").value = "";
  obtener("anio").value = "";
  obtener("genero").value = "";
};

const dibujarLibro = function (libro) {
  const contenedor = obtener("listaLibros");

  let lista = contenedor.getElementsByTagName("ul")[0];
  if (!lista) {
    contenedor.innerHTML = "";
    lista = document.createElement("ul");
    lista.setAttribute("class", "list-group");
    contenedor.appendChild(lista);
  }

  const item = document.createElement("li");
  item.setAttribute("class", "list-group-item");
  item.appendChild(document.createTextNode(libro.mostrarDetalles()));
  lista.appendChild(item);

  obtener("contador").textContent = libros.length;
};

const mostrarListaVacia = function () {
  const contenedor = obtener("listaLibros");
  const aviso = document.createElement("p");
  aviso.setAttribute("class", "text-muted mb-0");
  aviso.appendChild(
    document.createTextNode("Todavia no se ha agregado ningun libro.")
  );
  contenedor.appendChild(aviso);
};

const agregarLibro = function () {
  const titulo = obtener("titulo").value.trim();
  const autor = obtener("autor").value.trim();
  const isbn = obtener("isbn").value.trim();
  const anio = obtener("anio").value.trim();
  const genero = obtener("genero").value;

  ocultarMensaje();

  if (!titulo || !autor || !isbn || !anio || !genero) {
    mostrarMensaje("Debe completar todos los campos del formulario.", "danger");
    return;
  }

  if (!patronISBN.test(isbn)) {
    mostrarMensaje(
      "ISBN invalido: debe contener exactamente 10 o 13 digitos numericos, sin guiones ni letras.",
      "danger"
    );
    return;
  }

  const anioNumero = Number(anio);
  const anioActual = new Date().getFullYear();
  if (!Number.isInteger(anioNumero) || anioNumero < 1450 || anioNumero > anioActual) {
    mostrarMensaje(
      "El anio de publicacion debe ser un numero entre 1450 y " + anioActual + ".",
      "danger"
    );
    return;
  }

  const libro = new Libro(titulo, autor, isbn, anioNumero, genero);
  libros.push(libro);

  dibujarLibro(libro);
  limpiarCampos();
  mostrarMensaje('El libro "' + libro.titulo + '" se agrego correctamente.', "success");

  console.log(libro.mostrarDetalles());
};

obtener("btnAgregar").addEventListener("click", agregarLibro);
obtener("btnLimpiar").addEventListener("click", function () {
  limpiarCampos();
  ocultarMensaje();
});

mostrarListaVacia();
