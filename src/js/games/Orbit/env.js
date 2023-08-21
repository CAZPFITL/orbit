//https://www.astronoo.com/es/articulos/caracteristicas-de-los-planetas.html

const CELESTIAL_BODIES = {
    SUN: {
        mass: 1.989e30, // kg
        density: 1410, // kg/m³
        color: '#FDB813',
        volume: 1.412e18, // km³
        radius: 696340, // km
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        rotationalVelocity: 0,
    },
    MERCURY: {
        mass: 3.285e23, // kg
        density: 5427, // kg/m³
        color: '#A5A5A5',
        volume: 6.085e10, // km³
        radius: 2439.8, // km
        x: 46001009, // km
        y: 0, // km
        vx: 0, // km/s
        // vy: 58.98, // km/s
        vy: 3 0.98, // km/s
        rotationalVelocity: 10.89, // km/h
    },
    // VENUS: {
    //     mass: 4.867e24, // kg
    //     density: 5243, // kg/m³
    //     color: '#E5CBA0',
    //     volume: 9.2843e11, // km³
    //     radius: 6051.8, // km
    //     x: 107476170, // km
    //     y: 0,
    //     vx: 0, // km/s
    //     vy: 35.02, // km/s
    //     rotationalVelocity: 6.52 // km/h
    // },
    // EARTH: {
    //     mass: 5.972e24, // kg
    //     density: 5515, // kg/m³
    //     color: '#2B70B0',
    //     volume: 1.08321e12, // km³
    //     radius: 6371, // km
    //     x: 149598262, // km
    //     y: 0,
    //     vx: 0, // km/s
    //     vy: 29.78, // km/s
    //     rotationalVelocity: 1674.4 // km/h
    // },
    // JUPITER: {
    //     mass: 1.898e27, // kg
    //     density: 1326, // kg/m³
    //     color: '#D4B87C',
    //     volume: 1.43128e15, // km³
    //     radius: 69911, // km
    //     x: 778369000, // km
    //     y: 0,
    //     vx: 0, // km/s
    //     vy: 13.06, // km/s
    //     rotationalVelocity: 45.98 // km/h
    // },
    // PLUTO: {
    //     mass: 1.309e22, // kg
    //     density: 2095, // kg/m³
    //     color: '#A8A8A8',
    //     volume: 6.39e9, // km³
    //     radius: 1188.3, // km
    //     x: 5906.4e6, // km
    //     y: 0,
    //     vx: 0, // km/s
    //     vy: 4.67, // km/s
    //     rotationalVelocity: 4718 // km/h
    // }
}

// Llamada a la API HORIZONS para obtener datos de un cuerpo celeste
async function getHorizonsData(i) {
    const apiUrl = `https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND='${99 + i}'&OBJ_DATA='YES'&MAKE_EPHEM='YES'&EPHEM_TYPE='OBSERVER'&CENTER='500@399'&START_TIME='2006-01-01'&STOP_TIME='2006-01-20'&STEP_SIZE='1%20d'&QUANTITIES='1,9,20,23,24,29'`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener datos de la API HORIZONS:', error);
        return null;
    }
}

// Función para actualizar los datos de un cuerpo celeste en CELESTIAL_BODIES
async function updateCelestialBodyData(celestialBodyKey, i) {
    const celestialBody = CELESTIAL_BODIES[celestialBodyKey];
    const horizonsData = await getHorizonsData(i);

    if (horizonsData) {
        // Actualizar los valores en CELESTIAL_BODIES con los datos obtenidos
        celestialBody.x = horizonsData[0].values[0][1];
        celestialBody.y = horizonsData[0].values[0][2];
        celestialBody.vx = horizonsData[0].values[0][3];
        celestialBody.vy = horizonsData[0].values[0][4];
        celestialBody.ax = horizonsData[0].values[0][5];
        celestialBody.ay = horizonsData[0].values[0][6];
    }
}

async function updateAllCelestialBodies() {
    let i = 0;
    for (const celestialBodyKey in CELESTIAL_BODIES) {
        if (CELESTIAL_BODIES.hasOwnProperty(celestialBodyKey)) {
            await updateCelestialBodyData(celestialBodyKey, i * 100);
        }
        i++;
    }
}

export {CELESTIAL_BODIES, updateAllCelestialBodies};