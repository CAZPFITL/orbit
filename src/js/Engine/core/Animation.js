export default class Animation {
    request = 0;
    constructor(app) {
        this.app = app;
        app.animation = this;
        return this;
    }

    start(firstState) {
        this.loop()
        this.app.setState(firstState)
    }

    loop = () => {
        this.app.gui.camera.begin();
        this.app.looper.forEach(({update}) => update && update(this.request))
        this.app.gui.camera.end();
        this.request = requestAnimationFrame(this.loop);
    }
}