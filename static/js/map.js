import { departamentos } from "../coordinates/departamentos.js";
import { municipios } from "../coordinates/municipios.js";

let map = L.map('map',).setView([5.32, -73.49], 7);

// Variable para controlar el estado de la tecla Ctrl
var ctrlPressed = false;

// Habilitar el scroll solo cuando se presiona Ctrl
document.addEventListener('keydown', function (e) {
    if (e.key === 'Control') {
        ctrlPressed = true;
        map.scrollWheelZoom.enable();
    }
});

document.addEventListener('keyup', function (e) {
    if (e.key === 'Control') {
        ctrlPressed = false;
        map.scrollWheelZoom.disable();
    }
});

// Configurar opciones de zoom del mapa
map.scrollWheelZoom.disable();  // Desactivar el zoom con scroll por defecto

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="<http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let puntosDeInteresGeoJSON = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": { name: municipios[0].features[0].properties.name },
            "geometry": {
                "coordinates": [
                    -73.457299,
                    5.354688
                ],
                "type": "Point"
            }
        }
    ]
}

let depa = document.getElementById('departamento');
let muni = document.getElementById('municipio');
muni.disabled = true; // deshabilitar select municipio

depa.addEventListener('blur', searchDepartamento);
muni.addEventListener('blur', searchMunicipio);

// Buscar municipios

function searchMunicipio() {
    for (let i = 0; i < municipios.length; i++) {
        const codMuni = parseInt(municipios[i].features[0].id);
        const codDepa = parseInt(municipios[i].features[0].properties.dpt);

        setTimeout(() => {
            if (parseInt(muni.value) === codMuni) {
                loadMunicipios(municipios[i], 'black');
                L.geoJSON(puntosDeInteresGeoJSON, function () {
                }).bindPopup(function (m) {
                    return `<p>${m.feature.properties.name}</p>
                    <a href="/detail/${codDepa}/${codMuni}">Información</a>`
                }).addTo(map).openPopup();
                setTimeout(() => {
                    cambiarZoom();
                }, 500);
            }
        }, 520);

    }

}

// Cargar Municipios

function loadMunicipios(municipio, color, fill = true) {
    L.geoJSON(municipio, {
        color: color,
        fill: fill
    }).bindPopup(function (prop) {
        return `${prop.feature.properties.name}`;
    }).addTo(map);
}


// Buscar departamentos
function searchDepartamento() {
    muni.disabled = true;
    for (let i = 0; i < departamentos.length; i++) {
        const codDepa = parseInt(departamentos[i].features[0].properties.DeCodigo)

        setTimeout(() => {
            if (parseInt(depa.value) === codDepa) {
                // Habilita select municipios
                muni.disabled = false;

                L.geoJSON(departamentos[i], {
                    color: 'blue',
                    fill: false
                }).addTo(map);
            }
        }, 520);
    }
}

// Cargar departamentos

function loadDepartamentos(departamento, color = 'none', fill = true) {
    L.geoJSON(departamento, {
        color: color,
        fill: fill
    }).bindPopup(function (depa) {
        return depa.feature.properties.DeNombre
    }).addTo(map);
}

loadDepartamentos(departamentos);

// Función para cambiar el zoom en el mapa
function cambiarZoom() {
    map.setView([5.354688, -73.457299], 12); // Cambiar el centro y zoom del mapa
}