

let tablaPaciente = localStorage.getItem("tablaPacienteStorage");
tablaPaciente = JSON.parse(tablaPaciente);
if (tablaPaciente == null) {
    tablaPaciente = [];
}


var idForm = localStorage.getItem("idForm");
idForm = JSON.parse(idForm);
if (idForm == null) {
    var idForm = 0;
}

let btnGuardar = document.getElementById("btnGuardar");
btnGuardar.addEventListener("click", guardar);

cargarPagina();

function guardar() {


    Swal.fire({
        title: 'GUARDAR',
        html: 'DESEA GUARDAR LOS CAMBIOS?',
        showDenyButton: true,
        confirmButtonText: 'SI',
        denyButtonText: 'NO'
    }).then(
        (result) => {
            if (result.isConfirmed) {

                console.log("PRESIONO GUARDAR...");
                let objPaciente = JSON.stringify({
                    idPaciente: (idForm > 0) ? idForm : (tablaPaciente.length + 1),
                    nombre: document.getElementById("nombre").value,
                    apellido: document.getElementById("apellido").value,
                    dni: document.getElementById("dni").value,
                    telefono: document.getElementById("telefono").value,
                    fechaIngreso: document.getElementById("fechaIngreso").value,
                    dx: document.getElementById("dx").value,
                    cobertura: document.getElementById("cobertura").value
                });
                
                if (idForm > 0) {
                    for (const i in tablaPaciente) {
                        let varPaciente = JSON.parse(tablaPaciente[i]);
                        if (varPaciente.idPaciente == idForm) {
                            tablaPaciente[i] = objPaciente;
                            break;
                        }

                    }

                } else {
                    // NUEVOS PACIENTES
                    tablaPaciente.push(objPaciente);
                }

                localStorage.setItem("tablaPacienteStorage", JSON.stringify(tablaPaciente));

                Swal.fire('CAMBIOS  GUARDADOS','','success').then(
                    (result)=>{
                        window.location.replace("../index.html");
                    }
                );
            }else if (result.isDenied){
                Swal.fire('CAMBIOS NO GUARDADOS','','info');
            }
        }
    );

}

function cargarPagina() {
    if (idForm > 0) {
        // SACAR DATOS DE LA FILA DE LA TABLA Y PONERLO EN EL FORMULARIO
        for (const i in tablaPaciente) {
            let varPaciente = JSON.parse(tablaPaciente[i]);
            if (varPaciente.idPaciente == idForm) {
                document.getElementById("IdPaciente").value = varPaciente.idPaciente;
                document.getElementById("nombre").value = varPaciente.nombre;
                document.getElementById("apellido").value = varPaciente.apellido;
                document.getElementById("dni").value = varPaciente.dni;
                document.getElementById("telefono").value = varPaciente.telefono;
                document.getElementById("fechaIngreso").value = varPaciente.fechaIngreso;
                document.getElementById("dx").value = varPaciente.dx;
                document.getElementById("cobertura").value = varPaciente.cobertura;
                break;
            }
        }
    }
}
