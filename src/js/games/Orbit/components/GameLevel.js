import CelestialBody from '../entities/CelestialBody.js'
import {CELESTIAL_BODIES} from '../env.js'

export default class GameLevel {
    constructor({app, indexToShow = 0, dt = 1}) {
        this.dt = dt;
        this.app = app;
        this.game = app.game;
        this.particles = [];
        this.init(app);
        app.game.level = this;
    }

    init = (app) => {
        Object.entries(CELESTIAL_BODIES).forEach(([bodyName, bodyData], index) => {
            let newParticle = new CelestialBody({
                app,
                index: this.particles.length,
                id: bodyName,
                ...bodyData,
            })
            this.particles.push(newParticle)

            if ((newParticle?.satellites ?? [])?.length > 0) {
                newParticle.satellites.forEach(moon => {
                    this.particles.push(moon)
                })
            }
        })
        this.app.game.follow = this.particles[1]
    }


    update() {
        for (let i = 0; i < this.particles.length; i++) {
            let particle = this.particles[i];
            particle.update();
            particle.draw();
            particle.satellites && particle.satellites.forEach(e => {
                e.draw()
                e.update()
            })
            particle.artificialSatellites && particle.artificialSatellites.forEach(e => {
                e.draw()
                e.update()
            })
        }
    }
}