//iniciamos variables globales
const URL_API = 'http://localhost:3000/'; //url del servidor json server
const frmDatosSkill = document.querySelector('#fromDatosSkill');
const frmDatosEditarSkill = document.querySelector('#fromDatosSkill1');
let idEditar = 0;

document.addEventListener('DOMContentLoaded', () => {
    //aqui van las funciones que van a iniciar cuando se cargue el DOM

    getSkill();

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

//creacion del metodo (POST) para ingresar informacion a la  API
//creamos la cabesera de los metodos
const myHeaders = new Headers({
    "Content-Type" : "application/json" //encabesado
});
const postSkill = (datos) => {
    fetch(`${URL_API}skill`,
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
const searchSkill = (id) => {
    fetch(`${URL_API}skill/${id}`,
        {
            method : "GET",
            headers : myHeaders,
            //body : JSON.stringify(datos)
        }
    ) .then(res => {
        return res.json();
    }) .then(res => {
        console.log(res);
        llenarNuevoFrmSkill(res);
        idEditar = res.id;
    }) .catch(error => {
        console.log(error);
    })
}
//creacion del metodo (PUT) para editar un regitro en la API
const putSkill = (datos, id) => {
    fetch(`${URL_API}skill/${id}`,
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
const deleteSkill = (datos, id) => {
    fetch(`${URL_API}skill/${id}`,
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

//estraemos los datos de la API, implemetamos el metodo (GET) para el SKILL
async function getSkill() {
    try {
        const response = await fetch(`${URL_API}skill`) //indicamos el endpoint que es /skill (GET)
        console.log(response);

        if (response.status === 200) {
            const data = await response.json();
            verListaSkill(data);
            eliminarSkill(data);

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
document.querySelector('#guardarSkill').addEventListener('click', (e) => {
    const datos = Object.fromEntries(new FormData(frmDatosSkill).entries()); //obtenemos la informacion del formulario para ser guardada en la API
    console.log(datos);
    postSkill(datos);

    e.preventDefault();
});
//---------------------------------------------------------------------------------------------

//------------------------limpiar el formulario------------------------------------------------
document.querySelector('#nuevoSkill').addEventListener('click', (e) => {
    for (let itemFrm of frmDatosSkill) {

        itemFrm.value = '';
    }

    e.preventDefault();
});
//---------------------------------------------------------------------------------------------

//------------------funcion para mostrar los Skill Registrados---------------------------------
function verListaSkill(datosSkill) {

    const cuerpoTabla = document.querySelector('#cuerpoTabla');
    datosSkill.forEach((itemSkill => {
        const crearFilas = document.createElement('tr');
        crearFilas.innerHTML = /* html */ `
            <td>${itemSkill.id}</td>
            <td>${itemSkill.nombre}</td>
            <td>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-warning editar" data-bs-toggle="modal" data-bs-target="#formularioSkill1" id="${itemSkill.id}">Editar</button>
            </td>
            <td>
                <button type="button" class="btn btn-info eliminar" id="${itemSkill.id}">Eliminar</button>
            </td>
        `;
        cuerpoTabla.appendChild(crearFilas);
    }));

    buscarDatoRecluta();
}
//--------------------------------------------------------------------------------------------

//-------------funcion para buscar el registro a editar de la base de datos----------------------
function buscarDatoRecluta() {
    document.querySelectorAll(".editar").forEach((datoSkill) => {
        datoSkill.addEventListener('click', (e) => {
            searchSkill(e.target.id);

            e.preventDefault();
        });
    });
}
//llenamos el formulario del modal para ver los datos que se van a editar 
function llenarNuevoFrmSkill(datosEditar) {
    //desestructuramos los datos a ingresar al formulario 
    const {nombre} = datosEditar;
    const frm = new FormData(frmDatosEditarSkill);
    frm.set("nombre", nombre);

    //un ciclo for para rrecorre el frm, se itera a travès de los padres clave-valor de los datos
    for (let dato of frm.entries()) {
        //establece los valores correspondientes en el formulario para su llenado
        frmDatosEditarSkill.elements[dato[0]].value = dato[1];
    }
}
//guardamos la informacion editada en la base de datos para este caso la API
document.querySelector(".botonn1").addEventListener('click', (e) => {
    const datoEditado = Object.fromEntries(new FormData(frmDatosEditarSkill).entries());//objeto de datos del formulario editado 
    putSkill(datoEditado, idEditar);

    e.preventDefault();
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//--------------funcion para elimianr un registro de la base de datos--------------------------
function eliminarSkill(datoEliminar) {
    document.querySelectorAll(".eliminar").forEach((boton) => {
        boton.addEventListener('click', (e) => {
            let eliminarDato = datoEliminar.find((itemEliminar) => itemEliminar.id == e.target.id); //datos a elimiar
            deleteSkill(eliminarDato, eliminarDato.id)
    
            e.preventDefault();
        });
    });
}