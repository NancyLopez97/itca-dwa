// Modelo: datos de un cliente
class Cliente {
  constructor(nombres, apellidos, pais, correo, tipo) {
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.pais = pais;
    this.correo = correo;
    this.tipo = tipo;
  }

  get nombreCompleto() {
    return `${this.nombres} ${this.apellidos}`;
  }
}

// Valida el formulario y aplica los estilos de Bootstrap
class ValidadorFormulario {
  constructor(formulario) {
    this.formulario = formulario;
  }

  // Marca como inválido un campo con solo espacios
  revisarEspacios() {
    this.formulario.querySelectorAll('input[type="text"][required]').forEach(campo => {
      campo.setCustomValidity(campo.value.trim() === '' ? 'Campo vacío' : '');
    });
  }

  esValido() {
    this.revisarEspacios();
    this.formulario.classList.add('was-validated');
    return this.formulario.checkValidity();
  }

  reiniciar() {
    this.formulario.classList.remove('was-validated');
  }
}

// Guarda los clientes y los muestra en la tabla
class RegistroClientes {
  #clientes = [];

  agregar(cliente) {
    this.#clientes.push(cliente);
  }

  get total() {
    return this.#clientes.length;
  }

  renderizar(tbody) {
    tbody.innerHTML = '';
    this.#clientes.forEach((c, i) => {
      const fila = document.createElement('tr');
      [i + 1, c.nombreCompleto, c.pais, c.correo, c.tipo].forEach(valor => {
        const celda = document.createElement('td');
        celda.textContent = valor;   // textContent evita inyección de HTML
        fila.appendChild(celda);
      });
      tbody.appendChild(fila);
    });
  }
}
