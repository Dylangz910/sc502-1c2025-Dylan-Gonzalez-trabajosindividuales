function calcularDeducciones() {
    let salarioBruto = parseFloat(document.getElementById('salario').value);

    let cargasSociales = salarioBruto * 0.105;
    
    let impuestoRenta = 0;
    if (salarioBruto > 941000 && salarioBruto <= 1381000) {
        impuestoRenta = (salarioBruto - 941000) * 0.10;
    } 
    else if (salarioBruto > 1381000 && salarioBruto <= 2423000) {
        impuestoRenta = (1381000 - 941000) * 0.10 + (salarioBruto - 1381000) * 0.15;
    } 
    else if (salarioBruto > 2423000 && salarioBruto <= 4845000) {
        impuestoRenta = (1381000 - 941000) * 0.10 + (2423000 - 1381000) * 0.15 + (salarioBruto - 2423000) * 0.20;
    }
     else if (salarioBruto > 4845000) {
        impuestoRenta = (1381000 - 941000) * 0.10 + (2423000 - 1381000) * 0.15 + (4845000 - 2423000) * 0.20 + (salarioBruto - 4845000) * 0.25;
    }
    let salarioNeto = salarioBruto - cargasSociales - impuestoRenta;

    document.getElementById('cargas').textContent = cargasSociales.toFixed(2);
    document.getElementById('renta').textContent = impuestoRenta.toFixed(2);
    document.getElementById('neto').textContent = salarioNeto.toFixed(2);
}