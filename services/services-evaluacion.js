//iniciamos variables globales
const URL_API = 'http://localhost:3000/'; //url del servidor json server
const fromDatosEvaluacion = document.querySelector('#fromDatosEvaluacion');

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
    const selectGenero = document.querySelector('#id_recluta');

    datosRecluta.forEach(itenReclutas => {
        //console.log(itenReclutas.id)
        const item = document.createElement('option');
        item.value = itenReclutas.id;
        item.innerHTML = itenReclutas.id;
        selectGenero.appendChild(item);
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
    const selectGenero = document.querySelector('#id_modulo');

    datosModulo.forEach(itemModulo => {
        //console.log(itemModulo.id)
        const item = document.createElement('option');
        item.value = itemModulo.id;
        item.innerHTML = itemModulo.id;
        selectGenero.appendChild(item);
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

//estraemos los datos de la API, implemetamos el metodo (GET) para la Evaluacion
async function getEvaluacion() {
    try {
        const response = await fetch(`${URL_API}evaluacion`) //indicamos el endpoint que es /team (GET)
        console.log(response);

        if (response.status === 200) {
            const data = await response.json();
            listarDatosEvaluacion(data);

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
                <button type="button" class="btn btn-warning">Editar</button>
                <button type="button" class="btn btn-info">Eliminar</button>
            </td>
        `;
        cuerpoTabla.appendChild(crearFilas);
    }));
}
//--------------------------------------------------------------------------------------------