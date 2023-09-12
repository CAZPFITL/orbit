import Physics from "../components/Physics.js";

export default class Orbit {
    id;
    shineAngle;
    completedOrbits;
    trajectory;

    updateOrbitParticles() {
        this.orbitParticles = this.app.game.level.particles.map(particle => {
            return Object.assign(Object.create(Object.getPrototypeOf(particle)), particle);
        });
    }

    newOrbit() {
        if (this.id !== 'SUN') {
            this.updateOrbitParticles();
            Physics.calculateTrajectory(this);
            // Physics.calculateOrbit(this);
        }
        this.start = true;
    }

    checkOrbitHalf() {
        const halfAngle = this.app.tools.degToRad(180);

        if (this.shineAngle > halfAngle && this.orbitFirstHalf) {
            this.orbitFirstHalf = false;
            this.start = false;
            this.trajectory = []
        }

        if (this.shineAngle < halfAngle && !this.orbitFirstHalf) {
            this.orbitFirstHalf = true;
            this.completedOrbits++;
            this.trajectory = []
        }
    }

    updateOrbit() {
        // if (!this.trajectory || this.trajectory.length === 0) {
        //     this.newOrbit()
        // }

        // this.checkOrbitHalf(this);
    }
}