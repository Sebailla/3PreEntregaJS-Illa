
let tablaPaciente = localStorage.getItem("tablaPacienteStorage");
tablaPaciente = JSON.parse(tablaPaciente);
if(tablaPaciente == null){
    tablaPaciente = [];
}

listar();

function listar() {

    let dataFila = '';

    if(tablaPaciente.length > 0){
        for(const i in tablaPaciente){
            let varPaciente = JSON.parse(tablaPaciente[i]);
            dataFila += "<tr>";
            dataFila += "<td>"+varPaciente.idPaciente+"</td>";
            dataFila += "<td>"+varPaciente.nombre+"</td>";
            dataFila += "<td>"+varPaciente.apellido+"</td>";
            dataFila += "<td>"+varPaciente.dni+"</td>";
            dataFila += "<td>"+varPaciente.telefono+"</td>";
            dataFila += "<td>"+varPaciente.fechaIngreso+"</td>";
            dataFila += "<td>"+varPaciente.dx+"</td>";
            dataFila += "<td>"+varPaciente.cobertura+"</td>";
            dataFila += "<td>"+
                        "<button type='button' class='btn btn-warning btnEdit' onclick='abrirForm("+varPaciente.idPaciente+")'>EDITAR</button>"+
                        "<button type='button' class='btn btn-danger btnDelete' onclick='eliminarItem("+varPaciente.idPaciente+")'>ELIMINAR</button>"+
                        "</td>";
            dataFila += "</tr>";

        }
        document.getElementById("dataPacientes").innerHTML = dataFila;
    }
    else{
        document.getElementById("dataPacientes").innerHTML = "<tr><td colspan='7'>No hay datos</td></tr>";
    }
}



function abrirForm(idForm){
    localStorage.setItem("idForm", JSON.stringify(idForm));
    window.location.replace("../pages/ingreso.html");
}

function eliminarItem(idItem){
    for(const i in tablaPaciente){
        let varPaciente = JSON.parse(tablaPaciente[i]);
        if(varPaciente.idPaciente == idItem){
            tablaPaciente.splice(i,1);
            localStorage.setItem("tablaPacienteStorage", JSON.stringify(tablaPaciente));
        }
    }
    listar()
}