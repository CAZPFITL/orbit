import Physics from "../components/Physics.js";

export default class Orbit {
    id;
    shineAngle;
    completedOrbits;
    updateOrbitParticles() {
        this.orbitParticles = [];
        let copy = this.app.game.level.particles;

        for (let i = 0; i < copy.length; i++) {
            let particle = Object.assign(Object.create(Object.getPrototypeOf(copy[i])), copy[i]);
            this.orbitParticles.push(particle);
        }
    }

    newOrbit() {
        this.start = true;
        (this.id !== 'SUN') && this.updateOrbitParticles();
        (this.id !== 'SUN') && Physics.calculateTrajectory(this);
        (this.id !== 'SUN') && Physics.calculateOrbit(this);
    }

    checkOrbitHalf() {
        if (this.shineAngle > this.app.tools.degToRad(180) && this.orbitFirstHalf) {
            this.orbitFirstHalf = false;
            this.newOrbit();
        }

        if (this.shineAngle < this.app.tools.degToRad(180) && !this.orbitFirstHalf) {
            this.orbitFirstHalf = true;
            this.completedOrbits++;
            this.newOrbit();
        }
    }

    updateOrbit() {
        (!this.start) && this.newOrbit();

        this.checkOrbitHalf(this);
    }
}