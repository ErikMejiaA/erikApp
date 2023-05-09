//iniciamos variables globales
const URL_API = 'http://localhost:3000/'; //url del servidor json server
const frmDatosRecluta = document.querySelector('#fromDatosRecluta');

document.addEventListener('DOMContentLoaded', () => {
    //aqui van las funciones que van a iniciar cuando se cargue el DOM

    getTeam();
    getReclutas();

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
            cargarIdTeam(data);

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

function cargarIdTeam(datosTeam) {
    const selectGenero = document.querySelector('#id_team');

    datosTeam.forEach(itemTeam => {
        //console.log(itemTeam.id)
        const item = document.createElement('option');
        item.value = itemTeam.id;
        item.innerHTML = itemTeam.id;
        selectGenero.appendChild(item);
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

//------------------funcion para mostrar los Reclutas Registrados---------------------------------
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
                <button type="button" class="btn btn-warning">Editar</button>
                <button type="button" class="btn btn-info">Eliminar</button>
            </td>
        `;
        cuerpoTabla.appendChild(crearFilas);
    }));
}
//--------------------------------------------------------------------------------------------

//---------------funcion para buscar que reclutas pertenecen a cada TEAM---------------------
//llenamos el select con la info de los TEAM registrados
function cargarIdTeam(datosTeam) {
    const selectGenero = document.querySelector('#id_team1');

    datosTeam.forEach(itemTeam => {
        //console.log(itemTeam.id)
        const item = document.createElement('option');
        item.value = itemTeam.id;
        item.innerHTML = itemTeam.id;
        selectGenero.appendChild(item);
    });
}

function seleccionarTeamReclutas(datosRecluta) {

    const cuerpoTabla = document.querySelector('#bodyTabla');
    
    document.querySelector('#id_team1').addEventListener('change', (e) => {
        document.querySelector(".desabilitar").style.display = "block";

        let grupoRecluta = '';
        grupoRecluta = datosRecluta.filter((itemRecluta) => itemRecluta.id_team == e.target.value);
        console.log(e.target.value)
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
    grupoRecluta = datosRecluta.filter((itemRecluta) => itemRecluta.edad <= 18);
    console.log(grupoRecluta);
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