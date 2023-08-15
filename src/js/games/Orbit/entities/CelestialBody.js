import Physics from "../components/Physics.js";
import Renderer from "./Renderer.js";

export default class CelestialBody extends Renderer {
    fx = 0;
    fy = 0;
    ax = 0;
    ay = 0;
    angle = 0;
    shineAngle = 0;
    satellites = [];
    artificialSatellites = [];
    trajectory = [];
    orbitSteps = 3600;
    distanceToSun = 0;
    orbitRadiusX = 0;
    orbitRadiusY = 0;
    constructor(props) {
        const {
            id,
            index,
            app,
            color = '#FFFFFF',
            x, y, vx, vy,
            mass,
            density,
            volume,
            radius,
            rotationalVelocity,
            satellites,
            artificialSatellites,
            attachedTo,
            semiMajorAxis,    // Semieje mayor (a)
            eccentricity,     // Excentricidad (e)
            longitudeOfNode,  // Longitud del nodo ascendente (Ω)
            argumentOfPeriapsis, // Argumento del perihelio (ω)
            meanAnomaly,      // Anomalía media (M)
            periapsis,        // Periapsis (P)
            apoapsis          // Apoapsis (A)
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
        this.density = density; // kg/m³
        this.volume = volume; // km³
        this.radius = radius; // Km
        this.rotationalVelocity = rotationalVelocity / 3600;
        this.attachedTo = attachedTo

        // Orbit Data
        this.semiMajorAxis = semiMajorAxis;
        this.eccentricity = eccentricity;
        this.longitudeOfNode = longitudeOfNode;
        this.argumentOfPeriapsis = argumentOfPeriapsis;
        this.meanAnomaly = meanAnomaly;
        this.periapsis = periapsis;
        this.apoapsis = apoapsis;

        this.orbitParticles = [];

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
            )

        return this
    }

    draw(ctx = this.app.gui.ctx, camera = this.app.gui.camera) {

        if (this.id !== 'SUN') {
            this.drawOrbit(ctx, camera);
            this.drawQq(ctx, camera);
            this.drawTrajectory(ctx, camera);
        }
        this.drawName(ctx, camera);
        this.drawImage(ctx);
        (this.id !== 'SUN') && this.drawShadow(ctx);
        // (!this.index) && this.drawSatellite(ctx);
    }

    updateOrbitParticles() {
        this.orbitParticles = [];
        let copy = this.app.game.level.particles;

        for (let i = 0; i < copy.length; i++) {
            let particle = Object.assign(Object.create(Object.getPrototypeOf(copy[i])), copy[i]);
            this.orbitParticles.push(particle);
        }
    }

    update() {
        if (this.id === 'SUN') return;

        this.updateOrbitParticles()

        Physics.calculateTrajectory(this);

        Physics.calculateOrbit(this);

        Physics.applyGravity(
            this,
            Physics.calculateStep(
                this,
                this.app.game.level.particles,
                this.app.game.level.dt
            )
        )
    }
}