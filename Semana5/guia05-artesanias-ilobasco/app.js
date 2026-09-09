const catalogoInicial = [
 { id: 1, nombre: "Sorpresa de Ilobasco", categoria: "Cerámica", precio: 4.50, stock: 25 },
 { id: 2, nombre: "Sartén de barro", categoria: "Cerámica", precio: 8.00, stock: 12 },
 { id: 3, nombre: "Hamaca de mecapal", categoria: "Textil", precio: 22.00, stock: 8 },
 { id: 4, nombre: "Cofre tallado", categoria: "Madera", precio: 15.75, stock: 5 },
];

let catalogo = [];
let itemsEnCarrito = 0;
let totalAPagar = 0;

const contadorCarrito = document.getElementById("contador-carrito");

const totalCarrito = document.getElementById("total-carrito");

const aviso = document.getElementById("aviso");

const contenedorCatalogo = document.getElementById("catalogo");

const buscador = document.getElementById("buscador");

function guardarCookie(nombre, valor, segundos) {
    document.cookie = `${nombre}=${encodeURIComponent(valor)}; max-age=${segundos}; path=/`;
}

function leerCookie(nombre) {
    const pares = document.cookie.split("; ");
    for (const par of pares) {
        if (par.startsWith(nombre + "=")) {
            return decodeURIComponent(par.substring(nombre.length + 1));
        }
    }
    return null;
}

function mostrarAviso(mensaje, tipo) {
    aviso.textContent = mensaje;
    aviso.className = `aviso text-center ${tipo}`;
}

// try: intenta leer la cookie y reconstruir el catálogo con JSON.parse.
// catch: si no existe o viene corrupta se avisa y se usa el catálogo por defecto.
// finally: pase lo que pase se dibuja el catálogo.
function cargarCatalogo() {
    try {
        const guardado = leerCookie("catalogo");
        if (guardado === null) {
            throw new Error("No hay catálogo guardado.");
        }
        catalogo = JSON.parse(guardado);
    } catch (error) {
        catalogo = JSON.parse(JSON.stringify(catalogoInicial));
        mostrarAviso("No se encontró un catálogo guardado, se cargó el catálogo por defecto.", "info");
    } finally {
        actualizarVista();
    }
}

// JSON.stringify convierte el catálogo (con las existencias actuales) a texto
// para guardarlo en la cookie cada vez que el carrito cambia.
function guardarCatalogo() {
    guardarCookie("catalogo", JSON.stringify(catalogo), 86400);
}

function crearTarjetaProducto(producto) {
    const columna = document.createElement("div");
    columna.className = "col-12 col-sm-6 col-lg-3";

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta card h-100";
    tarjeta.dataset.id = producto.id;

    if (producto.stock < 10) {
        tarjeta.classList.add("bajo-stock");
    }

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body";

    const titulo = document.createElement("h3");
    titulo.className = "card-title fs-6";
    titulo.textContent = producto.nombre;

    const categoria = document.createElement("p");
    categoria.className = "categoria";
    categoria.textContent = producto.categoria;

    const precio = document.createElement("p");
    precio.className = "precio";
    precio.textContent = `$${producto.precio.toFixed(2)}`;

    const stock = document.createElement("p");
    stock.className = "stock";
    stock.textContent = `Stock: ${producto.stock}`;

    cuerpo.appendChild(titulo);
    cuerpo.appendChild(categoria);
    cuerpo.appendChild(precio);
    cuerpo.appendChild(stock);
    tarjeta.appendChild(cuerpo);
    columna.appendChild(tarjeta);

    // mouseover resalta la tarjeta y mouseout la regresa a la normalidad
    tarjeta.onmouseover = () => 
        tarjeta.classList.add("resaltada");

    tarjeta.onmouseout = () =>
        tarjeta.classList.remove("resaltada");

    // el clic intenta agregar el producto al carrito
    tarjeta.onclick = () => agregarAlCarrito(producto);

    return columna;
}

function renderizarCatalogo(productos) {
    contenedorCatalogo.innerHTML = "";
    productos.forEach(producto => {
        const tarjeta = crearTarjetaProducto(producto);
        contenedorCatalogo.appendChild(tarjeta);
    });
}

function actualizarVista() {
    const textoBusqueda = buscador.value.trim().toLowerCase();

    const productosFiltrados = catalogo.filter(producto => 
        producto.nombre.toLowerCase().includes(textoBusqueda)
    );

    if (productosFiltrados.length === 0) {
        contenedorCatalogo.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    } else {
        renderizarCatalogo(productosFiltrados);
    }
}

// try: si el producto todavía tiene stock se agrega al carrito.
// catch: el error personalizado de "sin existencias" se muestra en pantalla
// sin detener la aplicación y sin que el contador cambie.
function agregarAlCarrito(producto) {
    try {
        if (producto.stock <= 0) {
            throw new Error(`"${producto.nombre}" ya no tiene existencias.`);
        }
        producto.stock--;
        itemsEnCarrito++;
        totalAPagar += producto.precio;
        contadorCarrito.textContent = itemsEnCarrito;
        totalCarrito.textContent = totalAPagar.toFixed(2);
        guardarCatalogo();
        mostrarAviso(`Se agregó "${producto.nombre}" al carrito.`, "info");
        actualizarVista();
    } catch (error) {
        mostrarAviso(error.message, "error");
    }
}

// keyup filtra el catálogo con cada tecla y guarda la búsqueda 1 hora en una cookie
buscador.onkeyup = () => {
    actualizarVista();
    guardarCookie("ultimaBusqueda", buscador.value, 3600);
};

const ultimaBusqueda = leerCookie("ultimaBusqueda");
if (ultimaBusqueda !== null) {
    buscador.value = ultimaBusqueda;
}

cargarCatalogo();
