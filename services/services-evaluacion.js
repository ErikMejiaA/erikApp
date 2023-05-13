//iniciamos variables globales
const URL_API = 'http://localhost:3000/'; //url del servidor json server
const fromDatosEvaluacion = document.querySelector('#fromDatosEvaluacion');
const fromDatosEvaluacionEditar = document.querySelector('#fromDatosEvaluacion1');
let idEditar = 0;

document.addEventListener('DOMContentLoaded', () => {
    //aqui van las funciones que van a iniciar cuando se cargue el DOM

    getReclutas();
    getModuloSkill();
    getEvaluacion();

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

//-----------traemos el Id perteneciente al grupo del Recluta----------------------------------------
//estraemos los datos de la API, implemetamos el metodo (GET) para el TEAM
async function getReclutas() {
    try {
        const response = await fetch(`${URL_API}reclutas`) //indicamos el endpoint que es /team (GET)
        console.log(response);

        if (response.status === 200) {
            const data = await response.json();
            cargarIdRecluta(data);

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

function cargarIdRecluta(datosRecluta) {
    document.querySelectorAll('#id_recluta').forEach((selectGenero) => {
        datosRecluta.forEach(itenReclutas => {
            //console.log(itenReclutas.id)
            const item = document.createElement('option');
            item.value = itenReclutas.id;
            item.innerHTML = itenReclutas.id;
            selectGenero.appendChild(item);
        });
    });
}
//-----------------------------------------------------------------------------------

//-----------traemos el Id perteneciente al grupo del Modulo Skill----------------------------------------
//estraemos los datos de la API, implemetamos el metodo (GET) para el TEAM
async function getModuloSkill() {
    try {
        const response = await fetch(`${URL_API}moduloSkill`) //indicamos el endpoint que es /team (GET)
        console.log(response);

        if (response.status === 200) {
            const data = await response.json();
            cargarIdModulo(data);

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

function cargarIdModulo(datosModulo) {
    document.querySelectorAll('#id_modulo').forEach((selectGenero) => {
        datosModulo.forEach(itemModulo => {
            //console.log(itemModulo.id)
            const item = document.createElement('option');
            item.value = itemModulo.id;
            item.innerHTML = itemModulo.id;
            selectGenero.appendChild(item);
        });
    });
}
//-------------------------------------------------------------------------------------------

//creacion del metodo (POST) para ingresar informacion a la  API
//creamos la cabesera de los metodos
const myHeaders = new Headers({
    "Content-Type" : "application/json" //encabesado
});
const postEvaluacion = (datos) => {
    fetch(`${URL_API}evaluacion`,
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
const searchEvaluacion = (id) => {
    fetch(`${URL_API}evaluacion/${id}`,
        {
            method : "GET",
            headers : myHeaders,
            //body : JSON.stringify(datos)
        }
    ) .then(res => {
        return res.json();
    }) .then(res => {
        console.log(res);
        llenarNuevoFrmEvaluacion(res);
        idEditar = res.id;
    }) .catch(error => {
        console.log(error);
    })
}
//creacion del metodo (PUT) para editar un regitro en la API
const putEvaluacion = (datos, id) => {
    fetch(`${URL_API}evaluacion/${id}`,
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
const deleteEvaluacion = (datos, id) => {
    fetch(`${URL_API}evaluacion/${id}`,
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


//estraemos los datos de la API, implemetamos el metodo (GET) para la Evaluacion
async function getEvaluacion() {
    try {
        const response = await fetch(`${URL_API}evaluacion`) //indicamos el endpoint que es /team (GET)
        console.log(response);

        if (response.status === 200) {
            const data = await response.json();
            listarDatosEvaluacion(data);
            eliminarDatoEvaluacion(data);

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
document.querySelector('#guardarEvaluacion').addEventListener('click', (e) => {
    const datos = Object.fromEntries(new FormData(fromDatosEvaluacion).entries()); //obtenemos la informacion del formulario para ser guardada en la API
    console.log(datos);
    postEvaluacion(datos);

    e.preventDefault();
});
//---------------------------------------------------------------------------------------------

//------------------------limpiar el formulario------------------------------------------------
document.querySelector('#nuevoEvaluacion').addEventListener('click', (e) => {
    for (let itemFrm of fromDatosEvaluacion) {
        
        if (itemFrm.id == 'id_recluta') {
            itemFrm.value = "Id Recluta";

        } else if (itemFrm.id == 'id_modulo') {
            itemFrm.value = "Id Modulo";
        } else {
            itemFrm.value = '';
        }
        
    }
    e.preventDefault();
});
//---------------------------------------------------------------------------------------------

//------------------funcion para mostrar los Team Registrados---------------------------------
function listarDatosEvaluacion(datisEvaluacion) {

    const cuerpoTabla = document.querySelector('#cuerpoTabla');
    datisEvaluacion.forEach((itemEvaluacion => {
        const crearFilas = document.createElement('tr');
        crearFilas.innerHTML = /* html */ `
            <td>${itemEvaluacion.id}</td>
            <td>${itemEvaluacion.id_recluta}</td>
            <td>${itemEvaluacion.id_modulo}</td>
            <td>${itemEvaluacion.nota}</td>
            <td>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-warning editar" data-bs-toggle="modal" data-bs-target="#formularioEvaluacion1" id="${itemEvaluacion.id}">Editar</button>
            </td>
            <td>
                <button type="button" class="btn btn-info eliminar" id="${itemEvaluacion.id}">Eliminar</button>
            </td>
        `;
        cuerpoTabla.appendChild(crearFilas);
    }));

    buscarDatoEvaluacion()
}
//--------------------------------------------------------------------------------------------

//-------------funcion para buscar el registro a editar de la base de datos----------------------
function buscarDatoEvaluacion() {
    document.querySelectorAll(".editar").forEach((datoEvaluacion) => {
        datoEvaluacion.addEventListener('click', (e) => {
            searchEvaluacion(e.target.id);

            e.preventDefault();
        });
    });
}
//llenamos el formulario del modal para ver los datos que se van a editar 
function llenarNuevoFrmEvaluacion(datosEditar) {
    //desestructuramos los datos a ingresar al formulario 
    const {id_recluta, id_modulo, nota} = datosEditar;
    const frm = new FormData(fromDatosEvaluacionEditar);
    frm.set("id_recluta", id_recluta);
    frm.set("id_modulo", id_modulo);
    frm.set("nota", nota);

    //un ciclo for para rrecorre el frm, se itera a travès de los padres clave-valor de los datos
    for (let dato of frm.entries()) {
        //establece los valores correspondientes en el formulario para su llenado
        fromDatosEvaluacionEditar.elements[dato[0]].value = dato[1];
    }
}
//guardamos la informacion editada en la base de datos para este caso la API
document.querySelector(".botonn1").addEventListener('click', (e) => {
    const datoEditado = Object.fromEntries(new FormData(fromDatosEvaluacionEditar).entries());//objeto de datos del formulario editado 
    putEvaluacion(datoEditado, idEditar);

    e.preventDefault();
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//--------------funcion para elimianr un registro de la base de datos--------------------------
function eliminarDatoEvaluacion(datoEliminar) {
    document.querySelectorAll(".eliminar").forEach((boton) => {
        boton.addEventListener('click', (e) => {
            let eliminarDato = datoEliminar.find((itemEliminar) => itemEliminar.id == e.target.id);
            deleteEvaluacion(eliminarDato, eliminarDato.id)
    
            e.preventDefault();
        });
    });
}