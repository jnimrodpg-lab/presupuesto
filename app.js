// Variable para almacenar el inventario activo (sin descontinuados)
let inventarioLimpio = []; 

document.addEventListener("DOMContentLoaded", () => {
    // Datos de prueba iniciales para que pruebes la interfaz en Cloudflare
    // Cuando conectes tu API de Google Sheets, reemplazarás esto con un fetch(URL)
    inventarioLimpio = [
        { marca: "Marca A", modelo: "Casaca Urbana", colores: ["Blanco", "Negro", "Azul", "Rojo"], tallas: ["S", "M", "L"] },
        { marca: "Marca A", modelo: "Pantalón Cargo", colores: ["Negro", "Beige"], tallas: ["30", "32", "34"] },
        { marca: "Marca B", modelo: "Polo Básico", colores: ["Blanco", "Gris", "Negro"], tallas: ["M", "L"] }
    ];

    cargarMarcas();
});

function cargarMarcas() {
    const marcasUnicas = [...new Set(inventarioLimpio.map(item => item.marca))];
    const selectMarca = document.getElementById('select-marca');
    
    marcasUnicas.forEach(marca => {
        let option = document.createElement('option');
        option.value = marca;
        option.textContent = marca;
        selectMarca.appendChild(option);
    });
}

document.getElementById('select-marca').addEventListener('change', (e) => {
    const marcaSeleccionada = e.target.value;
    const selectModelo = document.getElementById('select-modelo');
    
    selectModelo.innerHTML = '<option value="">Selecciona un modelo...</option>';
    
    if (marcaSeleccionada) {
        const modelos = inventarioLimpio.filter(item => item.marca === marcaSeleccionada);
        modelos.forEach(item => {
            let option = document.createElement('option');
            option.value = item.modelo;
            option.textContent = item.modelo;
            selectModelo.appendChild(option);
        });
        
        selectModelo.disabled = false;
        selectModelo.classList.replace('bg-gray-200', 'bg-white');
    } else {
        selectModelo.disabled = true;
        selectModelo.classList.replace('bg-white', 'bg-gray-200');
        document.getElementById('resumen-variantes').classList.add('hidden');
        document.getElementById('seccion-cantidades').classList.add('hidden');
    }
});

document.getElementById('select-modelo').addEventListener('change', (e) => {
    const modeloSeleccionado = e.target.value;
    if (modeloSeleccionado) {
        const infoModelo = inventarioLimpio.find(item => item.modelo === modeloSeleccionado);
        
        document.getElementById('txt-tallas').textContent = infoModelo.tallas.join(", ");
        document.getElementById('txt-colores').textContent = infoModelo.colores.join(", ");
        document.getElementById('resumen-variantes').classList.remove('hidden');
        
        document.getElementById('seccion-cantidades').classList.remove('hidden');
        generarModoDetallado(infoModelo.colores);
    }
});

document.getElementById('btn-modo-basico').addEventListener('click', () => {
    document.getElementById('modo-basico').classList.remove('hidden');
    document.getElementById('modo-detallado').classList.add('hidden');
    
    const btnBasico = document.getElementById('btn-modo-basico');
    const btnDetallado = document.getElementById('btn-modo-detallado');
    
    btnBasico.classList.replace('bg-gray-200', 'bg-indigo-600');
    btnBasico.classList.replace('text-gray-700', 'text-white');
    btnDetallado.classList.replace('bg-indigo-600', 'bg-gray-200');
    btnDetallado.classList.replace('text-white', 'text-gray-700');
});

document.getElementById('btn-modo-detallado').addEventListener('click', () => {
    document.getElementById('modo-detallado').classList.remove('hidden');
    document.getElementById('modo-basico').classList.add('hidden');
    
    const btnBasico = document.getElementById('btn-modo-basico');
    const btnDetallado = document.getElementById('btn-modo-detallado');
    
    btnDetallado.classList.replace('bg-gray-200', 'bg-indigo-600');
    btnDetallado.classList.replace('text-gray-700', 'text-white');
    btnBasico.classList.replace('bg-indigo-600', 'bg-gray-200');
    btnBasico.classList.replace('text-white', 'text-gray-700');
});

function generarModoDetallado(colores) {
    const contenedor = document.getElementById('modo-detallado');
    contenedor.innerHTML = ''; 
    
    colores.forEach(color => {
        contenedor.innerHTML += `
            <div class="flex items-center justify-between">
                <span class="capitalize font-medium">${color}:</span>
                <input type="number" min="0" value="0" data-color="${color}" class="w-24 p-2 border border-gray-300 rounded text-center text-lg input-detallado">
            </div>
        `;
    });
}

document.getElementById('btn-guardar').addEventListener('click', () => {
    // Aquí irá la lógica POST para enviar las cantidades finales de vuelta a tu API
    alert('Cantidades listas para ser enviadas al presupuesto.');
});
