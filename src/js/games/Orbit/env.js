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
        vy: 58.98, // km/s
        rotationalVelocity: 10.89, // km/h
        semiMajorAxis: 57909227, // km (a)
        eccentricity: 0.2056,    // e
        longitudeOfNode: 48.331, // Ω
        argumentOfPeriapsis: 29.124, // ω
        meanAnomaly: 174.796,   // M
        periapsis: 46001009,    // P
        apoapsis: 69817445      // A
    },
    // VENUS: {
    //     mass: 4.867e24, // kg
    //     density: 5243, // kg/m³
    //     color: '#E5CBA0',
    //     volume: 9.2843e11, // km³
    //     radius: 6051.8, // km
    //     Q: 108900000,
    //     q: 67200000,
    //     x: 67200000, // km
    //     y: 0,
    //     vx: 0, // km/s
    //     vy: 35.02, // km/s
    //     rotationalVelocity: 6.52 // km/h
    // },
    // EARTH: {
    //     mass: 5.972e24, // kg
    //     density: 5515, // kg/m³
    //     color: '#3E70B2',
    //     volume: 1.08321e12, // km³
    //     radius: 6371, // km
    //     x: 149.6e6, // km
    //     y: 0,
    //     vx: 0, // km/s
    //     vy: 29.78, // km/s
    //     rotationalVelocity: 1670, // km/h
    //     // satellites: {
    //     //     MOON: {
    //     //         mass: 7.348e22, // kg
    //     //         density: 3340, // kg/m³
    //     //         color: '#D7D7D7',
    //     //         volume: 2.1968e10, // km³
    //     //         radius: 1737.5, // km
    //     //         x: 149.6e6 + 384400, // km
    //     //         y: 0,
    //     //         vx: 0, // km/s
    //     //         vy: 29.78 + 1.02, // km/s
    //     //         rotationalVelocity: 0 // km/h
    //     //     },
    //     // },
    //     // artificialSatellites : {
    //     //     ISS: {
    //     //         mass: 419455,
    //     //         density: 0,
    //     //         color: '#FFFFFF',
    //     //         volume: 0,
    //     //         radius: 9,
    //     //         x: 149.6e6 + 6371 + 400,
    //     //         y: 0,
    //     //         vx: 0,
    //     //         vy: 29.78 + 7.66,
    //     //         rotationalVelocity: 0,
    //     //         isArtificial: true
    //     //     },
    //     //     HUBBLE: {
    //     //         mass: 11110,
    //     //         density: 0,
    //     //         color: '#A8A8A8',
    //     //         volume: 0,
    //     //         radius: 13.3,
    //     //         x: 149.6e6 + 6371 + 530,
    //     //         y: 0,
    //     //         vx: 0, // km/s (aproximadamente) - velocidad orbital
    //     //         vy: 29.78 + 7.45, // km/s (aproximadamente) - velocidad orbital
    //     //         rotationalVelocity: 0 // No tiene rotación
    //     //     },
    //     // }
    // },
    // MARS: {
    //     mass: 6.39e23, // kg
    //     density: 3933, // kg/m³
    //     color: '#D18F77',
    //     volume: 1.6318e11, // km³
    //     radius: 3389.5, // km
    //     x: 227.9e6, // km
    //     y: 0,
    //     vx: 0, // km/s
    //     vy: 24.077, // km/s
    //     rotationalVelocity: 868.22, // km/h
    //     // moons: {
    //     //     PHOBOS: {
    //     //         mass: 1.08e16, // kg
    //     //         density: 1876, // kg/m³
    //     //         color: '#A8A8A8',
    //     //         volume: 5.8e6, // km³
    //     //         radius: 11.1, // km
    //     //         x: 227.9e6 + 9377, // km
    //     //         y: 0,
    //     //         vx: 0, // km/s
    //     //         vy: 24.077 + 2.138, // km/s
    //     //         rotationalVelocity:  0 // km/h
    //     //     },
    //     //     DEIMOS: {
    //     //         mass: 1.8e15, // kg
    //     //         density: 1471, // kg/m³
    //     //         color: '#A8A8A8',
    //     //         volume: 1.48e6, // km³
    //     //         radius: 6.2, // km
    //     //         x: 227.9e6 + 23460, // km
    //     //         y: 0,
    //     //         vx: 0, // km/s
    //     //         vy: 24.077 + 1.3513, // km/s
    //     //         rotationalVelocity:  0 // km/h
    //     //     }
    //     // }
    // },
    // JUPITER: {
    //     mass: 1.898e27, // kg
    //     density: 1326, // kg/m³
    //     color: '#E8BC7D',
    //     volume: 1.43128e15, // km³
    //     radius: 69911, // km
    //     x: 778.3e6, // km
    //     y: 0,
    //     vx: 0, // km/s
    //     vy: 13.07, // km/s
    //     rotationalVelocity: 45300, // km/h
    //     // moons: {
    //     //     IO: {
    //     //         mass: 8.93e22, // kg
    //     //         density: 3530, // kg/m³
    //     //         color: '#FFE4C4',
    //     //         volume: 2.53e10, // km³
    //     //         radius: 1821.6, // km
    //     //         x: 778.3e6 + 420000, // km
    //     //         y: 0,
    //     //         vx: 0, // km/s
    //     //         vy: 13.07 + 17.334, // km/s
    //     //         rotationalVelocity: 0 // km/h
    //     //     },
    //     //     EUROPA: {
    //     //         mass: 4.8e22, // kg
    //     //         density: 3010, // kg/m³
    //     //         color: '#EEDD82',
    //     //         volume: 1.59e10, // km³
    //     //         radius: 1560.8, // km
    //     //         x: 778.3e6 + 671034, // km
    //     //         y: 0,
    //     //         vx: 0, // km/s
    //     //         vy: 13.07 + 13.74, // km/s
    //     //         rotationalVelocity: 0 // km/h
    //     //     },
    //     //     GANYMEDE: {
    //     //         mass: 1.48e23, // kg
    //     //         density: 1940, // kg/m³
    //     //         color: '#98FB98',
    //     //         volume: 7.67e10, // km³
    //     //         radius: 2631.2, // km
    //     //         x: 778.3e6 + 1070412, // km
    //     //         y: 0,
    //     //         vx: 0, // km/s
    //     //         vy: 13.07 + 10.88, // km/s
    //     //         rotationalVelocity: 0 // km/h
    //     //     },
    //     //     CALLISTO: {
    //     //         mass: 1.08e23, // kg
    //     //         density: 1830, // kg/m³
    //     //         color: '#FFE4B5',
    //     //         volume: 5.94e10, // km³
    //     //         radius: 2410.3, // km
    //     //         x: 778.3e6 + 1882709, // km
    //     //         y: 0,
    //     //         vx: 0, // km/s
    //     //         vy: 13.07 + 8.204, // km/s
    //     //         rotationalVelocity: 0 // km/h
    //     //     }
    //     // }
    // },
    // SATURN: {
    //     mass: 5.683e26, // kg
    //     density: 687, // kg/m³
    //     color: '#E3CBA0',
    //     volume: 8.2713e14, // km³
    //     radius: 58232, // km
    //     x: 1427e6, // km
    //     y: 0,
    //     vx: 0, // km/s
    //     vy: 9.68, // km/s
    //     rotationalVelocity: 35500, // km/h
    //     // moons: {
    //     //     MIMAS: {
    //     //         mass: 3.75e19, // kg
    //     //         density: 1153, // kg/m³
    //     //         color: '#A8A8A8',
    //     //         volume: 4.02e6, // km³
    //     //         radius: 198.2, // km
    //     //         x: 1427e6 + 185539, // km
    //     //         y: 0,
    //     //         vx: 0, // km/s
    //     //         vy: 9.68 + 14.32, // km/s
    //     //         rotationalVelocity: 0 // km/h
    //     //     },
    //     //     ENCELADUS: {
    //     //         mass: 1.08e20, // kg
    //     //         density: 1610, // kg/m³
    //     //         color: '#A8A8A8',
    //     //         volume: 6.71e7, // km³
    //     //         radius: 252.1, // km
    //     //         x: 1427e6 + 237950, // km
    //     //         y: 0,
    //     //         vx: 0, // km/s
    //     //         vy: 9.68 + 12.63, // km/s
    //     //         rotationalVelocity: 0 // km/h
    //     //     },
    //     //     TITAN: {
    //     //         mass: 1.34e23, // kg
    //     //         density: 1882, // kg/m³
    //     //         color: '#A8A8A8',
    //     //         volume: 7.16e10, // km³
    //     //         radius: 2575, // km
    //     //         x: 1427e6 + 1221865, // km
    //     //         y: 0,
    //     //         vx: 0, // km/s
    //     //         vy: 9.68 + 5.57, // km/s
    //     //         rotationalVelocity: 0 // km/h
    //     //     }
    //     // }
    // },
    // URANUS: {
    //     mass: 8.681e25, // kg
    //     density: 1271, // kg/m³
    //     color: '#A8E1E8',
    //     volume: 6.833e13, // km³
    //     radius: 25362, // km
    //     x: 2871e6, // km
    //     y: 0,
    //     vx: 0, // km/s
    //     vy: 6.80, // km/s
    //     rotationalVelocity: 9925, // km/h
    //     // moons: {
    //     //     TITANIA: {
    //     //         mass: 3.527e21, // kg
    //     //         density: 1680, // kg/m³
    //     //         color: '#A8A8A8',
    //     //         volume: 2.06e9, // km³
    //     //         radius: 788.9, // km
    //     //         x: 2871e6 + 436300, // km
    //     //         y: 0,
    //     //         vx: 0, // km/s
    //     //         vy: 6.80 + 3.87, // km/s
    //     //         rotationalVelocity: 0 // km/h
    //     //     },
    //     //     OBERON: {
    //     //         mass: 3.014e21, // kg
    //     //         density: 1610, // kg/m³
    //     //         color: '#A8A8A8',
    //     //         volume: 1.85e9, // km³
    //     //         radius: 761.4, // km
    //     //         x: 2871e6 + 583520, // km
    //     //         y: 0,
    //     //         vx: 0, // km/s
    //     //         vy: 6.80 + 2.58, // km/s
    //     //         rotationalVelocity: 0 // km/h
    //     //     },
    //     //     UMBRIEL: {
    //     //         mass: 1.275e21, // kg
    //     //         density: 1390, // kg/m³
    //     //         color: '#A8A8A8',
    //     //         volume: 1.17e9, // km³
    //     //         radius: 584.7, // km
    //     //         x: 2871e6 + 266000, // km
    //     //         y: 0,
    //     //         vx: 0, // km/s
    //     //         vy: 6.80 + 3.15, // km/s
    //     //         rotationalVelocity: 0 // km/h
    //     //     },
    //     //     ARIEL: {
    //     //         mass: 1.353e21, // kg
    //     //         density: 1590, // kg/m³
    //     //         color: '#A8A8A8',
    //     //         volume: 1.35e9, // km³
    //     //         radius: 578.9, // km
    //     //         x: 2871e6 + 191020, // km
    //     //         y: 0,
    //     //         vx: 0, // km/s
    //     //         vy: 6.80 + 2.52, // km/s
    //     //         rotationalVelocity: 0 // km/h
    //     //     },
    //     //     MIRANDA: {
    //     //         mass: 6.59e19, // kg
    //     //         density: 1200, // kg/m³
    //     //         color: '#A8A8A8',
    //     //         volume: 6.59e8, // km³
    //     //         radius: 235.8, // km
    //     //         x: 2871e6 + 129390, // km
    //     //         y: 0,
    //     //         vx: 0, // km/s
    //     //         vy: 6.80 + 6.66, // km/s
    //     //         rotationalVelocity: 0 // km/h
    //     //     }
    //     // }
    // },
    // NEPTUNE: {
    //     mass: 1.024e26, // kg
    //     density: 1638, // kg/m³
    //     color: '#4D73AD',
    //     volume: 6.254e13, // km³
    //     radius: 24622, // km
    //     x: 4495e6, // km
    //     y: 0,
    //     vx: 0, // km/s
    //     vy: 5.43, // km/s
    //     rotationalVelocity: 9719, // km/h
    //     // moons: {
    //     //     TRITON: {
    //     //         mass: 2.14e22, // kg
    //     //         density: 2140, // kg/m³
    //     //         color: '#A8A8A8',
    //     //         volume: 7.58e9, // km³
    //     //         radius: 1353.4, // km
    //     //         x: 4495e6, // km
    //     //         y: -354759,
    //     //         vx: 4.39, // km/s
    //     //         vy: 5.43, // km/s
    //     //         rotationalVelocity: 0 // km/h
    //     //     },
    //     //     NEREID: {
    //     //         mass: 3.1e19, // kg
    //     //         density: 1500, // kg/m³
    //     //         color: '#A8A8A8',
    //     //         volume: 3.53e8, // km³
    //     //         radius: 170, // km
    //     //         x: 4495e6, // km
    //     //         y: 5513814,
    //     //         vx: -0.34, // km/s
    //     //         vy: 5.43, // km/s
    //     //         rotationalVelocity: 0 // km/h
    //     //     },
    //     //     NAÏAD: {
    //     //         mass: 1.9e19, // kg
    //     //         density: 1000, // kg/m³
    //     //         color: '#A8A8A8',
    //     //         volume: 1.9e8, // km³
    //     //         radius: 66.5, // km
    //     //         x: 4495e6 + 48227, // km
    //     //         y: 0,
    //     //         vx: 0, // km/s
    //     //         vy: 5.43 + 0.32, // km/s
    //     //         rotationalVelocity: 0 // km/h
    //     //     },
    //     //     THALASSA: {
    //     //         mass: 3.5e19, // kg
    //     //         density: 1000, // kg/m³
    //     //         color: '#A8A8A8',
    //     //         volume: 3.5e8, // km³
    //     //         radius: 82.4, // km
    //     //         x: 4495e6, // km
    //     //         y: 50074,
    //     //         vx: -0.29, // km/s
    //     //         vy: 5.43, // km/s
    //     //         rotationalVelocity: 0 // km/h
    //     //     },
    //     //     DESPINA: {
    //     //         mass: 2.5e19, // kg
    //     //         density: 1000, // kg/m³
    //     //         color: '#A8A8A8',
    //     //         volume: 2.5e8, // km³
    //     //         radius: 75, // km
    //     //         x: 4495e6 - 52526, // km
    //     //         y: 0,
    //     //         vx: 0, // km/s
    //     //         vy: 5.43 - 0.26, // km/s
    //     //         rotationalVelocity: 0 // km/h
    //     //     }
    //     // }
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