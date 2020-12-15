import { Point } from '../classes';

export function sizeRatio(canvas: HTMLCanvasElement): number {
    return canvas.width >= canvas.height ? canvas.width : canvas.height;
}

export function random(min: number, max: number, float = false): number {
    return float ? Math.random() * (max - min) + min : Math.floor(Math.random() * (max - min + 1)) + min;
}

export function noisePoint(nAngle: number, nRad: number, i: number): Point {
    const a = nAngle * i,
        cosA = Math.cos(a),
        sinA = Math.sin(a),
        rad = nRad;
    return {
        x: rad * cosA,
        y: rad * sinA,
    };
}

export function position(canvas: HTMLCanvasElement, mouse: Point, nPos: Point, motion: number, noiseStrength: number, x: number, y: number, z: number): Point {
    return {
        x: x * canvas.width + (canvas.width / 2 - mouse.x + (nPos.x - 0.5) * noiseStrength) * z * motion,
        y: y * canvas.height + (canvas.height / 2 - mouse.y + (nPos.y - 0.5) * noiseStrength) * z * motion,
    };
}

export * from './Delaynay';
