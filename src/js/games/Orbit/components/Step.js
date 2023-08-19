import Physics from "./Physics.js";

export class Step {
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
}