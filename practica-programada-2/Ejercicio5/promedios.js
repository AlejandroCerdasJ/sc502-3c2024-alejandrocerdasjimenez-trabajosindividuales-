document.addEventListener('DOMContentLoaded', function () {
    const alumnos = [{
        nombre: "Alejandro",
        apellido: "Cerdas",
        nota: 85 
    },
    { 
        nombre: "Monica", 
        apellido: "Jimenez", 
        nota: 90 
    },
    { 
        nombre: "Natalia", 
        apellido: "Vargas", 
        nota: 86 
    }];


function loadAlumnos() {
    const listaAlumnos = document.getElementById("lista-alumnos");
    listaAlumnos.innerHTML = '';

    let sumaNotas = 0;

    alumnos.forEach(function(alumno) {
        const lista = document.createElement('div');
        lista.className = 'alumno';
        lista.innerHTML = `${alumno.nombre} ${alumno.apellido}: ${alumno.nota}`;
        listaAlumnos.appendChild(lista);
        
        sumaNotas += alumno.nota;
    });

    const promedioNotas = sumaNotas / alumnos.length;
    const promedioDiv = document.getElementById("promedio-notas");
    promedioDiv.innerHTML = `Promedio: ${promedioNotas.toFixed(2)}`;
}

loadAlumnos();
});
