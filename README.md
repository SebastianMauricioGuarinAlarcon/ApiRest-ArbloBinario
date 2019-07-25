# ApiRest-ArbolBinario
Prueba técnica desarrollador back-end para Masivian
# Como ejecutar la aplicacion
<<aplicacion desarrollada en NodeJS>>
-para ejecutar, en la ruta del proyecto desde consola ejecute el comando: node app.js
    ejemplo: C:\Users\MASIVIAN\arbolBinario>node app.js
-a continuacion desde el navegador acceda a: http://localhost:3000
    
# Funcionamiento
* En la ruta "http://localhost:3000" podra visualizar en formato json el ArbolBinario que ya existe por defecto en el proyecto
  NOTA: dentro del proyecto, el ArbolBinario por defecto, se encuenta almacenado en el archivo "arbol.json", el cual puede modificar libremente
* Tambien puede generar ArbolesBinarios Aleatorios desde la ruta: http://localhost:3000/randomTree
* para obtener "El Ancestro Comun Mas Cercano" debe seleccionar dos nodos existentes del ArbolBinario en cuestion; por medio de la ruta, asi: 
http://localhost:3000/ancestro/5/10
NOTA: en la ruta anterior, los nodos "5 y 10" son datos de ejemplo. Debe escribir los nodos que usted considere pertinentes.
