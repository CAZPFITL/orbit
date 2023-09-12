// https://www.youtube.com/watch?v=-GWTDhOQU6M
import Physics from "./Physics.js";

export class Step {
    static calculateDistanceToSun(entity, sun) {
        const {x: x1, y: y1} = sun
        const {x: x2, y: y2} = entity

        return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5;
    }

    static calculateAccelerationEuler(entity, collection) {
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

    static calculateAccelerationVerlet(entity, collection) {
        let acceleration = { ax: 0, ay: 0 };

        function calculateForce(entity1, entity2) {
            const dx = entity2.x - entity1.x;
            const dy = entity2.y - entity1.y;
            const distanceSquared = dx * dx + dy * dy;
            const forceMagnitude = (Physics.G_km * entity1.mass * entity2.mass) / distanceSquared;
            const angle = Math.atan2(dy, dx);
            const forceX = forceMagnitude * Math.cos(angle);
            const forceY = forceMagnitude * Math.sin(angle);
            return { x: forceX, y: forceY };
        }


        for (const body of collection) {
            if (body !== entity) {
                const dx = body.x - entity.x;
                const dy = body.y - entity.y;

                const force = calculateForce(entity, body);

                const ax = force.x / entity.mass;
                const ay = force.y / entity.mass;

                // console.log(ax)

                acceleration.ax += ax;
                acceleration.ay += ay;
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

    static euler(entity, particles, dt) {
        // Semi-implicit Euler Integration
        let {ax, ay} = Physics.calculateAccelerationEuler(
            entity, particles
        )

        const vx = entity.vx + ax * dt; // km/s
        const vy = entity.vy + ay * dt; // km/s

        const x = entity.x + vx * dt; // km
        const y = entity.y + vy * dt; // km

        return {ax, ay, vx, vy, x, y}
    }

    static verlet(entity, particles, dt) {
        const prev_x = entity.x - entity.vx * dt;
        const prev_y = entity.y - entity.vy * dt;

        const { ax, ay } = Physics.calculateAccelerationVerlet(entity, particles);


        const vx = entity.vx + 0.5 * (ax + entity.ax) * dt;
        const vy = entity.vy + 0.5 * (ay + entity.ay) * dt;

        const x = 2 * entity.x - prev_x + ax * dt * dt;
        const y = 2 * entity.y - prev_y + ay * dt * dt;

        return { ax, ay, vx, vy, x, y, prev_x, prev_y };
    }

    static calculateStep(entity, particles, dt, integrator = 'verlet') {
        if (!Physics.integrators.includes(integrator))
            throw reportError(new Error("select a valid integrator"));

        let { vx, vy, x, y, ax, ay, prev_x, prev_y} = Physics[integrator](entity, particles, dt)



        let {angle, shineAngle} = Physics.calculateAngle(entity, particles[0], dt)

        let distanceToSun = Physics.calculateDistanceToSun(entity, particles[0])


        return {ax, ay, vx, vy, x, y, angle, shineAngle, distanceToSun, prev_x, prev_y}
    }

    // TODO More precision

    static applyGravity(entity, data) {
        entity.ax = data.ax;
        entity.ay = data.ay;
        entity.vx = data.vx;
        entity.vy = data.vy;
        entity.x = data.x;
        entity.y = data.y;
        entity.distanceToSun = data.distanceToSun;
        entity.angle = (data.angle > 6.2) ? 0 : data.angle;
        entity.prev_x = data?.prev_x
        entity.prev_y = data?.prev_y
    }
}