// https://www.britannica.com/science/gravity-physics/Newtons-law-of-gravity
export default class Physics {
    static G_km = 6.67430e-20; // km³/(kg·s²)
    static universalRadiusScale = 1;
    static universalDistanceScale = 1;

    static calculateDistanceToSun(entity, sun) {
        const {x: x1, y: y1} = sun
        const {x: x2, y: y2} = entity

        return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5;
    }

    static calculatePosition(entity, {vx, vy}, dt) {
        const x = entity.x + vx * dt; // km
        const y = entity.y + vy * dt; // km

        return {x, y};
    }

    static calculateVelocity(entity, {ax, ay}, dt) {
        const vx = entity.vx + ax * dt; // km/s
        const vy = entity.vy + ay * dt; // km/s

        return {vx, vy}
    }

    static calculateAcceleration(entity, collection) {
        let acceleration = {ax: 0, ay: 0};

        for (const body of collection) {
            if (body !== entity) {
                const dx = body.x - entity.x;
                const dy = body.y - entity.y;
                const sqrDst = dx * dx + dy * dy;

                const minSqrDst = 0.00001;
                const finalSqrDst = Math.max(sqrDst, minSqrDst);


                const forceDir = {
                    x: dx / Math.sqrt(finalSqrDst),
                    y: dy / Math.sqrt(finalSqrDst),
                };

                const forceMagnitude = Physics.G_km * body.mass / finalSqrDst;

                acceleration.ax += forceDir.x * forceMagnitude;
                acceleration.ay += forceDir.y * forceMagnitude;
            }
        }

        return acceleration;
    }

    static calculateAngle(entity1, entity2, dt) {
        const dx = entity2.x - entity1.x;
        const dy = entity2.y - entity1.y;
        // TODO FIX THIS
        const shineAngleRadians = Math.atan2(dy, dx);
        const shineAngleDegrees = entity1.app.tools.radToDeg(shineAngleRadians) + 180; // 180 is a temporal fix
        entity1.shineAngle = entity1.app.tools.degToRad(shineAngleDegrees % 360);


        const angleRadians = entity1.angle + (entity1.rotationalVelocity / 3600) * dt

        return {
            shineAngle: entity1.app.tools.degToRad(shineAngleDegrees % 360),
            angle: angleRadians
        }

    }

    static applyGravity(entity, data) {
        entity.ax = data.ax;
        entity.ay = data.ay;
        entity.vx = data.vx;
        entity.vy = data.vy;
        entity.x = data.x;
        entity.y = data.y;
        entity.distanceToSun = data.distanceToSun;
        entity.angle = (data.angle > 6.2) ? 0 : data.angle;
    }

    static calculateStep(entity, particles, dt) {
        let {ax, ay} = Physics.calculateAcceleration(
            entity, particles
        )

        let {vx, vy} = Physics.calculateVelocity(
            entity, {ax, ay}, dt
        )

        let {x, y} = Physics.calculatePosition(
            entity, {vx, vy}, dt
        )

        let {angle, shineAngle} = Physics.calculateAngle(entity, particles[0], dt)

        let distanceToSun = Physics.calculateDistanceToSun(entity, particles[0])

        return {ax, ay, vx, vy, x, y, angle, shineAngle, distanceToSun}
    }

    static calculateTrajectory(entity) {
        entity.trajectory = [];

        for (let i = 0; i < 360; i++) {
            for (let j = 0; j < entity.orbitParticles.length; j++) {

                const target = entity.orbitParticles[j];

                const dt = entity.distanceToSun**(1.13/2);

                const step = Physics.calculateStep(
                    entity.orbitParticles[j],
                    entity.orbitParticles,
                    dt
                );

                // Apply to simulate
                Physics.applyGravity(
                    entity.orbitParticles[j],
                    step
                );

                if (target.id === entity.id) {
                    entity.trajectory.push(step);
                }
            }
        }
    }

    static calculateOrbit(entity) {
        entity.perihelion = Number.MAX_VALUE;
        entity.aphelion = Number.MIN_VALUE;
        entity.orbit = []

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
    }
}