import ScreenObjects from "./ScreenObjects.js";
import Camera from './Camera.js';

export default class Gui extends ScreenObjects {
    get = Gui;
    colors = {};
    decorations = {};
    buttonsCollection = {};
    hoverCollection = {};
    buttonsStates = {};

    constructor(app) {
        super();
        this.app = app;
        this.ctx = Gui.createCanvas('gameCanvas');
        this.camera = new Camera(app);
        app.gui = this;
    }

    hoverStateIn() {
        if (this.ctx.canvas.style.cursor !== 'pointer') {
            this.ctx.canvas.style.cursor = 'pointer';
        }
    }

    hoverStateOut() {
        if (this.ctx.canvas.style.cursor === 'pointer') {
            this.ctx.canvas.style.cursor = 'default';
        }
    }

    addProp = (prop, data) => {
        this[prop] = {...this[prop], ...data};
        return this;
    }

    update = () => {
        // DECLARE COLLECTION
        if (!this.colors || !this?.decorations || !this?.buttonsCollection || !this.hoverCollection || !this.buttonsStates) return;

        const collection = [
            ...Object.values(this.decorations[this.app.state] ?? {}),
            ...Object.values(this.buttonsCollection[this.app.state] ?? {}),
        ];

        // DRAW COLLECTION
        for (let i = 0; i < collection.length; i++) {
            const item = collection[i];
            this.get[item.type](item.props);
        }

        // HOVER EVENTS
        Object.entries(this.buttonsCollection[this.app.state] ?? {}).forEach(key => {
            this.hoverCollection[key[0]] = key[1].props;
        });

        // CANVAS BACKGROUND
        (this.ctx.canvas.style.backgroundColor = this.colors[this.app.state]?.background);
    };
}
