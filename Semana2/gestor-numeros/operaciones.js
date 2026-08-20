// operaciones.js
// Funciones matematicas que se aplican sobre el arreglo de numeros.

// Suma todos los numeros del arreglo.
function sumar(numeros) {
    var total = 0;
    for (var i = 0; i < numeros.length; i++) {
        total = total + numeros[i];
    }
    return total;
}

// Multiplicacion acumulada de todos los numeros.
function multiplicar(numeros) {
    var total = 1;
    for (var i = 0; i < numeros.length; i++) {
        total = total * numeros[i];
    }
    return total;
}

// Divide de izquierda a derecha: n1 / n2 / n3 / ...
// Devuelve null si aparece un divisor en cero.
function dividir(numeros) {
    var total = numeros[0];
    for (var i = 1; i < numeros.length; i++) {
        if (numeros[i] === 0) {
            return null;
        }
        total = total / numeros[i];
    }
    return total;
}

// Genera un arreglo NUEVO con cada numero elevado al cuadrado.
// El arreglo original no se modifica.
function elevarAlCuadrado(numeros) {
    var resultado = [];
    for (var i = 0; i < numeros.length; i++) {
        resultado.push(numeros[i] * numeros[i]);
    }
    return resultado;
}

module.exports = {
    sumar: sumar,
    multiplicar: multiplicar,
    dividir: dividir,
    elevarAlCuadrado: elevarAlCuadrado
};
