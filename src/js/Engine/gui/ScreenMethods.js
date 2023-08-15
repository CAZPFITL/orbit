export default class ScreenMethods {
    static createCanvas(id) {
        const canvas = document.getElementById(id);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        return canvas.getContext('2d');
    }

    static clear(ctx, x, y, width, height) {
        ctx.clearRect(x, y, width, height);
    }

    static checkHoverCollection({collection, event, viewport, isHover, isOut, caller}) {
        for (const key in collection) {
            if (
                ScreenMethods.isHover(collection[key], {x: event.clientX, y: event.clientY}) ||
                ScreenMethods.isHover(collection[key], ScreenMethods.viewportCoords(event, viewport))
            ) {
                isHover(key);
            } else {
                if (caller === key) {
                    isOut(key);
                }
            }
        }
    }

    static isClicked(entity, click, callback) {
        if (!entity) return;
        const {x, y, width, height} = entity;
        if (click.x > x && click.x < x + width && click.y > y && click.y < y + height) {
            callback();
        }
    }

    static isHover(entity, click) {
        const {x, y, width, height} = entity;
        return (
            click.x > x &&
            click.x < x + width &&
            click.y > y &&
            click.y < y + height
        );
    }

    static viewportCoords = ({x, y}, viewport) => ({
        x: x / viewport.scale[0] + viewport.left,
        y: y / viewport.scale[1] + viewport.top
    })

    static clickCoords = (e, viewport) => ({
        x: e.clientX / viewport.scale[0] + viewport.left,
        y: e.clientY / viewport.scale[1] + viewport.top
    })
}