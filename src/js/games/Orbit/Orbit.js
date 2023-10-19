import Screen from "./Screen.js";
import GameLevel from "./components/GameLevel.js";
import {CELESTIAL_BODIES, updateAllCelestialBodies} from "./env.js";


export default class Orbit {
    follow;
    screen;
    level;

    constructor(app) {
        this.app = app;
        this._fetch = false;
        app.game = this;
        new Screen(app);
        new GameLevel({app, dt: 2000});
    }

    prev() {
        if (!this.app.game.level.particles[this.app.game?.follow?.index - 1]) {
            return;
        }
        this.app.game.follow = this.app.game.level.particles[this.app.game.follow.index - 1]
    }

    next() {
        if (!this.app.game.level.particles[this.app.game?.follow?.index + 1]) {
            return;
        }
        this.app.game.follow = this.app.game.level.particles[this.app.game.follow.index + 1]
    }

    fetch() {
        this._fetch = true;
        updateAllCelestialBodies().then(() => {
            console.log('Datos de los cuerpos celestes actualizados.');
            console.log(CELESTIAL_BODIES);
            this.app.setState('LOADED');
        });
    }

    update = () => {
        if (this.app.state === 'LOAD_ENGINE') {
            this.cache = this.app.gui.camera.zoom;
        } else if (this.app.state === 'LOAD_GAME') {
            // (!this._fetch) && this.fetch();
            this.app.gui.camera.zoom = 1000;
            this.app.setState('LOADED');
        } else if (this.app.state === 'LOADED') {
            // let timeOut
            // new Promise((resolve) => {
            //     timeOut = setTimeout(() => {
            //         if (this.follow) this.screen.follow(this.follow);
            //         this.app.gui.camera.zoom = this.cache;
            //         resolve();
            //     }, 1000);
            // }).then(() => {
                this.app.gui.camera.zoom = this.cache;
                this.app.setState('PLAY')
            //     clearTimeout(timeOut);
            // })
        } else if (this.app.state === 'PLAY') {
            (this.follow) && this.screen.follow(this.follow);
            this.level.update();
        }
    }
}