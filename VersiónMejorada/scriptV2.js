'use strict'
//Variables globales
let numeroResultado;
let posicionHeroe = { x: 0, y: 0 };
let posicionGlobo = { x: 9, y: 9 }; // CAMBIO V2.0: Variable para el globo
let numeroTiradas = 0;

// 1. Al cargar la ventana, solo preparamos la interfaz. No validamos todavía.
window.onload = function () {
    crearInterfaz();
    //Podríamos cambiar el window.onload y hacer que busque directamente a la función crearInterfaz, pero por temas de escalabilidad lo dejamos así

};

function crearInterfaz() {
    //Creamos el label para que el usuario introduzca el nombre
    let label = document.createElement("label");
    //Añadimos el texto para el label
    label.innerText = "¿Como te llamas, niño?";
    //Lo añadimos al body
    document.body.appendChild(label);

    //Creamos el input para el nombre
    let inputNombre = document.createElement("input");
    //Añadimos el tipo al input
    inputNombre.type = "text";
    //Añadimos el id 
    inputNombre.id = "nombre";
    //Lo añadimos al body
    document.body.appendChild(inputNombre);

    //Creamos el botón Introducir nombre
    let btnNombre = document.createElement("button");
    //Añadimos el texto para el botón
    btnNombre.innerText = "Introducir nombre";
    //Le asignamos un ID
    btnNombre.id = "btnNombre";
    //Asignamos el evento del botón
    btnNombre.onclick = iniciarJuego;
    //Lo añadimos al body
    document.body.appendChild(btnNombre)

    //Creamos el botón Jugar
    let btnJugar = document.createElement("button");
    //Añdimos el texto al botón
    btnJugar.innerText = "Jugar";
    //Le asignamos un ID
    btnJugar.id = "btnJugar";
    //Hacemos que en un principio aparezca como disabled
    btnJugar.disabled = true;
    //Hacemos que el botón jugar ocupe su propia línea para que no esté junto al de introducir nombre
    btnJugar.style.display = "block";
    //le asignamos el evento  para generar el tablero
    btnJugar.onclick = generarTablero;
    //Lo añadimos al body
    document.body.appendChild(btnJugar);

    // 1. Creamos el div que agrupa los elementos del dado
    let contenedorDado = document.createElement("div");
    // Le ponemos ID 
    contenedorDado.id = "contenedorDado";
    //Lo añadimos al body
    document.body.appendChild(contenedorDado);

    // 2. Creamos el botón del dado
    let btnDado = document.createElement("button");
    //Le asignamos un ID
    btnDado.id = "tirarDado";
    //Le asignamos el evento
    btnDado.onclick = tirarDado;
    //Lo añadimos al div que hemos creado antes 
    contenedorDado.appendChild(btnDado);

    // 3. Creamos la imagen
    let imgDado = document.createElement("img");
    //Le asignamos un ID
    imgDado.id = "imagenDado";
    //Le damos como imagen inicial la cara 1
    imgDado.src = "img/cara1.PNG";
    //Añadimos la imagen al contenedorDado
    btnDado.appendChild(imgDado);

    //Y añadimos el botón al div
    contenedorDado.appendChild(btnDado);

    //Creamos el contador de tiradas
    let textoTiradas = document.createElement("div");
    //Le asignamos un id
    textoTiradas.id = "textoTiradas";
    //Le introducimos el texto
    textoTiradas.innerText = "Tiradas: 0";

    // Lo metemos dentro del contenedor del dado para que salga junto a él
    contenedorDado.appendChild(textoTiradas);

    //Creamos las variables para guardar localmente el record de puntos y el nombre
    let recordPuntos = localStorage.getItem("recordPuntos");
    let recordNombre = localStorage.getItem("recordNombre");

    //Creamos un div que contenga la información y le damos un id
    let contenedorRecord = document.createElement("div");
    contenedorRecord.id = "infoRecord";

    // 2. Comprobamos si existe 'recordPuntos'
    if (recordPuntos) {
        //Usamos las variables que acabamos de leer arriba
        contenedorRecord.innerText = "Récord actual: " + recordNombre + " (" + recordPuntos + " tiradas)";
    } else {
        contenedorRecord.innerText = "No hay récord registrado. ¡Sé el primero!";
    }

    //Añadimos el div con el record al body
    document.body.appendChild(contenedorRecord);

}

function validarNombre() {
    // Obtenemos el valor introducido por el usuario
    let nombre = document.getElementById("nombre").value.trim(); // .trim() quita espacios accidentales

    //Validación para la longitud 
    if (nombre.length < 4) {
        // Mostramos un mensaje por alert
        alert("El nombre debe tener 4 o más letras");
        return false; // Detiene la función aquí si hay error.
    }

    //Validación de números 
    //Si llega aquí, sabemos que la longitud es correcta.
    if (/[0-9]/.test(nombre)) {
        //Mostramos un mensaje por alert
        alert("Números no permitidos");
        return false; //Detiene la función.
    }

    //Creamos el div con el contenido del texto A luchar héroe
    let contenedorTexto = document.createElement("div");
    //Le damos un id
    contenedorTexto.id = "contenedorTexto";
    //Le introducimos el texto
    contenedorTexto.innerHTML = "A luchar héroe: " + nombre;
    //Lo añadimos al body
    document.body.appendChild(contenedorTexto);


    return true; //Si todas las validaciones son correctas, retorna true
}

function iniciarJuego() {
    //Guardamos el nombre en una variable después de las validaciones
    let nombreValido = validarNombre();

    // Habilitar el botón "Jugar" solo si el nombre es valido
    if (nombreValido === true) {
        let btnJugar = document.getElementById("btnJugar");
        if (btnJugar) {
            //Eliminamos la propiedad inicial disabled del boton Jugar
            btnJugar.disabled = false;

            //Asignamos el evento generarTablero
            btnJugar.onclick = generarTablero;
        }
    }
}

function generarTablero() {
    //Creamos la variable para la tabla
    let tabla = document.createElement("table");
    //Le añadimos un id
    tabla.id = "tabla";
    //La añadimos al body
    document.body.appendChild(tabla);

    // Limpiamos el contenido previo por si se reinicia el juego
    tabla.innerHTML = "";

    //Generamos la tabla con dos bucles for anidados
    for (let i = 0; i < 10; i++) { //Bucle para generar las filas
        let fila = document.createElement("tr");

        for (let j = 0; j < 10; j++) { //Bucle para generar columnas
            let columna = document.createElement("td");

            //Asignamos un id único a cada celda
            columna.id = i + "-" + j;

            //Creamos la variable vacía para guardar las imágenes
            let imagen = document.createElement("img");

            //Ponemos una imagen u otra dependiendo de la celda en la que se encuentre
            if (i === 0 && j === 0) //En el caso de que se encuentre en la posicion 0 0, imagen de IT
            {
                imagen.src = "img/it.jpg";
                posicionHeroe = { x: 0, y: 0 };
            } else if (i === 9 && j === 9) { //En el caso de que se encuentre en 9 9, imagen del globo
                imagen.src = "img/globo.avif"
            } else { //En el resto del tablero, suelo
                imagen.src = "img/baldosa1.PNG"
            }

            //Insertamos las imágenes en las celdas para que se muestren en el tablero
            fila.appendChild(columna);
            columna.appendChild(imagen);
        }

        //Insertamos las filas en la tabla
        tabla.appendChild(fila);

        //Creamos una variable para guardar el div contenedorDado creado en la función "crearInterfaz()"
        let contenedorDado = document.getElementById("contenedorDado");
        if (contenedorDado) {
            //Quitamos el 'none' del CSS para que se vea el dado
            contenedorDado.style.display = "block";
        }
    }

    //Al hacer click en el botón jugar, previamente habilitado, se mostrará el tablero de juego
    tabla.style.display = "table";

    // 2. Ocultar los botones de inicio (Jugar, Nombre, etc.)
    document.getElementById("btnJugar").style.display = "none";
    document.getElementById("nombre").style.display = "none";
    document.getElementById("btnNombre").style.display = "none";
    document.querySelector("label").style.display = "none";

    // 3. Mostrar el Contenedor del Dado (que contiene botón e imagen)
    let contenedorDado = document.getElementById("contenedorDado");
    if (contenedorDado) {
        // Hacemos visible todo el contenedor
        contenedorDado.style.display = "block";
    }
}

function tirarDado() {

    let imagenDado = document.getElementById("imagenDado");

    //Igualamos la variable global numeroResultado a un número aleatorio generado con Math.random (del 1 al 6)
    numeroResultado = Math.floor(Math.random() * 6) + 1;

    //Mostramos el resultado por consola para comprobar su correcto funcionamiento.
    console.log("Has sacado un " + numeroResultado);

    //Cambiamos la imagen del dado a la cara con el número correspondiente (Antes lo había hecho con 6 if anidados)
    imagenDado.src = "img/cara" + numeroResultado + ".PNG";

    // Sumamos 1 cada vez que se pulsa el botón a la variable global con el número de las tiradas realizadas
    numeroTiradas++;
    //Lo sacamos por consola
    console.log("Tirada número: " + numeroTiradas);

    //Actualizamos en pantalla el número de tiradas
    let textoTiradas = document.getElementById("textoTiradas");
    if (textoTiradas) {
        textoTiradas.innerText = "Tiradas: " + numeroTiradas;
    }

    //Llamamos a la función "mostrarMovimientosPosibles" y le pasamos como páramentro el numeroResultado
    mostrarMovimientosPosibles(numeroResultado);
}

function mostrarMovimientosPosibles(pasos) { //Recibe el número aleatorio del dado y lo recoge en la variable local "pasos"
    //Creamos una variable con las celdas resaltadas en rojo
    let celdasActivas = document.querySelectorAll(".activa");
    for (let i = 0; i < celdasActivas.length; i++) {
        //A dichas celdas les eliminamos la clase .activa
        celdasActivas[i].classList.remove("activa");
        //Eliminamos el evento para que se pueda hacer clic sobre ellas
        celdasActivas[i].onclick = null;
    }

    //Definimos las 4 direcciones posibles, "x" para filas, "y" para columnas
    //Creamos un array bidimensional
    let direcciones = [
        [-1, 0], //Arriba (resta filas)
        [1, 0], //Abajo (suma filas)
        [0, -1], //Izquierda (resta columnas)
        [0, 1] //Derecha (suma columnas)
    ];

    //Recorremos el tablero y nos aseguramos de que el personaje esté dentro de él
    // PRIMER BUCLE
    // Este bucle se repite 4 veces (una por cada dirección de arriba)
    for (let i = 0; i < direcciones.length; i++) {
        //Calculamos el destino final, es decir, la última celda disponible
        let destinoFila = posicionHeroe.x + (direcciones[i][0] * pasos);
        let destinoColumna = posicionHeroe.y + (direcciones[i][1] * pasos);

        //Verificamos si la última celda está dentro del tablero
        if (destinoFila >= 0 && destinoFila < 10 && destinoColumna >= 0 && destinoColumna < 10) {
            // 4. SEGUNDO BUCLE
            // Si el dado sacó un 3, este bucle cuenta: paso 1, paso 2, paso 3.
            for (let j = 1; j <= pasos; j++) {

                // Fila Destino = Fila Actual + (Dirección * Número de paso)
                // Ejemplo: Estoy en fila 5. Voy Arriba (-1). Es el paso 2.
                // Calculo: 5 + (-1 * 2) = 3. ¡Mi destino es la fila 3!
                let nuevaFila = posicionHeroe.x + (direcciones[i][0] * j);
                let nuevaColumna = posicionHeroe.y + (direcciones[i][1] * j);

                // Si la fila o columna es menor que 0 o mayor que 9, quiere decir que el personaje se ha salido.
                if (nuevaFila >= 0 && nuevaFila < 10 && nuevaColumna >= 0 && nuevaColumna < 10) {

                    // Si esta dentro, buscoamos la celda
                    let idCelda = nuevaFila + "-" + nuevaColumna;
                    let celda = document.getElementById(idCelda);

                    if (celda) {
                        celda.classList.add("activa"); // Le añadimos la clase activa para pintarlo de rojo

                        // Al hacer click, movemos al héroe a esa casilla específica
                        celda.onclick = function () {
                            moverHeroe(nuevaFila, nuevaColumna);
                        };
                    }
                } else {
                    //Si en el paso 2 se sale del mapa, rompemos el bucle
                    break;
                }
            }
        }
    }
}

// --- NUEVA FUNCIÓN V2.0---
function moverGlobo(distancia) {
    let opcionesValidas = [];
    let direcciones = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    // Calculamos a dónde puede huir el globo usando el número del dado
    direcciones.forEach(dir => {
        let fila = posicionGlobo.x + (dir[0] * distancia);
        let columna = posicionGlobo.y + (dir[1] * distancia);

        // Validamos que esté dentro del tablero
        if (fila >= 0 && fila < 10 && columna >= 0 && columna < 10) {
            // Validamos que NO salte encima del héroe
            if (fila !== posicionHeroe.x || columna !== posicionHeroe.y) {
                opcionesValidas.push({ x: fila, y: columna });
            }
        }
    });

    // Si tiene opciones para moverse
    if (opcionesValidas.length > 0) {
        // 1. Elegimos una al azar
        let azar = Math.floor(Math.random() * opcionesValidas.length);
        let destino = opcionesValidas[azar];

        // 2. Borramos globo viejo
        let celdaVieja = document.getElementById(posicionGlobo.x + "-" + posicionGlobo.y);
        if (celdaVieja) celdaVieja.querySelector("img").src = "img/baldosa1.PNG";

        // 3. Actualizamos coordenadas
        posicionGlobo = destino;

        // 4. Pintamos globo nuevo
        let celdaNueva = document.getElementById(posicionGlobo.x + "-" + posicionGlobo.y);
        if (celdaNueva) celdaNueva.querySelector("img").src = "img/globo.avif";

        //Un console log para ver que calcula bien las coordenadas del globo
        console.log("El globo ha huido a: " + posicionGlobo.x + "-" + posicionGlobo.y);
    }
}
function moverHeroe(nuevaFila, nuevaColumna) {
    //Buscamos la celda donde estaba el héroe para quitarlo de la celda antigua
    let idViejo = posicionHeroe.x + "-" + posicionHeroe.y;
    let celdaVieja = document.getElementById(idViejo);

    //Cambiamos la imagen del héroe por la de la baldosa utilizando querySelector para coger la imagen dentro de la celda
    if (celdaVieja) {
        celdaVieja.querySelector("img").src = "img/baldosa1.PNG";
    }

    //Actualizamos la variable global que contiene las coordenadas del héroe
    posicionHeroe.x = nuevaFila;
    posicionHeroe.y = nuevaColumna;

    //Pasamos al héroe a la posición nueva
    let idNuevo = nuevaFila + "-" + nuevaColumna;
    let celdaNueva = document.getElementById(idNuevo);

    //Le ponemos la imagen de it
    if (celdaNueva) {
        celdaNueva.querySelector("img").src = "img/it.jpg";
    }

    //Quitamos los bordes rojos y los eventos clic de todas las celdas
    let celdasActivas = document.querySelectorAll(".activa");
    for (let i = 0; i < celdasActivas.length; i++) {
        //A dichas celdas les eliminamos la clase .activa
        celdasActivas[i].classList.remove("activa");
        //Eliminamos el evento para que se pueda hacer clic sobre ellas
        celdasActivas[i].onclick = null;
    }

    // Comprobamos si las coordenadas del héroe coinciden con las del globo
    if (posicionHeroe.x === posicionGlobo.x && posicionHeroe.y === posicionGlobo.y) {
        
        setTimeout(function () {
            alert("¡HAS GANADO! Atrapaste el globo en " + numeroTiradas + " tiradas.");

            //LÓGICA DE RECORD
            //Recuperamos el record anterior (solo el número) en una nueva variable recordPuntos
            let recordPuntos = localStorage.getItem("recordPuntos");

            //Comparamos los puntos
            //Si no hay record establecido o si las tiradas realizadas son menores al anterior
            if (recordPuntos === null || numeroTiradas < parseInt(recordPuntos)) {
                alert("¡NUEVO RÉCORD!");

                //Obtenemos el nombre introducido en el input por el usuario
                let nombreJugador = document.getElementById("nombre").value;

                //Guardamos los nuevos datos con localStorage con la clave y el valor
                localStorage.setItem("recordPuntos", numeroTiradas);
                localStorage.setItem("recordNombre", nombreJugador);
            }
            //Recargamos la página, no hace falta actualizar el record aquí, porque al recargar, crearInterfaz() lee el record nuevo y lo cambia
            location.reload();
        }, 100);

    } else {
        // CAMBIO V2.0: SI NO GANAMOS, EL GLOBO SE MUEVE
        // Le damos un pequeño retraso (0.5s) para que se vea el turno
        setTimeout(() => {
            moverGlobo(numeroResultado); // El globo usa tu tirada para huir
        }, 500);
    }
}