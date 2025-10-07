// --- 1. INICIALIZACIÓN DEL MAPA ---
const map = L.map('map');
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// --- 2. BASE DE DATOS MASIVA DE GALICIA ---
const datosGalicia = {
    ciudades: {
        galicia: { nombre: "Toda Galicia", centro: [42.8, -8.0], zoom: 8 },
        acoruna: { nombre: "A Coruña", centro: [43.368, -8.411], zoom: 14 },
        ferrol: { nombre: "Ferrol", centro: [43.484, -8.234], zoom: 14 },
        lugo: { nombre: "Lugo", centro: [43.011, -7.556], zoom: 15 },
        ourense: { nombre: "Ourense", centro: [42.336, -7.863], zoom: 14 },
        pontevedra: { nombre: "Pontevedra", centro: [42.431, -8.647], zoom: 15 },
        santiago: { nombre: "Santiago de Compostela", centro: [42.88, -8.545], zoom: 15 },
        vigo: { nombre: "Vigo", centro: [42.237, -8.722], zoom: 14 }
    },
    bares: {
        lugo: [
            { nombre: "Mesón de Alberto", lat: 43.0118, lon: -7.5565, tapa: "Empanada gallega", cerveza: "estrella", valoracion: 4.6 },
            { nombre: "A Nosa Terra", lat: 43.0097, lon: -7.5569, tapa: "Pulpo á feira", cerveza: "estrella", valoracion: 4.4 },
            { nombre: "Bulló", lat: 43.008, lon: -7.558, tapa: "Gyozas de cocido", cerveza: "mahou", valoracion: 4.7 },
            { nombre: "La Tapería", lat: 43.0092, lon: -7.5555, tapa: "Tortilla de Betanzos", cerveza: "mahou", valoracion: 4.6 },
            { nombre: "María Castaña", lat: 43.0099, lon: -7.558, tapa: "Tosta de setas", cerveza: "aguila", valoracion: 4.7 }
        ],
        acoruna: [
            { nombre: "O Sampaio", lat: 43.369, lon: -8.409, tapa: "Tortilla de Betanzos", cerveza: "mahou", valoracion: 4.7 },
            { nombre: "Intenso", lat: 43.369, lon: -8.404, tapa: "Croquetas de centollo", cerveza: "aguila", valoracion: 4.7 },
            { nombre: "A Taberna de Cunqueiro", lat: 43.370, lon: -8.406, tapa: "Raxo con patatas", cerveza: "estrella", valoracion: 4.6 },
            { nombre: "Culuca", lat: 43.365, lon: -8.414, tapa: "Bomba de Valdeón", cerveza: "estrella", valoracion: 4.6 },
            { nombre: "A Mundiña", lat: 43.370, lon: -8.407, tapa: "Salpicón de marisco", cerveza: "estrella", valoracion: 4.5 }
        ],
        santiago: [
            { nombre: "Casa Marcelo", lat: 42.881, lon: -8.546, tapa: "Nigiri de vieira", cerveza: "estrella", valoracion: 4.7 },
            { nombre: "O Curro da Parra", lat: 42.882, lon: -8.546, tapa: "Ravioli de rabo", cerveza: "mahou", valoracion: 4.6 },
            { nombre: "O Dezaseis", lat: 42.882, lon: -8.542, tapa: "Pulpo con queso de tetilla", cerveza: "estrella", valoracion: 4.6 },
            { nombre: "Abastos 2.0", lat: 42.881, lon: -8.541, tapa: "Producto de mercado", cerveza: "aguila", valoracion: 4.5 },
            { nombre: "O Gato Negro", lat: 42.879, lon: -8.547, tapa: "Mejillones al vapor", cerveza: "estrella", valoracion: 4.5 }
        ],
        vigo: [
            { nombre: "Malasangre", lat: 42.237, lon: -8.725, tapa: "Gyozas de choco", cerveza: "aguila", valoracion: 4.8 },
            { nombre: "La Pizca", lat: 42.238, lon: -8.724, tapa: "Tosta de sardina ahumada", cerveza: "mahou", valoracion: 4.7 },
            { nombre: "El Capitán", lat: 42.240, lon: -8.725, tapa: "Navajas a la plancha", cerveza: "estrella", valoracion: 4.6 },
            { nombre: "Follas Novas", lat: 42.238, lon: -8.726, tapa: "Marisco de la ría", cerveza: "aguila", valoracion: 4.6 },
            { nombre: "Casa Vella", lat: 42.240, lon: -8.724, tapa: "Calamares de la ría", cerveza: "mahou", valoracion: 4.5 }
        ],
        ourense: [
            { nombre: "O Eironciño", lat: 42.335, lon: -7.862, tapa: "Tosta de pulpo y tetilla", cerveza: "aguila", valoracion: 4.7 },
            { nombre: "Tizar", lat: 42.338, lon: -7.866, tapa: "Croquetas de marisco", cerveza: "mahou", valoracion: 4.6 },
            { nombre: "A Taberna", lat: 42.337, lon: -7.863, tapa: "Oreja de cerdo", cerveza: "estrella", valoracion: 4.6 },
            { nombre: "La Gula", lat: 42.339, lon: -7.864, tapa: "Chipirones encebollados", cerveza: "mahou", valoracion: 4.5 },
            { nombre: "O Pote", lat: 42.336, lon: -7.864, tapa: "Setas a la plancha", cerveza: "mahou", valoracion: 4.5 }
        ],
        pontevedra: [
            { nombre: "A Ultramar", lat: 42.434, lon: -8.646, tapa: "Conservas gourmet", cerveza: "aguila", valoracion: 4.8 },
            { nombre: "Loaira Xantar", lat: 42.432, lon: -8.647, tapa: "Volandeira con ají", cerveza: "estrella", valoracion: 4.7 },
            { nombre: "O Furancho", lat: 42.433, lon: -8.645, tapa: "Tabla de quesos gallegos", cerveza: "estrella", valoracion: 4.6 },
            { nombre: "Bar Parvadas", lat: 42.433, lon: -8.647, tapa: "Mejillones tigre", cerveza: "aguila", valoracion: 4.6 },
            { nombre: "Casa Fidel", lat: 42.431, lon: -8.648, tapa: "Calamares fritos", cerveza: "mahou", valoracion: 4.5 }
        ],
        ferrol: [
            { nombre: "Josefa's Bar", lat: 43.482, lon: -8.237, tapa: "Tortilla jugosa", cerveza: "aguila", valoracion: 4.8 },
            { nombre: "O Camiño do Inglés", lat: 43.483, lon: -8.236, tapa: "Pescado del día", cerveza: "estrella", valoracion: 4.7 },
            { nombre: "A Gabeira", lat: 43.485, lon: -8.232, tapa: "Vieira a la gallega", cerveza: "estrella", valoracion: 4.6 },
            { nombre: "A Vella Fábrica de Lapis", lat: 43.481, lon: -8.240, tapa: "Sardinas lañadas", cerveza: "aguila", valoracion: 4.6 },
            { nombre: "Frank", lat: 43.484, lon: -8.235, tapa: "Hamburguesa gourmet", cerveza: "mahou", valoracion: 4.5 }
        ]
    }
};

// --- CÓDIGO NUEVO: CREA UNA LISTA CON ABSOLUTAMENTE TODOS LOS BARES ---
datosGalicia.bares.galicia = Object.values(datosGalicia.bares).flat();

let ciudadActual = 'galicia';

// --- 3. LÓGICA DE FILTRADO Y PINTADO ---
let markerGroup = L.layerGroup().addTo(map);
let routeLine = null; 

function displayData(baresFiltrados, esRuta = false) {
    markerGroup.clearLayers();
    if (routeLine) {
        map.removeLayer(routeLine);
        routeLine = null;
    }

    // --- LÓGICA DE MARCADORES MODIFICADA ---
    const iconoJarra = L.icon({
        iconUrl: 'img/icono_jarra.png',
        iconSize: [25, 41], // Tamaño estándar de un pin de Leaflet
        iconAnchor: [12, 41], // La punta del pin
        popupAnchor: [1, -34] // Desde donde sale el popup
    });

    baresFiltrados.forEach((bar, index) => {
        let marker;
        
        // Si estamos en la vista de "Toda Galicia", usamos siempre el icono de la jarra
        if (ciudadActual === 'galicia') {
            marker = L.marker([bar.lat, bar.lon], { icon: iconoJarra });
        }
        // Si estamos en una ciudad y es una ruta de cerveza, usamos el icono numerado
        else if (esRuta) {
            const jarraNumberIcon = L.divIcon({
                className: 'jarra-number-marker',
                html: `<img src="img/icono_jarra.png" alt="Jarra"> <span>${index + 1}</span>`,
                iconSize: [60, 35], iconAnchor: [30, 35], popupAnchor: [0, -35]
            });
            marker = L.marker([bar.lat, bar.lon], { icon: jarraNumberIcon });
        } else {
            // Si estamos en una ciudad pero sin filtrar, usamos el pin azul por defecto
            marker = L.marker([bar.lat, bar.lon]);
        }
        
        const googleMapsLink = `https://maps.google.com/?q=${bar.lat},${bar.lon}`;
        const popupContent = `<b>${bar.nombre}</b><br><strong>Tapa:</strong> ${bar.tapa}<br><i>${bar.direccion || ''}</i><br><a href="${googleMapsLink}" target="_blank" class="popup-link">Cómo llegar</a>`;
        marker.bindPopup(popupContent);
        markerGroup.addLayer(marker);
    });

    // Solo dibujamos la línea si es una ruta DENTRO de una ciudad
    if (baresFiltrados.length > 1 && esRuta && ciudadActual !== 'galicia') {
        const routeCoordinates = baresFiltrados.map(bar => [bar.lat, bar.lon]);
        
        routeLine = L.polyline(routeCoordinates, {
            color: '#FFC300',      
            weight: 5,         
            opacity: 0.9       
        }).addTo(map);

        map.fitBounds(routeLine.getBounds(), {padding: [50, 50]});
    }
}

// --- 4. GESTIÓN DE EVENTOS ---
const filterButtons = document.querySelectorAll('.filter-btn');
const citySelector = document.getElementById('city-selector');

function actualizarVista(ciudadId) {
    ciudadActual = ciudadId;
    const ciudad = datosGalicia.ciudades[ciudadActual];
    map.setView(ciudad.centro, ciudad.zoom);
    
    // Al cambiar de ciudad, siempre mostramos todos los bares SIN RUTA
    displayData(datosGalicia.bares[ciudadActual], false);
    
    filterButtons.forEach(btn => btn.classList.remove('active'));
    document.getElementById('todos').classList.add('active');
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filtroId = button.id;
        const baresDeLaVista = datosGalicia.bares[ciudadActual];
        let baresFiltrados = [];
        let esRuta = false;

        if (filtroId === 'todos') {
            baresFiltrados = baresDeLaVista;
            if (ciudadActual !== 'galicia') {
                const ciudad = datosGalicia.ciudades[ciudadActual];
                map.setView(ciudad.centro, ciudad.zoom);
            }
        } else if (filtroId === 'estrella' || filtroId === 'mahou' || filtroId === 'aguila') {
            baresFiltrados = baresDeLaVista
                .filter(bar => bar.cerveza === filtroId)
                .sort((a, b) => b.valoracion - a.valoracion);
            esRuta = true;
        }
        displayData(baresFiltrados, esRuta);
    });
});

citySelector.addEventListener('change', (event) => {
    actualizarVista(event.target.value);
});

// --- INICIO ---
// Al cargar la página, inicializamos la vista en "Toda Galicia"
actualizarVista('galicia');