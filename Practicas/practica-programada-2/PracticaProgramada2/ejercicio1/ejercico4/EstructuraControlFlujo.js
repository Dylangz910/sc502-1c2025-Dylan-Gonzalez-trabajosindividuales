function verificarEdad() {
    let edad = document.getElementById("edad").value;
    let mensajeElemento = document.getElementById("mensaje");
    let mensaje = "";
    
    if (edad >= 18) {
        mensaje = "Eres mayor de edad";
    } else {
        mensaje = "Eres menor de edad";
    }
    
    mensajeElemento.innerText = mensaje;
}