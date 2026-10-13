
document.addEventListener("DOMContentLoaded", function () {
    // Mostrar automáticamente el año actual en el pie de página.
    const elementosAnio = document.querySelectorAll(".anio");
    const anioActual = new Date().getFullYear();

    elementosAnio.forEach(function (elemento) {
        elemento.textContent = anioActual;
    });

    // Búsqueda de productos: solo se ejecuta en la página que tiene buscador.
    const buscador = document.getElementById("buscador");
    const productos = document.querySelectorAll(".producto");
    const mensajeResultados = document.getElementById("resultado-busqueda");

    if (buscador && mensajeResultados) {
        function filtrarProductos() {
            const texto = buscador.value
                .trim()
                .toLocaleLowerCase("es");

            let visibles = 0;

            productos.forEach(function (producto) {
                const contenido = (
                    producto.textContent + " " +
                    (producto.dataset.nombre || "")
                ).toLocaleLowerCase("es");

                const coincide = contenido.includes(texto);

                producto.hidden = !coincide;

                if (coincide) {
                    visibles++;
                }
            });

            if (texto === "") {
                mensajeResultados.textContent =
                    "Se muestran todos los productos.";
            } else if (visibles === 0) {
                mensajeResultados.textContent =
                    "No se encontraron productos con ese término.";
            } else {
                mensajeResultados.textContent =
                    "Productos encontrados: " + visibles + ".";
            }
        }

        buscador.addEventListener("input", filtrarProductos);
        filtrarProductos();
    }
});
