document.addEventListener('alpine:init', () => {

  Alpine.data('inventario', (url) => ({
    productos: [],
    categorias: ['Alimentos', 'Bebidas', 'Artesanías', 'Tecnología'],
    busqueda: '',
    soloBajo: false,
    cargando: true,
    error: '',
    intento: false,
    confirmar: null,
    form: { nombre: '', categoria: '', precio: '', cantidad: '' },

    async init() {
      const guardado = localStorage.getItem('inventario');
      if (guardado) {
        this.productos = JSON.parse(guardado);
        this.cargando = false;
      } else {
        try {
          const respuesta = await fetch(url);
          if (!respuesta.ok) throw new Error('HTTP ' + respuesta.status);
          this.productos = await respuesta.json();
        } catch (e) {
          this.error = 'No se pudo cargar el inventario: ' + e.message;
        } finally {
          this.cargando = false;
        }
      }

      this.$watch('productos', valor => {
        localStorage.setItem('inventario', JSON.stringify(valor));
      });
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

    guardar() {
      this.intento = true;
      if (Object.keys(this.errores).length > 0) return;

      const producto = {
        id: this.form.id,
        nombre: this.form.nombre.trim(),
        categoria: this.form.categoria,
        precio: this.form.precio,
        cantidad: this.form.cantidad
      };

      if (producto.id) {
        this.productos = this.productos.map(p => p.id === producto.id ? producto : p);
        this.$dispatch('aviso', { tipo: 'success', texto: 'Producto actualizado.' });
      } else {
        producto.id = Math.max(0, ...this.productos.map(p => p.id)) + 1;
        this.productos.push(producto);
        this.$dispatch('aviso', { tipo: 'success', texto: 'Producto agregado.' });
      }

      this.cancelar();
    },

    editar(p) {
      this.form = { ...p };
      this.intento = false;
      this.$nextTick(() => this.$refs.nombre.focus());
    },

    cancelar() {
      this.form = { nombre: '', categoria: '', precio: '', cantidad: '' };
      this.intento = false;
    },

    eliminarConfirmado() {
      if (this.form.id === this.confirmar.id) this.cancelar();
      this.productos = this.productos.filter(p => p.id !== this.confirmar.id);
      this.$dispatch('aviso', { tipo: 'danger', texto: 'Producto eliminado.' });
      this.confirmar = null;
    }
  }));

  Alpine.data('avisos', () => ({
    visible: false,
    tipo: 'success',
    texto: '',
    temporizador: null,

    mostrar({ tipo, texto }) {
      this.tipo = tipo;
      this.texto = texto;
      this.visible = true;
      clearTimeout(this.temporizador);
      this.temporizador = setTimeout(() => this.visible = false, 3000);
    }
  }));

});
