// utils.js
// Funciones utilitarias para mostrar los arrays.

// Dice si el array todavia no tiene elementos.
function estaVacio(numeros) {
    if (numeros.length === 0) {
        return true;
    } else {
        return false;
    }
}

// Muestra los numeros ingresados hasta el momento.
// Al unir un array con un texto, JavaScript lo muestra separado por comas.
function mostrarNumeros(numeros) {
    if (estaVacio(numeros)) {
        console.log("Todavia no hay numeros ingresados.");
    } else {
        console.log("Numeros ingresados: " + numeros);
        console.log("Cantidad: " + numeros.length);
    }
}

// Muestra cualquier array con un titulo delante.
function mostrarArreglo(titulo, arreglo) {
    console.log(titulo + ": " + arreglo);
}

module.exports = {
    estaVacio: estaVacio,
    mostrarNumeros: mostrarNumeros,
    mostrarArreglo: mostrarArreglo
};
