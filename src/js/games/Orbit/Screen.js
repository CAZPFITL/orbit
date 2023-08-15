import Physics from "./components/Physics.js";

export default class Screen {
    constructor(app) {
        this.app = app;
        this.gui = this.app.gui;
        this.init();
        app.game.screen = this;
    }

    init() {
        this.addCamera()
        this.addGui()
        this.addListeners()
    }

    addCamera() {
        this.app.gui.camera
            .setProp('maxZoom', 5e20)
            .setProp('minZoom', 1)
            .setProp('zoom', 4e8)
            .setProp('lookAt', [0, 0])
    }

    addGui() {
        this.gui
            .addProp('colors', {
                LOAD_ENGINE: {
                    background: '#ffa7a7',
                },
                LOAD_GAME: {
                    background: '#1e1e1e',
                },
                LOADED: {
                    background: '#0c0a0a',
                },
                PLAY: {
                    background: '#000000',
                }
            })
            .addProp('buttons', {
                PLAY: {},
            })
            .addProp('decorations', {
                LOAD_GAME: {
                    title: {
                        type: 'text',
                        props: {
                            ctx: this.gui.ctx,
                            font: '72px Mouse',
                            text: 'Loading...',
                            x: 0,
                            y: 0,
                            color: '#FFFFFF',
                            width: 0,
                            height: 0,
                            center: true
                        }
                    }
                },
                LOADED: {
                    title: {
                        type: 'text',
                        props: {
                            ctx: this.gui.ctx,
                            font: '72px Mouse',
                            text: this.app.game.constructor.name,
                            x: 0,
                            y: 0,
                            color: '#FFFFFF',
                            width: 0,
                            height: 0,
                            center: true
                        }
                    }
                },
                PLAY: {}
            });
    }

    addListeners() {
        this.app.listeners
            .pushListener(this, 'mousemove', (e) => {
            })
            .pushListener(this, 'mouseup', (e) => {
            })
            .pushListener(this, 'mousedown', (e) => {
            })
            .pushListener(this, 'click', (e) => {
            })
            .pushListener(this, 'keydown', (e) => {
                const camera = this.app.gui.camera;
                let multiplier = camera.zoom / 100
                if (e.key === 'PageUp' || e.key === 'PageDown' || e.key === 'a' || e.key === 'z') {
                    let delta = (e.key === 'PageUp' || e.key === 'z') ? 1 : (e.key === 'PageDown' || e.key === 'a') ? -1 : 0;
                    let addition = delta * multiplier * (e.shiftKey ? 10 : 1);
                    let zoomLevel = camera.zoom + addition;
                    camera.zoomTo(
                        (zoomLevel <= camera.minZoom) ?
                            camera.minZoom :
                            (zoomLevel >= camera.maxZoom) ?
                                camera.maxZoom :
                                zoomLevel
                    );
                }
                if (e.key === 'ArrowUp') {
                    this.app.gui.camera.moveTo([this.app.gui.camera.lookAt[0], this.app.gui.camera.lookAt[1] - multiplier * (e.shiftKey ? 10 : 1)])
                }
                if (e.key === 'ArrowDown') {
                    this.app.gui.camera.moveTo([this.app.gui.camera.lookAt[0], this.app.gui.camera.lookAt[1] + multiplier * (e.shiftKey ? 10 : 1)])
                }
                if (e.key === 'ArrowLeft') {
                    this.app.gui.camera.moveTo([this.app.gui.camera.lookAt[0] - multiplier * (e.shiftKey ? 10 : 1), this.app.gui.camera.lookAt[1]])
                }
                if (e.key === 'ArrowRight') {
                    this.app.gui.camera.moveTo([this.app.gui.camera.lookAt[0] + multiplier * (e.shiftKey ? 10 : 1), this.app.gui.camera.lookAt[1]])
                }
            })
            .pushListener(this, 'wheel', (e) => {
                e.preventDefault()
                const camera = this.app.gui.camera;
                const deltaY = Math.max(-camera.rate, Math.min(camera.rate, event.deltaY));
                const deltaX = Math.max(-camera.rate, Math.min(camera.rate, event.deltaX));

                if (event.ctrlKey) {
                    let delta = Math.max(-1, Math.min(1, Math.floor(deltaY))); // Normalize to 1 speed limiter

                    let multiplier = camera.zoom / 10

                    let addition = delta * multiplier * (e.shiftKey ? 2 : 1);

                    let zoomLevel = camera.zoom + addition;

                    camera.zoomTo(
                        (zoomLevel <= camera.minZoom) ?
                            camera.minZoom :
                            (zoomLevel >= camera.maxZoom) ?
                                camera.maxZoom :
                                zoomLevel
                    );
                } else {
                    if (!event.shiftKey) {
                        camera.moveTo([
                            camera.lookAt[0] + Math.floor(deltaX),
                            camera.lookAt[1] + Math.floor(deltaY)
                        ]);
                    } else {
                        camera.moveTo([
                            camera.lookAt[0] + Math.floor(deltaY),
                            camera.lookAt[1] + Math.floor(deltaX)
                        ]);
                    }
                }
            })
    }

    follow(entity) {
        this.app.gui.camera.moveTo([
            entity.x / Physics.universalDistanceScale + entity.vx * this.app.game.level.dt * 2,
            entity.y / Physics.universalDistanceScale + entity.vy * this.app.game.level.dt * 2
        ])
    }
}