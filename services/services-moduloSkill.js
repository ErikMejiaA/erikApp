//iniciamos variables globales
const URL_API = 'http://localhost:3000/'; //url del servidor json server
const fromDatosModuloSkill = document.querySelector('#fromDatosModuloSkill');
const frmDatosModuloSkillEditar = document.querySelector('#fromDatosModuloSkill1');
let idEditar = 0;

document.addEventListener('DOMContentLoaded', () => {
    //aqui van las funciones que van a iniciar cuando se cargue el DOM

    getModuloSkill();
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

//-----------traemos el Id perteneciente al grupo del SKILL----------------------------------------
//estraemos los datos de la API, implemetamos el metodo (GET) para el SKILL
async function getSkill() {
    try {
        const response = await fetch(`${URL_API}skill`) //indicamos el endpoint que es /skill (GET)
        console.log(response);

        if (response.status === 200) {
            const data = await response.json();
            cargarIdSkill(data);

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

function cargarIdSkill(datosSkill) {
    document.querySelectorAll('#id_skill').forEach((selectGenero) => {
        datosSkill.forEach(itemSkill => {
            //console.log(itemSkill.id)
            const item = document.createElement('option');
            item.value = itemSkill.id;
            item.innerHTML = itemSkill.id;
            selectGenero.appendChild(item);
        });
    });
}
//---------------------------------------------------------------------------------------------

//creacion del metodo (POST) para ingresar informacion a la  API
//creamos la cabesera de los metodos
const myHeaders = new Headers({
    "Content-Type" : "application/json" //encabesado
});
const postModuloSkill = (datos) => {
    fetch(`${URL_API}moduloSkill`,
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
const searchModuloSkill = (id) => {
    fetch(`${URL_API}moduloSkill/${id}`,
        {
            method : "GET",
            headers : myHeaders,
            //body : JSON.stringify(datos)
        }
    ) .then(res => {
        return res.json();
    }) .then(res => {
        console.log(res);
        llenarNuevoFrmModuloSkill(res);
        idEditar = res.id;
    }) .catch(error => {
        console.log(error);
    })
}
//creacion del metodo (PUT) para editar un regitro en la API
const putModuloSkill = (datos, id) => {
    fetch(`${URL_API}moduloSkill/${id}`,
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
const deleteModuloSkill = (datos, id) => {
    fetch(`${URL_API}moduloSkill/${id}`,
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

//estraemos los datos de la API, implemetamos el metodo (GET) para el MODULO SKILL
async function getModuloSkill() {
    try {
        const response = await fetch(`${URL_API}moduloSkill`) //indicamos el endpoint que es /team (GET)
        console.log(response);

        if (response.status === 200) {
            const data = await response.json();
            listarDatosModuloSkill(data);
            eliminarDatoModuloSkill(data);

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

//------------------------guardar la informacion del MODULO SKILL-------------------------------------
document.querySelector('#guardarModuloSkill').addEventListener('click', (e) => {
    const datos = Object.fromEntries(new FormData(fromDatosModuloSkill).entries()); //obtenemos la informacion del formulario para ser guardada en la API
    console.log(datos);
    postModuloSkill(datos);

    e.preventDefault();
});
//---------------------------------------------------------------------------------------------

//------------------------limpiar el formulario------------------------------------------------
document.querySelector('#nuevoModuloSkill').addEventListener('click', (e) => {
    for (let itemFrm of fromDatosModuloSkill) {
        
        if (itemFrm.id == 'id_skill') {
            itemFrm.value = "Id SKILL";

        } else {
            itemFrm.value = '';
        }
        
    }
    e.preventDefault();
});
//---------------------------------------------------------------------------------------------

//------------------funcion para mostrar los MODULOS SKILL Registrados---------------------------------
function listarDatosModuloSkill(datosModuloSkill) {

    const cuerpoTabla = document.querySelector('#cuerpoTabla');
    datosModuloSkill.forEach((itemModuloSkill => {
        const crearFilas = document.createElement('tr');
        crearFilas.innerHTML = /* html */ `
            <td>${itemModuloSkill.id}</td>
            <td>${itemModuloSkill.id_skill}</td>
            <td>${itemModuloSkill.nombre}</td>
            <td>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-warning editar" data-bs-toggle="modal" data-bs-target="#formularioModuloSkill1" id="${itemModuloSkill.id}">Editar</button>
            </td>
            <td>
                <button type="button" class="btn btn-info eliminar" id="${itemModuloSkill.id}">Eliminar</button>
            </td>
        `;
        cuerpoTabla.appendChild(crearFilas);
    }));

    buscarDatoaModuloSkill();
}
//--------------------------------------------------------------------------------------------

//-------------funcion para buscar el registro a editar de la base de datos----------------------
function buscarDatoaModuloSkill() {
    document.querySelectorAll(".editar").forEach((datoModulo) => {
        datoModulo.addEventListener('click', (e) => {
            searchModuloSkill(e.target.id);

            e.preventDefault();
        });
    });
}
//llenamos el formulario del modal para ver los datos que se van a editar 
function llenarNuevoFrmModuloSkill(datosEditar) {
    //desestructuramos los datos a ingresar al formulario 
    const {nombre, id_skill} = datosEditar;
    const frm = new FormData(frmDatosModuloSkillEditar);
    frm.set("nombre", nombre);
    frm.set("id_skill", id_skill);

    //un ciclo for para rrecorre el frm, se itera a travès de los padres clave-valor de los datos
    for (let dato of frm.entries()) {
        //establece los valores correspondientes en el formulario para su llenado
        frmDatosModuloSkillEditar.elements[dato[0]].value = dato[1];
    }
}
//guardamos la informacion editada en la base de datos para este caso la API
document.querySelector(".botonn1").addEventListener('click', (e) => {
    const datoEditado = Object.fromEntries(new FormData(frmDatosModuloSkillEditar).entries());//objeto de datos del formulario editado 
    putModuloSkill(datoEditado, idEditar);

    e.preventDefault();
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//--------------funcion para elimianr un registro de la base de datos--------------------------
function eliminarDatoModuloSkill(datoEliminar) {
    document.querySelectorAll(".eliminar").forEach((boton) => {
        boton.addEventListener('click', (e) => {
            let eliminarDato = datoEliminar.find((itemEliminar) => itemEliminar.id == e.target.id);
            deleteModuloSkill(eliminarDato, eliminarDato.id)
    
            e.preventDefault();
        });
    });
}
