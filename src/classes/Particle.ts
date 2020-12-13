import { position, random, sizeRatio } from '../utils';
import { EntityWithLocation } from './EntityWithLocation';
import { Point } from './Point';

export class Particle extends EntityWithLocation {
    flicker: number;
    neighbors: number[];
    particleSizeMultiplier: number;
    particleSizeBase: number;
    flickerSmoothing: number;
    renderParticleGlare: boolean;
    glareOpacityMultiplier: number;
    glareAngle: number;

    constructor(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        mouse: Point,
        nPos: Point,
        motion: number,
        noiseStrength: number,
        color: string,
        particleSizeMultiplier: number,
        particleSizeBase: number,
        flickerSmoothing: number,
        renderParticleGlare: boolean,
        glareOpacityMultiplier: number,
        glareAngle: number
    ) {
        super(canvas, context, mouse, nPos, motion, noiseStrength, color);

        this.x = random(-0.1, 1.1, true);
        this.y = random(-0.1, 1.1, true);
        this.z = random(0, 4);
        this.opacity = random(0.1, 1, true);
        this.flicker = 0;
        this.neighbors = [];
        this.particleSizeMultiplier = particleSizeMultiplier;
        this.particleSizeBase = particleSizeBase;
        this.flickerSmoothing = flickerSmoothing;
        this.renderParticleGlare = renderParticleGlare;
        this.glareOpacityMultiplier = glareOpacityMultiplier;
        this.glareAngle = glareAngle;
    }

    render() {
        const pos = position(this.canvas, this.mouse, this.nPos, this.motion, this.noiseStrength, this.x, this.y, this.z),
            r = (this.z * this.particleSizeMultiplier + this.particleSizeBase) * (sizeRatio(this.canvas) / 1000);
        let o = this.opacity;

        if (this.flicker) {
            const newVal = random(-0.5, 0.5, true);
            this.flicker += (newVal - this.flicker) / this.flickerSmoothing;
            if (this.flicker > 0.5) this.flicker = 0.5;
            if (this.flicker < -0.5) this.flicker = -0.5;
            o += this.flicker;
            if (o > 1) o = 1;
            if (o < 0) o = 0;
        }

        this.context.fillStyle = this.color;
        this.context.globalAlpha = o;
        this.context.beginPath();
        this.context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
        this.context.fill();
        this.context.closePath();

        if (this.renderParticleGlare) {
            this.context.globalAlpha = o * this.glareOpacityMultiplier;

            this.context.ellipse(pos.x, pos.y, r * 100, r, (this.glareAngle - (this.nPos.x - 0.5) * this.noiseStrength * this.motion) * (Math.PI / 180), 0, 2 * Math.PI, false);

            this.context.fill();
            this.context.closePath();
        }

        this.context.globalAlpha = 1;
    }
}
