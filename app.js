const express = require('express');
const app = express();

//aqui importo el archivo .json del arbol binario
const arbol = require('./arbol.json');



//--------------
let arreglo;
let NodoRaiz;

//Pagina inicial-------------------------------------------------------------------
app.get('/', (req, res) => {
    //capturo los datos del arbol.json en el siguiente array----------
    arreglo = arbol.arbolBinario;
    //muestro el resultado al cliente
    res.json({ "arbolBinario": arreglo })
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
    inorden(NodoRaiz);
}

//recorre el arbol de forma ordenada
function inorden(nodo) {
    if (nodo == undefined) return;
    inorden(nodo.izquierdo);
    console.log(' ,' + nodo.valor);
    inorden(nodo.derecho);
}


//identificador del AncestroComunCercano -------------------------------------------
app.get('/ancestro/:nodo1/:nodo2', (req, res) => {
    const n1 = parseInt(req.params.nodo1);
    const n2 = parseInt(req.params.nodo2);

    //mostrar error si los valores ingresados no son numeros
    if(isNaN(n1) || isNaN(n2)){
        res.status(404);
        res.json({"error":'Bad request'})
        return;
    }

    
    res.send('ancestro de los nodos ' + n1 + ' y nodo ' + n2 + ' es: ' + ancestro(n1, n2, NodoRaiz))
    //res.json({ "randomNumber": rta })
})


function ancestro(num1, num2, nodo) {

    while (nodo != undefined) {
        if (num1 < nodo.valor && num2 < nodo.valor)
            ancestro(num1, num2, nodo.izquierdo);
        if (num1 > nodo.valor && num2 > nodo.valor)
            ancestro(num1, num2, nodo.derecho);
        else {
            console.log('function ancestro() => ancestro de ' + num1 + ' y ' + num2 + ' es: ' + nodo.valor);
            return nodo.valor;
            break;
        }
    }
}

app.listen(3000, () => {
    console.log('Server on port 3000')
})