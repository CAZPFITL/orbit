// https://www.britannica.com/science/gravity-physics/Newtons-law-of-gravity
import {Step} from "./Step.js";

export default class Physics extends Step {
    static G_km = 6.67430e-20; // km³/(kg·s²)
    static universalRadiusScale = 1;
    static universalDistanceScale = 1;

    static calculateTrajectory(entity) {
        entity.trajectory = [];

        Physics.warp(entity, ()=>{
            // TODO: add to log
            console.log(entity.id, '`s orbit ',  entity.completedOrbits, ' started');
            console.log('calculating trajectory ' + entity.id);

            function generateTrajectoryStep() {
                for (let j = 0; j < entity.orbitParticles.length; j++) {

                    const target = entity.orbitParticles[j];

                    const step = Physics.calculateStep(
                        target,
                        entity.orbitParticles,
                        3600
                    );

                    // Apply to simulate
                    Physics.applyGravity(
                        target,
                        step
                    );

                    if (target.id === entity.id) {
                        entity.trajectory.push(step);
                    }

                }
            }

            let complete = false;

            do {
                generateTrajectoryStep()
                complete = entity.trajectory.some(step =>
                    step.shineAngle >= entity.app.tools.degToRad(180)
                )
            } while (complete === false);

            entity.calculating = false;
        })
    }

    static calculateOrbit(entity) {
        entity.orbit = [];

        Physics.warp(entity, ()=>{
            // TODO: add to log
            console.log('calculating orbit ' + entity.id);

            entity.perihelion = Number.MAX_VALUE;
            entity.aphelion = Number.MIN_VALUE;

            for (let i = 0; i < entity.trajectory.length; i++) {
                const target = entity.trajectory[i];

                if (target.distanceToSun < entity.perihelion) {
                    entity.perihelion = target.distanceToSun;
                }
                if (target.distanceToSun > entity.aphelion) {
                    entity.aphelion = target.distanceToSun;
                }
            }

            entity.semiMajorAxis = (entity.perihelion + entity.aphelion) / 2;
            entity.eccentricity = (entity.aphelion - entity.perihelion) / (entity.aphelion + entity.perihelion);

            const ref = entity.attachedTo ?? entity.orbitParticles[0];

            for (let angle = 0; angle <= 360; angle++) {
                const trueAnomaly = angle * (Math.PI / 180);

                const distance = (entity.semiMajorAxis * (1 - Math.pow(entity.eccentricity, 2))) / (1 + entity.eccentricity * Math.cos(trueAnomaly));

                const xOrbit = distance * Math.cos(trueAnomaly);
                const yOrbit = distance * Math.sin(trueAnomaly);

                const xScreen = ref.x + xOrbit;
                const yScreen = ref.y - yOrbit;

                entity.orbit.push({xScreen, yScreen});
            }

            entity.calculating = false;
        })
    }

    static warp(entity, callback) {
        let cache = entity.app.game.level.dt
        entity.app.game.level.dt = 6000
        callback()
        entity.app.game.level.dt = cache;
    }
}