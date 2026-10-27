// Simulación didáctica: en un sistema real se valida en el servidor
// Usuario con la clave en un campo privado
class Usuario {
  #clave;
  constructor(nombre, clave, rol) {
    this.nombre = nombre;
    this.#clave = clave;
    this.rol = rol;
  }

  verificarClave(clave) {
    return this.#clave === clave;
  }
}

// Verifica credenciales y cuenta los intentos fallidos
class ServicioAutenticacion {
  static MAX_INTENTOS = 3;
  #usuarios;
  #intentosFallidos = 0;

  constructor(usuarios) {
    this.#usuarios = usuarios;
  }

  get bloqueado() {
    return this.#intentosFallidos >= ServicioAutenticacion.MAX_INTENTOS;
  }

  get intentosRestantes() {
    return ServicioAutenticacion.MAX_INTENTOS - this.#intentosFallidos;
  }

  // Devuelve el usuario si es correcto, null si falla
  autenticar(nombre, clave) {
    if (this.bloqueado) {
      throw new Error('Acceso bloqueado por demasiados intentos fallidos.');
    }
    const usuario = this.#usuarios.find(u => u.nombre === nombre);
    if (usuario && usuario.verificarClave(clave)) {
      this.#intentosFallidos = 0;
      return usuario;
    }
    this.#intentosFallidos++;
    return null;
  }
}
