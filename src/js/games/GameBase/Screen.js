import {COLORS} from './env.js'

export default class Screen {
    constructor(app) {
        this.app = app;
        this.gui = this.app.gui;
        this.init(app);
    }

    init(app) {
        this.app.gui.camera
            .setProp('maxZoom', 10000)
            .setProp('minZoom', 200)
            .setProp('zoom', 3000)
            .setProp('lookAt', [0, 0])
        this.gui
            .addProp('colors', {
                LOAD_ENGINE: {
                    background: COLORS.BLACK[0],
                },
                PLAY: {
                    background: COLORS.GREEN[2],
                }
            })
            .addProp('buttons', {
                PLAY: {},
            })
            .addProp('decorations', {
                LOAD_ENGINE: {},
                PLAY: {
                    mainCard: {
                        type: 'square',
                        props: {
                            ctx: app.gui.ctx,
                            x: 100,
                            y: 100,
                            width: 600,
                            height: 400,
                            color: '#CCCCCC',
                            stroke: '#DDDDDD',
                            widthStroke: '#000000'
                        }
                    },
                    title: {
                        type: 'text',
                        props: {
                            ctx: app.gui.ctx,
                            font: "72px Mouse",
                            text: app.game?.constructor?.name,
                            x: 300,
                            y: 100,
                            color: '#000000',
                            width: 600,
                            height: 30,
                            center: true
                        }
                    }
                }
            });
        this.app.listeners
            .pushListener(this, 'mousemove', (e) => {
                return;
                app.gui.get.checkHoverCollection({
                    collection: this.gui.hoverCollection,
                    event,
                    viewport: app.camera.viewport,
                    isHover: (key) => {
                        (this.gui.buttonsStates[key] !== 'click') && (this.gui.buttonsStates[key] = 'hover');
                        this.hoverCaller = key;
                        this.gui.hoverStateIn();
                    },
                    isOut: (key) => {
                        (this.gui.buttonsStates[key] !== 'click') && (this.gui.buttonsStates[key] = 'normal');
                        this.hoverCaller = null;
                        this.gui.hoverStateOut();
                    },
                    caller: this.hoverCaller,
                });
            })
            .pushListener(this, 'mouseup', (e) => {
                return;
                const coords = {x: event.offsetX, y: event.offsetY};
                const viewportCtx = app.gui.get.clickCoords(event, app.camera.viewport);
                const buttons = {
                    start: {coords: viewportCtx, ...this.gui.buttonsCollection?.MAIN_MENU?.start ?? {}}
                }
                Object.keys(buttons).forEach(key => {
                    app.gui.get.isClicked(
                        buttons[key].props,
                        buttons[key].coords,
                        () => {
                            this.buttonsStates[key] = 'normal';
                            buttons[key].props?.callbacks?.mouseup && buttons[key].props.callbacks.mouseup();
                        }
                    )
                });
                this.gui.buttonsStates.start = 'normal'
            })
            .pushListener(this, 'mousedown', (e) => {
                return;
                const coords = {x: event.offsetX, y: event.offsetY};
                const viewportCoords = app.gui.get.clickCoords(event, app.camera.viewport);
                const buttons = {
                    start: {coords: viewportCoords, ...this.gui.buttonsCollection.MAIN_MENU.start}
                }
                Object.keys(buttons).forEach(key => {
                    app.gui.get.isClicked(
                        buttons[key].props,
                        buttons[key].coords,
                        () => {
                            this.gui.buttonsStates[key] = 'click';
                            buttons[key].props?.callbacks?.mousedown && buttons[key].props.callbacks.mousedown();
                        }
                    )
                });
            })
            .pushListener(this, 'click', (e) => {
                const coords = {x: event.offsetX, y: event.offsetY};
                const buttons = {}
                Object.keys(buttons).forEach(key => {
                    app.gui.get.isClicked(
                        buttons[key].props,
                        buttons[key].coords,
                        () => {
                            this.gui.buttonsStates[key] = this.gui.buttonsStates[key] === 'click' ? 'normal' : 'click';
                            buttons[key].props?.callbacks?.click && buttons[key].props.callbacks.click();
                        }
                    )
                });
            })
            .pushListener(this, 'keydown', (e) => {
                if (e.key === 'ArrowUp') {
                    this.app.gui.camera.moveTo([this.app.gui.camera.lookAt[0], this.app.gui.camera.lookAt[1] - 10])
                }
                if (e.key === 'ArrowDown') {
                    this.app.gui.camera.moveTo([this.app.gui.camera.lookAt[0], this.app.gui.camera.lookAt[1] + 10])
                }
                if (e.key === 'ArrowLeft') {
                    this.app.gui.camera.moveTo([this.app.gui.camera.lookAt[0] - 10, this.app.gui.camera.lookAt[1]])
                }
                if (e.key === 'ArrowRight') {
                    this.app.gui.camera.moveTo([this.app.gui.camera.lookAt[0] + 10, this.app.gui.camera.lookAt[1]])
                }
            });
    }
}