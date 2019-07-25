const express = require('express');
const app = express();

//aqui importo el archivo .json del arbol binario
const arbol = require('./arbol.json');

let arreglo;
let NodoRaiz;

//Pagina inicial-------------------------------------------------------------------
app.get('/', (req, res) => {
    //capturo los datos del arbol.json en el siguiente array
    arreglo = arbol.arbolBinario;
    //muestro el resultado al cliente
    res.json({ "arbolBinario": arreglo })
    buildTree()
});

//pagina para generar arboles binarios aleatorios------------------
app.get('/randomTree', (req, res) => {
    //capturo los datos del arbol.json en el siguiente array----------
    arreglo = arbol.arbolBinario;
    for (let cont = 0; cont < arreglo.length; cont++) {
        arbol.arbolBinario.splice(cont, 1, Math.floor(Math.random() * (50 - 1) + 1));
    }
    //muestro el resultado al cliente
    res.json({ "arbolBinario-ALEATORO": arreglo })
    buildTree()
});

function Nodo(valor) { this.valor = valor; let izquierdo, derecho; }

function buildTree() {
    NodoRaiz = new Nodo(arreglo[0]);
    for (let cont = 1; cont < arreglo.length; cont++) {
        let paseA = NodoRaiz;
        while (paseA != undefined) {
            if (arreglo[cont] < paseA.valor) {
                if (paseA.izquierdo != undefined)
                    paseA = paseA.izquierdo;
                else {
                    paseA.izquierdo = new Nodo(arreglo[cont]);
                    break;
                }
            }
            else {
                if (paseA.derecho != undefined)
                    paseA = paseA.derecho;
                else {
                    paseA.derecho = new Nodo(arreglo[cont]);
                    break;
                }

            }
        }
    }
}

//identificador del AncestroComunCercano -------------------------------------------
app.get('/ancestro/:nodo1/:nodo2', (req, res) => {
    const n1 = parseInt(req.params.nodo1);
    const n2 = parseInt(req.params.nodo2);

    //verificar si los numeros existen en el array:
    if (!arreglo.includes(n1) || !arreglo.includes(n2)) {
        res.status(404);
        res.json({ "error": 'alguno o ambos NODOS no existe en el array' })
        return;
    }

    //verifica que los valores no sean texto
    if (isNaN(n1) || isNaN(n2)) {
        res.status(404);
        res.json({ "error": 'no se permite texto' })
        return;
    }

    ancestro(n1, n2, NodoRaiz)
    function ancestro(num1, num2, nodo) {
        if (num1 < nodo.valor && num2 < nodo.valor)
            ancestro(num1, num2, nodo.izquierdo);
        if (num1 > nodo.valor && num2 > nodo.valor)
            ancestro(num1, num2, nodo.derecho);
        else {
            console.log('function ancestro() => ancestro de ' + num1 + ' y ' + num2 + ' es: ' + nodo.valor);
            //respuesta presentada al cliente
            res.json({
                "arbolBinario": arreglo,
                "ancestroCercano": [{
                    "nodo1": n1,
                    "nodo2": n2,
                    "ancestro": nodo.valor
                }]
            })
        }
    }
})

app.listen(3000, () => {
    console.log('Server on port 3000')
})