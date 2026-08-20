// menu.js
// Muestra el menu y maneja la entrada del usuario.

var prompt = require("prompt-sync")({ sigint: true });
var operaciones = require("./operaciones");
var utils = require("./utils");

// Aqui se guardan los numeros durante toda la ejecucion.
var numeros = [];

function mostrarMenu() {
    console.log("");
    console.log("===== GESTOR DE NUMEROS =====");
    console.log("1. Agregar numeros");
    console.log("2. Mostrar numeros");
    console.log("3. Suma total");
    console.log("4. Multiplicacion total");
    console.log("5. Division total");
    console.log("6. Elevar al cuadrado");
    console.log("7. Salir");
    console.log("=============================");
}

// Opcion 1: pide cuantos numeros y los va agregando con push.
function agregarNumeros() {
    var cuantos = parseInt(prompt("Cuantos numeros desea agregar? "));

    if (isNaN(cuantos) || cuantos < 1) {
        console.log("Debe escribir una cantidad valida.");
        return;
    }

    for (var i = 1; i <= cuantos; i++) {
        var numero = parseFloat(prompt("Numero " + i + ": "));

        if (isNaN(numero)) {
            console.log("Eso no es un numero, no se agrego.");
        } else {
            numeros.push(numero);
        }
    }

    console.log("Ahora hay " + numeros.length + " numero(s) en la lista.");
}

// Las operaciones necesitan que exista al menos un numero.
function hayDatos() {
    if (utils.estaVacio(numeros)) {
        console.log("Primero debe agregar numeros (opcion 1).");
        return false;
    }
    return true;
}

function iniciarMenu() {
    var salir = false;

    while (salir === false) {
        mostrarMenu();
        var opcion = prompt("Elija una opcion (1-7): ");

        // Si se cierra la entrada (Ctrl+D) ya no hay nada que leer.
        if (opcion === null) {
            console.log("Programa finalizado.");
            break;
        }

        switch (opcion) {
            case "1":
                agregarNumeros();
                break;

            case "2":
                utils.mostrarNumeros(numeros);
                break;

            case "3":
                if (hayDatos()) {
                    console.log("Suma total: " + operaciones.sumar(numeros));
                }
                break;

            case "4":
                if (hayDatos()) {
                    console.log("Multiplicacion total: " + operaciones.multiplicar(numeros));
                }
                break;

            case "5":
                if (hayDatos()) {
                    var division = operaciones.dividir(numeros);
                    if (division === null) {
                        console.log("No se puede dividir entre cero.");
                    } else {
                        console.log("Division total: " + division);
                    }
                }
                break;

            case "6":
                if (hayDatos()) {
                    var cuadrados = operaciones.elevarAlCuadrado(numeros);
                    utils.mostrarArreglo("Numeros al cuadrado", cuadrados);
                }
                break;

            case "7":
                salir = true;
                console.log("Programa finalizado. Hasta luego.");
                break;

            default:
                console.log("Opcion no valida. Escriba un numero del 1 al 7.");
        }
    }
}

module.exports = {
    mostrarMenu: mostrarMenu,
    iniciarMenu: iniciarMenu
};
