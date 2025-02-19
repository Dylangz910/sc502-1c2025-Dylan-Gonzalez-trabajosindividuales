document.addEventListener("DOMContentLoaded", function() {
    const miParrafo = document.getElementById("Parrafo");
    const miBoton = document.getElementById("Boton");

    miBoton.addEventListener("click", function() {
        if (miParrafo.innerHTML === "Texto 1") {
            miParrafo.innerHTML = "Texto 2";
        } else {
            miParrafo.innerHTML = "Texto 1";
        }
    });
});