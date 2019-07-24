const express = require('express');
const app = express();

//Pagina inicial-------------------------------------------------------------------
app.get('/', (req, res) => {
    //res.send('generador de arbol binario aleatorio')
    res.status(404);
    res.json({ "error": 'Bad request' })

    //crendo el arbol----------
    const arreglo = [10,4,8,13,15,28,1,3,9,7,14,12]

    function Nodo(valor) {this.valor = valor; let izquierdo, derecho; }

    const NodoRaiz = new Nodo(arreglo[0]);
    for (let cont = 1; cont<arreglo.length; cont++) {
        let paseA = NodoRaiz;
        while (paseA!=undefined) {
            console.log("while, paseA.valor="+paseA.valor);
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

});

//identificador del AncestroComunCercano -------------------------------------------
app.get('/ancestro/:nodo1/:nodo2', (req, res) => {
    const n1 = parseInt(req.params.nodo1);
    const n2 = parseInt(req.params.nodo2);

    //mostrar error si los valores ingresados no son numeros
    if (isNaN(n1) || isNaN(n2)) {
        res.status(404);
        res.json({ "error": 'Bad request' })
        return;
    }

})

app.listen(3000, () => {
    console.log('Server on port 3000')
})