import { Entity } from './Entity';
import { Point } from './Point';

export class EntityWithLocation extends Entity {
    x: number;
    y: number;
    z: number;
    opacity: number;

    constructor(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        mouse: Point,
        nPos: Point,
        motion: number,
        noiseStrength: number,
        color: string
    ) {
        super(canvas, context, mouse, nPos, motion, noiseStrength, color);
    }
}
