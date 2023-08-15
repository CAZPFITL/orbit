export default class Camera {
    constructor(app) {
        this.app = app;
        this.init();
    }

    init() {
        this.fieldOfView = Math.PI / 4.0;
        this.rate = 120;
        this.viewport = {
            bounds: [-2000, -2000, 2000, 2000], // [left, top, right, bottom]
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: 0,
            height: 0,
            scale: [1.0, 1.0]
        };
        this.maxZoom = 1000;
        this.minZoom = 200;
        this.lookAt = [0, 0];
        this.zoom = 800;
    }

    setProp(prop, value) {
        this[prop] = value;
        return this;
    }

    zoomTo(z) {
        this.zoom = z;
        this.#updateViewportData();
    }

    moveTo([x, y]) {
        this.lookAt = [x, y];
        this.#updateViewportData();
    }

    #updateViewportData = (ctx = this.app.gui.ctx) => {
        this.aspectRatio = ctx.canvas.width / ctx.canvas.height;
        this.viewport.width = this.zoom * Math.tan(this.fieldOfView);
        this.viewport.height = this.viewport.width / this.aspectRatio;

        this.viewport.left = this.lookAt[0] - (this.viewport.width / 2.0);
        this.viewport.top = this.lookAt[1] - (this.viewport.height / 2.0);
        this.viewport.right = this.viewport.left + this.viewport.width;
        this.viewport.bottom = this.viewport.top + this.viewport.height;
        this.viewport.scale = [
            ctx.canvas.width / this.viewport.width,
            ctx.canvas.height / this.viewport.height
        ];
    }

    #scaleAndTranslate(ctx = this.app.gui.ctx) {
        ctx.scale(this.viewport.scale[0], this.viewport.scale[1]);
        ctx.translate(-this.viewport.left, -this.viewport.top);
    }

    begin = (ctx = this.app.gui.ctx) => {
        ctx.canvas.height = window.innerHeight;
        ctx.canvas.width = window.innerWidth;
        this.#updateViewportData(ctx)
        ctx.save();
        this.#scaleAndTranslate(ctx);
    }

    end = (ctx = this.app.gui.ctx) => {
        ctx.restore();
    }
};
