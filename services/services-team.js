//iniciamos variables globales
const URL_API = 'http://localhost:3000/'; //url del servidor json server
const frmDatosTeam = document.querySelector('#fromDatosTeam');//formulario principal
const frmEditar = document.querySelector('#fromDatosTeam1'); //nuevo formulario modal
let idEditar = 0;

document.addEventListener('DOMContentLoaded', () => {
    //aqui van las funciones que van a iniciar cuando se cargue el DOM

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

//funcion para activar y desaptivar los botones del formulario
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

//creacion del metodo (POST) para ingresar informacion a la  API
//creamos la cabesera de los metodos
const myHeaders = new Headers({
    "Content-Type": "application/json" //encabesado
});
const postTeam = (datos) => {
    fetch(`${URL_API}team`,
        {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)

        }
    ).then(res => {
        return res.json();
    }).then(res => {

        console.log(res);
    }).catch(error => {
        console.log(error);
    })
}

//creacion del metodo (DELETE) para eliminar un dato de la  API
const deleteTeam = (datos, id) => {
    fetch(`${URL_API}team/${id}`,
        {
            method: "DELETE",
            headers: myHeaders,
            body: JSON.stringify(datos)

        }
    ).then(res => {
        return res.json();
    }).then(res => {

        console.log(res);
    }).catch(error => {
        console.log(error);
    })
}

//creacion del metodo (GET) para traer un dato de la  API para poder editarlo
const searchTeam = (id) => {
    fetch(`${URL_API}team/${id}`,
        {
            method: "GET",
            headers: myHeaders,
            //body: JSON.stringify(datos)

        }
    ).then(res => {
        return res.json();
    }).then(res => {
        console.log(res);
        llenarNuevoFormulario(res);
        idEditar = res.id;
    }).catch(error => {
        console.log(error);
    })
}

//creacion del metodo (PUT) para editar un dato de la  API (funcion tipo flecha)
const putTeam = (datos, id) => {
    fetch(`${URL_API}team/${id}`,
        {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(datos)

        }
    ).then(res => {
        return res.json();
    }).then(res => {
        console.log(res);
    }).catch(error => {
        console.log(error);
    })
}

//estraemos los datos de la API, implemetamos el metodo (GET) para el TEAM
async function getTeam() {
    try {
        const response = await fetch(`${URL_API}team`) //indicamos el endpoint que es /team (GET)
        console.log(response);

        if (response.status === 200) {
            const data = await response.json();
            verDatosTeam(data);
            eliminarDatosTeam(data);

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

//------------------------guardar la informacion del TEAM-------------------------------------
document.querySelector('#guardarTeam').addEventListener('click', (e) => {
    const datos = Object.fromEntries(new FormData(frmDatosTeam).entries()); //datos del formulario para ser guardada en la API
    console.log(datos);
    postTeam(datos);
    
    e.preventDefault();
});
//---------------------------------------------------------------------------------------------

//------------------------limpiar el formulario------------------------------------------------
document.querySelector('#nuevoTeam').addEventListener('click', (e) => {
    for (let itemFrm of frmDatosTeam) {
        itemFrm.value = '';
    }
    e.preventDefault();
});
//---------------------------------------------------------------------------------------------

//------------------funcion para mostrar los Team Registrados---------------------------------
function verDatosTeam(datosTeam) {

    const cuerpoTabla = document.querySelector('#cuerpoTabla');
    datosTeam.forEach((itemTeam => {
        const crearFilas = document.createElement('tr');
        crearFilas.innerHTML = /* html */ `
            <td>${itemTeam.id}</td>
            <td>${itemTeam.nombre}</td>
            <td>${itemTeam.trainerAsociado}</td>
            <td>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-warning editar" data-bs-toggle="modal" data-bs-target="#formularioTeam1" id="${itemTeam.id}">Editar</button>
            </td>
            <td>
                <button type="button" class="btn btn-info eliminar" id="${itemTeam.id}">Eliminar</button>
            </td>
        `;
        cuerpoTabla.appendChild(crearFilas);
       
    }));
    cargarNuevoFormularioEditar();
}
//--------------------------------------------------------------------------------------------

//-------------------------funcion para eliminar un registro----------------------------------
function eliminarDatosTeam(eliminarDato) {
    document.querySelectorAll(".eliminar").forEach(botonEliminar => {
        botonEliminar.addEventListener('click', (e) => {
            console.log(e.target.id);
            let dataTeam = eliminarDato.find((datoTeam) => datoTeam.id == e.target.id)
            console.log(dataTeam.id);
            deleteTeam(dataTeam, dataTeam.id);

            e.preventDefault();
        });
    });
}

//----funcion para buscar un registro de la base de datos, para poder editar---------------------
function cargarNuevoFormularioEditar() {
    document.querySelectorAll(".editar").forEach((dataEditar) => {
        dataEditar.addEventListener('click', (e) => {
            searchTeam(e.target.id);

            e.preventDefault();
        });
    });
}
//--------------------funcion para llenar el nuevo formulario------------------------------------
function llenarNuevoFormulario(dataeditarTeam) {
    //desestructuramos el formulario
    const {nombre, trainerAsociado} = dataeditarTeam;
    const frm = new FormData(frmEditar);
    frm.set("nombre", nombre);
    frm.set("trainerAsociado", trainerAsociado);

    //se itera a travès de los padres clave-valor de los datos
    for (let dato of frm.entries()) {
        //establece los valores correspondientes en el formulario
        frmEditar.elements[dato[0]].value = dato[1];
    }
}
//------------------funcion para guardar los datos editados---------------------------------------
document.querySelector(".botonn1").addEventListener('click', (e) => {
    const datos = Object.fromEntries(new FormData(frmEditar).entries()); //obtener los datos del frm en un objeto
    putTeam(datos, idEditar);

    e.preventDefault();
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++