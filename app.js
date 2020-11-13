/**
 * Modulo app.js
 * Aqui se detallan los procedimientos que dan funcionalidad al aplicativo
 * @author Jackson Moreno <jaarmore@outlook.com>
 * @copyright Creative Commons
 * @version 1.0.0
 * Fecha: 11/11/2020
 * 
 */

/**
 * Clase Mensaje
 * En esta clase se definen los metodos que seran de utilidad para
 * procesar el historial de conversaciones
 */
class Mensaje {
    /**
     * constructor de la clase
     * Instancia un nuevo objeto con el historial de conversaciones
     * @param {string} mensaje historial de conversacion recibido.
     * @param {int} puntaje atributo para calcular la calificacion del servicio
     */
    constructor(mensaje) {
        this.mensaje = mensaje;
        this.puntaje = 0;
    }

    /**
     * obtenerNumeroMensajes
     * Metodo que divide el mensaje recibido por sus saltos de linea y devuelve el
     * numero de mensajes resultantes, exceptuando el salto de linea.
     * @returns {int} numeroMensajes
     */
    obtenerNumeroMensajes() {
        let numeroMensajes = this.mensaje.split("\n");

        if (numeroMensajes) {
            console.log("Numero de mensajes: " + (numeroMensajes.length - 1));
            return (numeroMensajes.length - 1);
        }

        return 0;
    }

    /**
     * obtenerNumeroCoincidencias
     * Retorna el numero de coincidencias de la palabra urgente por registro
     * @return {int} coincidencias.length
     */
    obtenerNumeroCoincidencias() {
        let expresionRegular = /URGENTE\W/g;
        let coincidencias = this.mensaje.match(expresionRegular);

        if (coincidencias) {
            console.log(coincidencias);
            return coincidencias.length;
        }
    }

    /**
     * obtenerExcelenteServicio
     * Retorna un boolean si se encuentra la palabra "EXCELENTE SERVICIO"
     * incluida en el mensaje.
     * @return {boolean}
     */
    obtenerExcelenteServicio() {
        if (this.mensaje.includes("EXCELENTE SERVICIO")) {
            return true;
        }
    }

    /**
     * obtenerListaPalabras
     * Retorna el numero de veces que encuentra la coincidencia de alguna
     * de las palabras que exclaman el buen servicio.
     * @returns {int} coincidencias.length
     */
    obtenerListaPalabras() {
        let expresionRegular = /gracias\W|buena atención\w|muchas gracias\W/gi;
        let coincidencias = this.mensaje.match(expresionRegular);

        if (coincidencias) {
            console.log(coincidencias);
            return coincidencias.length
        }

        return 0;
    }

}

/**
 * btnCaptura - variable con la que capturo el evento click del boton
 * para procesar el contenido del textarea en el formulario.
 */
let btnCaptura = document.getElementById("btnCaptura");
btnCaptura.addEventListener("click", function (e) {
    e.preventDefault();
    let txtMensaje = document.getElementById("conversacion");
    
    const objMensaje = new Mensaje(txtMensaje.value);
    
    // Valido que exista la palabra "EXCELENTE SERVICIO" en el mensaje.
    // O que la conversacion haya sido abandonada por el asesor.
    if (objMensaje.obtenerExcelenteServicio()) {
        alert("5 estrellas: * * * * *");
        return false;
    } else if (objMensaje.obtenerNumeroMensajes() <= 1) {
        alert("Conversacion abandonada: sin estrellas");
        return false;
    } else {
        puntajeNumeroMensajes(objMensaje);
        puntajeCoincidenciaUrgente(objMensaje);
        puntajePalabrasBuenServicio(objMensaje);
        obtenerDuracionLlamada(objMensaje);
        console.log("Puntaje: " + objMensaje.puntaje);
        evaluaCalificacion(objMensaje);
    }

});

/**
 * Calcula el puntaje a obtener de acuerdo al numero de mensajes
 * en la conversacion.
 * @param {object} objMsg 
 */
function puntajeNumeroMensajes(objMsg) {
    if (objMsg.obtenerNumeroMensajes() <= 5) {
        objMsg.puntaje += 20;
    } else {
        objMsg.puntaje += 10;
    }
}

/**
 * Calcula el puntaje a obtener de acuerdo al numero de coincidencias
 * de la palabra "URGENTE" en la conversacion
 * @param {object} objMsg 
 */
function puntajeCoincidenciaUrgente(objMsg) {
    if (objMsg.obtenerNumeroCoincidencias()) {
        if (objMsg.obtenerNumeroCoincidencias() <= 2) {
            objMsg.puntaje -= 5;
        } else {
            objMsg.puntaje -= 10;
        }
    } else {
        objMsg.puntaje += 0;
    }
}

/**
 * Calculo el puntaje a obtener de acuerdo al numero de coincidencias
 * de las palabras que expresan un buen servicio.
 * @param {object} objMsg
 */
function puntajePalabrasBuenServicio(objMsg) {
    const coincidencias = objMsg.obtenerListaPalabras();
    objMsg.puntaje +=  (coincidencias * 10);

}

/**
 * Calculo el tiempo que duro la llamada con el CLIENTE
 * @param {object} objMsg
 */
function obtenerDuracionLlamada(objMsg) {
    // Obtengo un array con la informacion del tiempo en la conversacion
    let exReg = /(\d{2}):(\d{2}):(\d{2})/g;
    let coincidencias = objMsg.mensaje.match(exReg);
    
    // Separo el ultimo elemento del array de tiempo
    let final = coincidencias.length - 1;

    // Separo el tiempo de la posicion inicial y final
    // por horas, minutos y segundos
    let tInicial = coincidencias[0].split(":");
    let tFinal =  coincidencias[final].split(":");
    
    console.log(tInicial);
    console.log(tFinal);

    // Calculo el tiempo transcurrido en la conversacion
    let minutos = tFinal[1] - tInicial[1];
    let segundos = tFinal[2] - tInicial[2];

    msg = `Duracion de la llamada: ${minutos} minutos y ${segundos} segundos`;
    console.log(msg);

    if (minutos < 0) {
        objMsg.puntaje += 50;
    } else {
        objMsg.puntaje += 25;
    }
}

/**
 * Esta funcion establece la calificacion del servicio, tomando como base
 * el puntaje obtenido, de acuerdo a los parametros.
 * @param {object} objMsg 
 */
function evaluaCalificacion(objMsg) {

    if (objMsg.puntaje <= 0) {
        alert("sin estrellas.");
    } else if (objMsg.puntaje > 0 && objMsg.puntaje <= 25) {
        alert("1 estrella: *");
    } else if (objMsg.puntaje > 25 && objMsg.puntaje <= 50) {
        alert("2 estrellas: * *");
    } else if (objMsg.puntaje > 50 && objMsg.puntaje <= 75) {
        alert("3 estrellas: * * *");
    } else if (objMsg.puntaje > 75 && objMsg.puntaje <= 90) {
        alert("4 estrellas: * * * *");
    } else if (objMsg.puntaje > 90) {
        alert("5 estrellas: * * * * *");
    }
}