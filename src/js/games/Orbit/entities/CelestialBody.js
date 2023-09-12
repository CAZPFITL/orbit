import Physics from "../components/Physics.js";
import Renderer from "./Renderer.js";

export default class CelestialBody extends Renderer {
    fx = 0;
    fy = 0;
    prevX = 0;
    prevY = 0;
    ax = 0;
    ay = 0;
    angle = 0;
    shineAngle = 0;
    satellites = [];
    artificialSatellites = [];
    trajectory = [];
    distanceToSun = 0;

    // Orbit
    aphelion;
    perihelion;
    eccentricity;
    semiMajorAxis;
    orbit = [];
    orbitParticles = [];
    completedOrbits = 0;
    orbitFirstHalf = true;

    flip = false;
    constructor(props) {
        const {
            id,
            index,
            app,
            color = '#FFFFFF',
            x, y, vx, vy,
            mass,
            // density,
            // volume,
            radius,
            rotationalVelocity,
            satellites,
            artificialSatellites,
            attachedTo,
        } = props;
        super();
        this.id = id;
        this.index = index;
        this.app = app;
        this.color = color;

        // Planet Data
        this.x = x; // km
        this.y = y; // km
        this.vx = vx; // km/s
        this.vy = vy; // km/s
        this.mass = mass; // kg
        // this.density = density; // kg/m³
        // this.volume = volume; // km³
        this.radius = radius; // Km
        this.rotationalVelocity = rotationalVelocity / 3600;
        this.attachedTo = attachedTo
        this.satellites = satellites && Object.entries(satellites).map(([key, moon], index) =>
            new CelestialBody({
                app, id: key, attachedTo: this, index: this.index + (index + 1), ...moon
            })
        )
        this.artificialSatellites = artificialSatellites
            && Object.entries(artificialSatellites).map(([key, moon]) =>
                new CelestialBody({
                    app, id: key, attachedTo: this, ...moon
                })
            );

        return this
    }

    update() {
        this.draw();

        if (this.id === 'SUN') return;

        this.updateOrbit()

        Physics.applyGravity(
            this,
            Physics.calculateStep(
                this,
                this.app.game.level.particles,
                this.app.game.level.dt,
                Physics.integrator
            )
        )

    }
}