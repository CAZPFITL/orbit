import Physics from "../components/Physics.js";
import Orbit from "./Orbit.js";

export default class Renderer extends Orbit {
    id;
    x;
    y;
    app;
    radius;
    color;
    angle;
    img;
    index;
    shineAngle;
    shadow;
    attachedTo;
    trajectory;
    semiMajorAxis;
    eccentricity;
    orbit;

    constructor(){
        super();
        this.img = new Image();
        this.shadow = new Image();
        this.img.src = './src/js/games/Orbit/assets/planets4.png';
        this.shadow.src = './src/js/games/Orbit/assets/main_shadow.png';
    }

    drawSatellite(ctx) {
        this.app.gui.get.circle(
            ctx,
            {
                x: this.x / Physics.universalDistanceScale,
                y: this.y / Physics.universalDistanceScale,
                radius: this.radius / Physics.universalRadiusScale,
                color: this.color,
            }, false
        );
    }

    drawImage(ctx) {
        ctx.save();

        ctx.translate(this.x / Physics.universalDistanceScale, this.y / Physics.universalDistanceScale);
        ctx.rotate(this.angle);
        ctx.drawImage(
            this.img,
            480 * this.index,
            0,
            480,
            490,
            -this.radius / Physics.universalRadiusScale,
            -this.radius / Physics.universalRadiusScale,
            this.radius / Physics.universalRadiusScale * 2,
            this.radius / Physics.universalRadiusScale * 2
        );
        ctx.restore();
    }

    drawShadow(ctx) {
        ctx.save();
        ctx.translate(this.x / Physics.universalDistanceScale, this.y / Physics.universalDistanceScale);
        ctx.rotate(this.shineAngle);
        ctx.drawImage(
            this.shadow,
            0,
            0,
            480,
            480,
            -this.radius / Physics.universalRadiusScale,
            -this.radius / Physics.universalRadiusScale,
            this.radius / Physics.universalRadiusScale * 2.01,
            this.radius / Physics.universalRadiusScale * 2.01
        );
        ctx.restore();
    }

    drawName(ctx, camera) {
        this.app.gui.get.text({
            ctx,
            font: `${camera.zoom / 100}px Mouse`,
            text: this.id,
            color: '#FFFFFF',
            x: this.x / Physics.universalDistanceScale + camera.zoom / 50,
            y: this.y / Physics.universalDistanceScale - this.radius / Physics.universalRadiusScale,
            width: 1,
            height: 1,
            center: false
        })
    }

    drawTrajectory(ctx, camera) {
        this.trajectory && this.app.gui.get.path({
            ctx,
            collection: this.trajectory,
            color: 'rgba(153,255,0,0.39)',
            width: camera.zoom / 1000,
            lineCap: 'round',
            scale: 1
        })
    }

    drawOrbit(ctx, camera) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0,226,255,0.7)';
        ctx.strokeStyle = 'rgba(0,226,255,0.7)';
        ctx.lineWidth = camera.zoom / 1000;

        for (let i = 0; i < this.orbit.length; i++) {
            const step = this.orbit[i]
            if (i === 0) {
                ctx.moveTo(step.xScreen, step.yScreen);
            } else {
                ctx.lineTo(step.xScreen, step.yScreen);
            }
        }

        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    draw(ctx = this.app.gui.ctx, camera = this.app.gui.camera) {
        // if (this.id !== 'SUN') {
            this.drawOrbit(ctx, camera);
            this.drawTrajectory(ctx, camera);
        // }
        this.drawName(ctx, camera);
        this.drawImage(ctx);
        // (this.id !== 'SUN') && this.drawShadow(ctx);
        // (!this.index) && this.drawSatellite(ctx);
    }
}