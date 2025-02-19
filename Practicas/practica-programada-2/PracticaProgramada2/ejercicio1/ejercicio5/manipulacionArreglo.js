document.addEventListener("DOMContentLoaded", function() {

    const estudiantes = [
        { nombre: "Juan", apellido: "Pérez", nota: 85 },
        { nombre: "Ana", apellido: "López", nota: 90 },
        { nombre: "Carlos", apellido: "Gómez", nota: 78 },
        { nombre: "Marta", apellido: "Rodríguez", nota: 92 },
        { nombre: "Luis", apellido: "Fernández", nota: 88 }
    ];
    const tbody = document.getElementById("estudiantes");

    let sumaNotas = 0;

    estudiantes.forEach(estudiante => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${estudiante.nombre}</td>
            <td>${estudiante.apellido}</td>
            <td>${estudiante.nota}</td>
        `;
        tbody.appendChild(fila);
        sumaNotas += estudiante.nota;
    });
    const promedio = (sumaNotas / estudiantes.length).toFixed(2);
    document.getElementById("promedioNotas").textContent = promedio;
});