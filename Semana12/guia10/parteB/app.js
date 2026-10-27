document.addEventListener('alpine:init', () => {

  Alpine.data('inventario', (url) => ({
    productos: [],
    categorias: ['Alimentos', 'Bebidas', 'Artesanías', 'Tecnología'],
    busqueda: '',
    soloBajo: false,
    cargando: true,
    error: '',
    intento: false,
    form: { nombre: '', categoria: '', precio: '', cantidad: '' },

    async init() {
      try {
        const respuesta = await fetch(url);
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
        (!this.soloBajo || p.cantidad < 5) &&
        (p.nombre + ' ' + p.categoria).toLowerCase().includes(t));
    },

    get errores() {
      const f = this.form, e = {};
      if (!String(f.nombre).trim()) e.nombre = 'El nombre es obligatorio.';
      if (!f.categoria) e.categoria = 'Seleccione una categoría.';
      if (f.precio === '' || !(f.precio > 0)) e.precio = 'Debe ser mayor que 0.';
      if (f.cantidad === '' || !Number.isInteger(f.cantidad) || f.cantidad < 0) e.cantidad = 'Entero ≥ 0.';
      return e;
    },

    agregar() {
      this.intento = true;
      if (Object.keys(this.errores).length > 0) return;

      const id = Math.max(0, ...this.productos.map(p => p.id)) + 1;
      this.productos.push({
        id: id,
        nombre: this.form.nombre.trim(),
        categoria: this.form.categoria,
        precio: this.form.precio,
        cantidad: this.form.cantidad
      });

      this.form = { nombre: '', categoria: '', precio: '', cantidad: '' };
      this.intento = false;
    },

    eliminar(p) {
      if (confirm('¿Desea eliminar ' + p.nombre + '?')) {
        this.productos = this.productos.filter(x => x.id !== p.id);
      }
    }
  }));

});
