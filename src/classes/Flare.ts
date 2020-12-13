import { random, position, sizeRatio } from '../utils';
import { Point } from './Point';
import { EntityWithLocation } from './EntityWithLocation';

export class Flare extends EntityWithLocation {
    flareSizeMultiplier: number;
    flareSizeBase: number;

    constructor(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        mouse: Point,
        nPos: Point,
        motion: number,
        noiseStrength: number,
        color: string,
        flareSizeMultiplier: number,
        flareSizeBase: number
    ) {
        super(canvas, context, mouse, nPos, motion, noiseStrength, color);

        this.x = random(-0.25, 1.25, true);
        this.y = random(-0.25, 1.25, true);
        this.z = random(0, 2);
        this.color = color;
        this.opacity = random(0.001, 0.01, true);
        this.flareSizeMultiplier = flareSizeMultiplier;
        this.flareSizeBase = flareSizeBase;
    }

    render() {
        var pos = position(
                this.canvas,
                this.mouse,
                this.nPos,
                this.motion,
                this.noiseStrength,
                this.x,
                this.y,
                this.z
            ),
            r =
                (this.z * this.flareSizeMultiplier + this.flareSizeBase) *
                (sizeRatio(this.canvas) / 1000);

        this.context.beginPath();
        this.context.globalAlpha = this.opacity;
        this.context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.closePath();
        this.context.globalAlpha = 1;
    }
}
