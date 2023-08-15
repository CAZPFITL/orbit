import ScreenMethods from './ScreenMethods.js';

export default class ScreenObjects extends ScreenMethods {
    constructor() {
        super();
    }

    static polygon(ctx, entity) {
        ctx.save();
        if (entity.polygons.length < 1) return;

        ctx.beginPath();
        ctx.moveTo(entity.polygons[0].x, entity.polygons[0].y);

        for (let i = 1; i < entity.polygons.length; i++) {
            ctx.lineTo(entity.polygons[i].x, entity.polygons[i].y);
        }

        ctx.fillStyle = entity.color ?? '#000';
        ctx.fill();
        ctx.restore();
    }

    static circle(ctx, entity, fill = true) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(entity.x, entity.y, entity.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.strokeStyle = ctx.fillStyle = entity.color;
        fill ? ctx.fill() : ctx.stroke();
        ctx.restore();
    }

    static button({
                      ctx,
                      font,
                      x,
                      y,
                      width,
                      height,
                      text,
                      bg = '#ffffff',
                      color = '#000',
                      stroke = '#000',
                      center = true,
                      widthStroke = 1
                  }) {
        ctx.save();
        this.square({ctx, x, y, width, height, color: bg, stroke, widthStroke});
        this.text({ctx, font, color, text, x, y, width, height, center});
        ctx.restore();
    }

    static square({ctx, x, y, width, height, color = '#FFF', stroke = false, widthStroke = 1}) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fillStyle = color;
        ctx.fill();

        if (stroke) {
            const cache = ctx.lineWidth;
            ctx.strokeStyle = stroke;
            ctx.lineWidth = widthStroke;
            ctx.stroke();
            ctx.lineWidth = cache;
        }
        ctx.restore();
    }

    static text({ctx, font, color, text, x, y, width, height, center = false}) {
        ctx.save();
        ctx.font = font;
        ctx.fillStyle = color;
        const xText = x + width / 2 - ctx.measureText(text).width / 2;
        const yText = y + height / 2 + 5;
        ctx.fillText(text, center ? xText : x, center ? yText : y);
        return ctx.measureText(text).width;
        ctx.restore();
    }

    static bar({
                   ctx,
                   x,
                   y,
                   text,
                   cap,
                   fill,
                   height = 10,
                   fillColor,
                   barColor = 'transparent',
                   stroke
               }, negative = false) {
        ctx.save();
        const normalizedProgress = fill / (cap / 255);
        const progress = negative ? cap - fill : fill;

        ctx.fillStyle = barColor;
        ctx.fillRect(x, y, cap, height);

        if (stroke) {
            ctx.strokeStyle = stroke;
            ctx.strokeRect(x, y, cap, height);
        }

        ctx.fillStyle = fillColor === 'green-red'
            ? `rgb(${normalizedProgress}, ${255 - normalizedProgress}, 0)`
            : fillColor === 'red-green'
                ? `rgb(${255 - normalizedProgress}, ${normalizedProgress}, 0)`
                : fillColor;

        ctx.fillRect(x, y, progress, height);

        text && this.text({ctx, font: '12px Mouse', color: '#000', text, x, y: y - height});
        ctx.restore();
    }

    static line({ctx, x1, y1, x2, y2, color = '#000', width, lineCap}) {
        ctx.save();
        ctx.lineWidth = width;
        ctx.lineCap = lineCap;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.restore();
    }

    static path({ctx, collection, color = '#000', width, lineCap, scale}) {
        ctx.save();
        ctx.lineWidth = width;
        ctx.lineCap = lineCap;

        // Draw the Orbit path
        ctx.beginPath();
        ctx.strokeStyle = color;
        for (const element of collection) {
            const x = element.x / scale;
            const y = element.y / scale;
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
    }


    static ellipse(ctx, entity, fill = true) {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(entity.x, entity.y, entity.radiusX, entity.radiusY, 0, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.strokeStyle = ctx.fillStyle = entity.color;
        fill ? ctx.fill() : ctx.stroke();
        ctx.restore();
    }
}
