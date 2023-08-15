import Physics from "../components/Physics.js";

export default class Renderer {
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
    periapsis;
    apoapsis;

    constructor(){
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
            color: 'rgba(255,0,255,0.59)',
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
        ctx.lineWidth = camera.zoom / 2000;

        const centerX = 0; // Usar el centro proporcionado
        const centerY = 0;

        const semiMajorAxis = this.semiMajorAxis; // Semieje mayor de la órbita
        const eccentricity = this.eccentricity;
        for (let angle = 0; angle <= 360; angle++) {
            const trueAnomaly = angle * (Math.PI / 180);

            const distance = (semiMajorAxis * (1 - Math.pow(eccentricity, 2))) / (1 + eccentricity * Math.cos(trueAnomaly));

            const xOrbit = distance * Math.cos(trueAnomaly);
            const yOrbit = distance * Math.sin(trueAnomaly);

            const xScreen = centerX + xOrbit;
            const yScreen = centerY - yOrbit;

            if (angle === 0) {
                ctx.moveTo(xScreen, yScreen);
            } else {
                ctx.lineTo(xScreen, yScreen);
            }
        }

        ctx.closePath();
        ctx.stroke();
        ctx.restore();

    }

    drawQq(ctx, camera) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;

        const centerX = 0; // Usar el centro proporcionado
        const centerY = 0;

        const semiMajorAxis = this.semiMajorAxis; // Semieje mayor de la órbita
        const eccentricity = this.eccentricity;
        for (let angle = 0; angle <= 360; angle++) {
            const trueAnomaly = angle * (Math.PI / 180);

            const distance = (semiMajorAxis * (1 - Math.pow(eccentricity, 2))) / (1 + eccentricity * Math.cos(trueAnomaly));

            const xOrbit = distance * Math.cos(trueAnomaly);
            const yOrbit = distance * Math.sin(trueAnomaly);

            const xScreen = centerX + xOrbit;
            const yScreen = centerY - yOrbit;

            if (angle === 0) {
                ctx.moveTo(xScreen, yScreen);
            } else {
                ctx.lineTo(xScreen, yScreen);
            }

            if (Math.abs(distance - this.periapsis) < 0.001 || Math.abs(distance - this.apoapsis) < 0.001) {
                ctx.beginPath();
                ctx.arc(xScreen, yScreen, 200000, 0, 2 * Math.PI);
                ctx.fillStyle = Math.abs(distance - this.periapsis) < 0.001 ? '#00ff22' : '#ff0000';
                ctx.fill();
            }
        }

        ctx.closePath();
        ctx.stroke();
        ctx.restore();

    }
}