//iniciamos variables globales
const URL_API = 'http://localhost:3000/'; //url del servidor json server
const frmDatosRecluta = document.querySelector('#fromDatosRecluta');
const frmDatosReclutasEditar = document.querySelector('#fromDatosRecluta1');
let idEditar = 0;

document.addEventListener('DOMContentLoaded', () => {
    //aqui van las funciones que van a iniciar cuando se cargue el DOM

    getReclutas();
    getTeam();

});

//funcion para darle funcionalidas a las secciones de la pagina
document.querySelectorAll(".menu").forEach((seccion) => {
    seccion.addEventListener('click', (e) => {
        let dato = JSON.parse(e.target.dataset.veryocultar);
        let ver = document.querySelector(dato[0]);
        ver.style.display = "block";
        dato[1].forEach(item => {
            let ocultar = document.querySelector(item);
            ocultar.style.display = "none";
        });
        e.preventDefault();
    });
});

//funcion para actvar y desaptivar los botones del formulario
document.querySelectorAll(".botonn").forEach((boton) => {
    boton.addEventListener('click', (e) => {
        let botondatos = JSON.parse(e.target.dataset.habilitardesabilitar);
        botondatos[0].forEach(item1 => {
            let botonHabilitar = document.querySelector(item1);
            botonHabilitar.disabled = false;
        });
        botondatos[1].forEach(item2 => {
            let botonDesabilitar = document.querySelector(item2);
            botonDesabilitar.disabled = true;
        });
        e.preventDefault();
    });
});

//-----------traemos el Id perteneciente al grupo del TEAM----------------------------------------
//estraemos los datos de la API, implemetamos el metodo (GET) para el TEAM
async function getTeam() {
    try {
        const response = await fetch(`${URL_API}team`) //indicamos el endpoint que es /team (GET)
        console.log(response);

        if (response.status === 200) {
            const data = await response.json();
            cargarIdTeam1(data);
            //console.log(data)

        } else if (response.status === 401) {
            console.log("la lleve a la cual deseas ingresar esta mal escrita")

        } else if (response.status === 404) {
            console.log("El team que buscas no exixte");

        } else {
            console.log("Hubo algun error y no se sabe que paso por el camino");
        }
        
    } catch (error) {
        console.log(error)
    }
}

function cargarIdTeam1(datosTeam) {
    document.querySelectorAll('#id_team').forEach((itemSelectGenero) => {
        console.log(datosTeam);
        datosTeam.forEach(itemTeam => {
            const item = document.createElement('option');
            item.value = itemTeam.id;
            item.innerHTML = itemTeam.id;
            itemSelectGenero.appendChild(item);
        });
    });
}
//---------------------------------------------------------------------------------------------

//creacion del metodo (POST) para ingresar informacion a la  API
//creamos la cabesera de los metodos
const myHeaders = new Headers({
    "Content-Type" : "application/json" //encabesado
});
const postReclutas = (datos) => {
    fetch(`${URL_API}reclutas`,
        {
            method : "POST",
            headers : myHeaders,
            body : JSON.stringify(datos)
        }
    ) .then(res => {
        return res.json();
    }) .then(res => {
        console.log(res);
    }) .catch(error => {
        console.log(error);
    })
}

//creacion del metodo (GET) para buscar un regitro en la API
const searchRecluta = (id) => {
    fetch(`${URL_API}reclutas/${id}`,
        {
            method : "GET",
            headers : myHeaders,
            //body : JSON.stringify(datos)
        }
    ) .then(res => {
        return res.json();
    }) .then(res => {
        console.log(res);
        llenarNuevoFrmReclutas(res);
        idEditar = res.id;
    }) .catch(error => {
        console.log(error);
    })
}
//creacion del metodo (PUT) para editar un regitro en la API
const putRecluta = (datos, id) => {
    fetch(`${URL_API}reclutas/${id}`,
        {
            method : "PUT",
            headers : myHeaders,
            body : JSON.stringify(datos)
        }
    ) .then(res => {
        return res.json();
    }) .then(res => {
        console.log(res);
    }) .catch(error => {
        console.log(error);
    })
}
//creacion del metodo (DELETE) para eliminar un regitro en la API
const deleteRecluta = (datos, id) => {
    fetch(`${URL_API}reclutas/${id}`,
        {
            method : "DELETE",
            headers : myHeaders,
            body : JSON.stringify(datos)
        }
    ) .then(res => {
        return res.json();
    }) .then(res => {
        console.log(res);
    }) .catch(error => {
        console.log(error);
    })
}

//estraemos los datos de la API, implemetamos el metodo (GET) para el Reclutas
async function getReclutas() {
    try {
        const response = await fetch(`${URL_API}reclutas`) //indicamos el endpoint que es /team (GET)
        console.log(response);

        if (response.status === 200) {
            const data = await response.json();
            verListarDatosReclutas(data);
            seleccionarTeamReclutas(data);
            verEdadReclutas(data);
            eliminarDatoRecluta(data);

        } else if (response.status === 401) {
            console.log("la lleve a la cual deseas ingresar esta mal escrita")

        } else if (response.status === 404) {
            console.log("El team que buscas no exixte");

        } else {
            console.log("Hubo algun error y no se sabe que paso por el camino");
        }
        
    } catch (error) {
        console.log(error)
    }
}

//------------------------guardar la informacion del RECLUTA------------------------------------
document.querySelector('#guardarRecluta').addEventListener('click', (e) => {
    const datos = Object.fromEntries(new FormData(frmDatosRecluta).entries()); //obtenemos la informacion del formulario para ser guardada en la API
    console.log(datos);
    postReclutas(datos);

    e.preventDefault();
});
//---------------------------------------------------------------------------------------------

//------------------------limpiar el formulario------------------------------------------------
document.querySelector('#nuevoRecluta').addEventListener('click', (e) => {
    for (let itemFrm of frmDatosRecluta) {
        
        if (itemFrm.id == 'id_team') {
            itemFrm.value = "Id TEAM";

        } else {
            itemFrm.value = '';
        }
    }
    e.preventDefault();
});
//---------------------------------------------------------------------------------------------

//------------------funcion para mostrar los Reclutas Registrados------------------------------
function verListarDatosReclutas(datosRecluta) {

    const cuerpoTabla = document.querySelector('#cuerpoTabla');
    datosRecluta.forEach((itemRecluta => {
        const crearFilas = document.createElement('tr');
        crearFilas.innerHTML = /* html */ `
            <td>${itemRecluta.id}</td>
            <td>${itemRecluta.id_team}</td>
            <td>${itemRecluta.nombre}</td>
            <td>${itemRecluta.edad}</td>
            <td>${itemRecluta.telefono}</td>
            <td>${itemRecluta.email}</td>
            <td>${itemRecluta.direccion}</td>
            <td>${itemRecluta.fechaNacimiento}</td>
            <td>${itemRecluta.numIdentificacion}</td>
            <td>${itemRecluta.fechaIngresoPrograma}</td>
            <td>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-warning editar" data-bs-toggle="modal" data-bs-target="#formularioReclutas1" id="${itemRecluta.id}">Editar</button>
            </td>
            <td>
                <button type="button" class="btn btn-info eliminar" id="${itemRecluta.id}">Eliminar</button>
            </td>
        `;
        cuerpoTabla.appendChild(crearFilas);
    }));
    buscarDatoRecluta();
}
//-----------------buscar reclutas segun al team que pertenecen--------------------------------------

function seleccionarTeamReclutas(datosRecluta) {
    const cuerpoTabla = document.querySelector('#bodyTabla');
    document.querySelector(".idTeam").addEventListener('change', (e) => {
        document.querySelector(".desabilitar").style.display = "block";

        let grupoRecluta = '';
        grupoRecluta = datosRecluta.filter((itemRecluta) => itemRecluta.id_team == e.target.value);
        //console.log(e.target.value)
        let reclutasHTML = '';
        grupoRecluta.forEach((itemRecluta => {
            
            reclutasHTML += /* html */ `
                <tr>
                    <td>${itemRecluta.id}</td>
                    <td>${itemRecluta.id_team}</td>
                    <td>${itemRecluta.nombre}</td>
                    <td>${itemRecluta.edad}</td>
                    <td>${itemRecluta.telefono}</td>
                    <td>${itemRecluta.email}</td>
                    <td>${itemRecluta.direccion}</td>
                    <td>${itemRecluta.fechaNacimiento}</td>
                    <td>${itemRecluta.numIdentificacion}</td>
                    <td>${itemRecluta.fechaIngresoPrograma}</td>
                </tr>
            `;
        }));
        cuerpoTabla.innerHTML = reclutasHTML;
        e.preventDefault();
    });
}
//--------------------------------------------------------------------------------------------

//---------------------buscar reclutas menores-----------------------------------------------
function verEdadReclutas(datosRecluta) {
    const cuerpoTabla = document.querySelector('#bodyTablaMenores');
    let grupoRecluta = '';
    grupoRecluta = datosRecluta.filter((itemRecluta) => itemRecluta.edad < 18);
    //console.log(grupoRecluta);
    let reclutasHTML = '';
    grupoRecluta.forEach((itemRecluta => {
        reclutasHTML += /* html */ `
            <tr>
                <td>${itemRecluta.id}</td>
                <td>${itemRecluta.id_team}</td>
                <td>${itemRecluta.nombre}</td>
                <td>${itemRecluta.edad}</td>
                <td>${itemRecluta.telefono}</td>
                <td>${itemRecluta.email}</td>
                <td>${itemRecluta.direccion}</td>
                <td>${itemRecluta.fechaNacimiento}</td>
                <td>${itemRecluta.numIdentificacion}</td>
                <td>${itemRecluta.fechaIngresoPrograma}</td>
            </tr>
        `;
    }));
    cuerpoTabla.innerHTML = reclutasHTML;
}
//--------------------------------------------------------------------------------------------

//-------------funcion para buscar el registro a editar de la base de datos----------------------
function buscarDatoRecluta() {
    document.querySelectorAll(".editar").forEach((datoRecluta) => {
        datoRecluta.addEventListener('click', (e) => {
            searchRecluta(e.target.id);

            e.preventDefault();
        });
    });
}
//llenamos el formulario del modal para ver los datos que se van a editar 
function llenarNuevoFrmReclutas(datosEditar) {
    //desestructuramos los datos a ingresar al formulario 
    const {nombre, edad, telefono, email, direccion, fechaNacimiento, numIdentificacion, fechaIngresoPrograma, id_team} = datosEditar;
    const frm = new FormData(frmDatosReclutasEditar);
    frm.set("nombre", nombre);
    frm.set("edad", edad);
    frm.set("telefono", telefono);
    frm.set("email", email);
    frm.set("direccion", direccion);
    frm.set("fechaNacimiento", fechaNacimiento);
    frm.set("numIdentificacion", numIdentificacion);
    frm.set("fechaIngresoPrograma", fechaIngresoPrograma);
    frm.set("id_team", id_team);

    //un ciclo for para rrecorre el frm, se itera a travès de los padres clave-valor de los datos
    for (let dato of frm.entries()) {
        //establece los valores correspondientes en el formulario para su llenado
        frmDatosReclutasEditar.elements[dato[0]].value = dato[1];
    }
}
//guardamos la informacion editada en la base de datos para este caso la API
document.querySelector(".botonn1").addEventListener('click', (e) => {
    const datoEditado = Object.fromEntries(new FormData(frmDatosReclutasEditar).entries());//objeto de datos del formulario editado 
    putRecluta(datoEditado, idEditar);

    e.preventDefault();
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//--------------funcion para elimianr un registro de la base de datos--------------------------
function eliminarDatoRecluta(datoEliminar) {
    document.querySelectorAll(".eliminar").forEach((boton) => {
        boton.addEventListener('click', (e) => {
            let eliminarDato = datoEliminar.find((itemEliminar) => itemEliminar.id == e.target.id);
            deleteRecluta(eliminarDato, eliminarDato.id)
    
            e.preventDefault();
        });
    });
}

