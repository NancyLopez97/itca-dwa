const preciosIngresados = ["4.50", "ocho", "-3", "22.0", "0"];

function validarPrecio(precioTexto) {
    const precio = Number(precioTexto);
    if (isNaN(precio) || precio <= 0) {
        throw new Error(`El valor "${precioTexto}" no es un número válido.`);
    }
    return precio;
}

for (const texto of preciosIngresados) {
    try {
        const precio = validarPrecio(texto);
        console.log(`Precio válido: ${precio}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    } finally {
        console.log("Validación finalizada");
    }
}
