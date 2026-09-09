const catalogo = [
 { id: 1, nombre: "Sorpresa de Ilobasco", categoria: "Cerámica", precio: 4.50, stock: 25 },
 { id: 2, nombre: "Sartén de barro", categoria: "Cerámica", precio: 8.00, stock: 12 },
 { id: 3, nombre: "Hamaca de mecapal", categoria: "Textil", precio: 22.00, stock: 8 },
 { id: 4, nombre: "Cofre tallado", categoria: "Madera", precio: 15.75, stock: 5 },
];

// 1. Respaldo en JSON legible
const catalogoRespaldoJSON = JSON.stringify(catalogo, null, 2);
console.log("Respaldo en JSON legible:");
console.log(catalogoRespaldoJSON);

// 2. reconstrucción y verificación del respaldo
const catalogoReconstruido = JSON.parse(catalogoRespaldoJSON);
console.log("\nCatálogo reconstruido:");
console.log(catalogoReconstruido);

// 3. Valor total del inventario
try {
    const valorTotalInventario = catalogoReconstruido.reduce((total, producto) => {
        if (typeof producto.precio !== 'number' || typeof producto.stock !== 'number') {
            throw new Error(`Producto con id ${producto.id} tiene datos inválidos.`);
        }
        return total + (producto.precio * producto.stock);
    }, 0);
    console.log(`Valor total del inventario: $${valorTotalInventario.toFixed(2)}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
}
