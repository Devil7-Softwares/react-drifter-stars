import { Point } from './Point';

export class Entity {
    color: string;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    mouse: Point;
    nPos: Point;
    motion: number;
    noiseStrength: number;

    constructor(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        mouse: Point,
        nPos: Point,
        motion: number,
        noiseStrength: number,
        color: string
    ) {
        this.color = color;
        this.canvas = canvas;
        this.context = context;
        this.mouse = mouse;
        this.nPos = nPos;
        this.motion = motion;
        this.noiseStrength = noiseStrength;
    }
}
