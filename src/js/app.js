let pagina = 1;

document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});

function iniciarApp() {
    mostrarServicios();

    // Resalta el div actual segun el tab al que se preciona
    mostrarSeccion();

    // Oculta o muestra una seccion segun el tab al que se preciona
    cambiarSeccion();
}

function mostrarSeccion() {
    const seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

    // Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${pagina}"]`);
    tab.classList.add('actual');
}

function cambiarSeccion() {
    const enlaces = document.querySelectorAll('.tabs button');

    enlaces.forEach( enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();
            pagina = parseInt(e.target.dataset.paso);

            // Eliminar mostar-seccion de la seccion anterior
            document.querySelector('.mostrar-seccion').classList.remove('mostrar-seccion');

            // Agrega mostar-seccion donde le dimos click
            const seccion = document.querySelector(`#paso-${pagina}`);
            seccion.classList.add('mostrar-seccion');

            // Elimina la clase de actual en el tag anterior
            document.querySelector('.tabs .actual').classList.remove('actual');

            // Agrega la clas de actual en el nuevo tag
            const tag = document.querySelector(`[data-paso="${pagina}"]`);
            tag.classList.add('actual');
        });
    });
}

async function mostrarServicios() {
    try {
        const resultado = await fetch('./servicios.json');
        const db = await resultado.json();

        const { servicios } = db;

        // Generando html
        servicios.forEach(servicio => {
            const { id, nombre, precio } = servicio;

            // DOM Scripting

            // Generando nombre servicio
            const nombreServicio = document.createElement('P');
            nombreServicio.textContent = nombre;
            nombreServicio.classList.add('nombre-servicio');

            // Generando precio servicio
            const precioServicio = document.createElement('P');
            precioServicio.textContent = `$ ${precio}`;
            precioServicio.classList.add('precio-servicio');

            // Generar div contenedor de servicio
            const servicioDiv = document.createElement('DIV');
            servicioDiv.classList.add('servicio');
            servicioDiv.dataset.idServicio = id;

            // Seleccionar un servicio para la cita
            servicioDiv.onclick = seleccionarServicio;

            // Inyectar nombre y precio al div del servicio
            servicioDiv.appendChild(nombreServicio);
            servicioDiv.appendChild(precioServicio);

            // Inyectarlo en el html
            document.querySelector('#servicios').appendChild(servicioDiv);
        });

    } catch (error) {
        console.error(error);
    }
}

function seleccionarServicio(e) {
    let elemento;
    // Forzar que el elemento al cual le damos click sea el DIV
    if(e.target.tagName === 'P') {
        elemento = e.target.parentElement;
    } else {
        element = e.target;
    }

    if(elemento.classList.contains('seleccionado')) {
        elemento.classList.remove('seleccionado');
    } else {
        elemento.classList.add('seleccionado');
    }
}