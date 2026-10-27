function catalogo() {
  return {
    productos: [],
    busqueda: '',
    cargando: true,
    error: '',
    categorias: ['Alimentos', 'Bebidas', 'Artesanías', 'Tecnología'],
    nuevo: { nombre: '', categoria: '', precio: '', cantidad: '' },
    intento: false,

    async init() {
      try {
        const respuesta = await fetch('data/productos.json');
        if (!respuesta.ok) throw new Error('HTTP ' + respuesta.status);
        this.productos = await respuesta.json();
      } catch (e) {
        this.error = 'No se pudo cargar el inventario: ' + e.message;
      } finally {
        this.cargando = false;
      }
    },

    get filtrados() {
      const t = this.busqueda.toLowerCase();
      return this.productos.filter(p =>
        p.nombre.toLowerCase().includes(t) ||
        p.categoria.toLowerCase().includes(t));
    },

    get errores() {
      const n = this.nuevo;
      const e = {};
      if (String(n.nombre).trim() === '') e.nombre = 'El nombre es obligatorio.';
      if (n.categoria === '') e.categoria = 'Seleccione una categoría.';
      if (n.precio === '' || !(n.precio > 0)) e.precio = 'El precio debe ser mayor que 0.';
      if (n.cantidad === '' || !Number.isInteger(n.cantidad) || n.cantidad < 0) e.cantidad = 'Debe ser un entero mayor o igual a 0.';
      return e;
    },

    agregar() {
      this.intento = true;
      if (Object.keys(this.errores).length > 0) return;

      const id = Math.max(0, ...this.productos.map(p => p.id)) + 1;
      this.productos.push({
        id: id,
        nombre: this.nuevo.nombre.trim(),
        categoria: this.nuevo.categoria,
        precio: this.nuevo.precio,
        cantidad: this.nuevo.cantidad
      });

      this.nuevo = { nombre: '', categoria: '', precio: '', cantidad: '' };
      this.intento = false;
    },

    eliminar(id) {
      const producto = this.productos.find(p => p.id === id);
      if (confirm('¿Desea eliminar ' + producto.nombre + '?')) {
        this.productos = this.productos.filter(p => p.id !== id);
      }
    }
  };
}
