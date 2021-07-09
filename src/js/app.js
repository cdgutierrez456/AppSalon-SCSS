
document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});

function iniciarApp() {
    mostrarServicios();
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