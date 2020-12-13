import { position, random } from '../utils';
import { Entity } from './Entity';
import { Particle } from './Particle';
import { Point } from './Point';

export class Link extends Entity {
    length: number;
    verts: number[];
    stage: number;
    linked: number[];
    distances: number[];
    traveled: number;
    fade: number;
    finished: boolean;
    particles: Particle[];
    linkSpeed: number;
    linkFade: number;
    linkOpacity: number;
    lineWidth: number;

    constructor(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        mouse: Point,
        nPos: Point,
        motion: number,
        noiseStrength: number,
        color: string,
        startVertex: number,
        length: number,
        particles: Particle[],
        linkSpeed: number,
        linkFade: number,
        linkOpacity: number,
        lineWidth: number
    ) {
        super(canvas, context, mouse, nPos, motion, noiseStrength, color);

        this.length = length;
        this.verts = [startVertex];
        this.stage = 0;
        this.linked = [startVertex];
        this.distances = [];
        this.traveled = 0;
        this.fade = 0;
        this.finished = false;
        this.particles = particles;
        this.linkSpeed = linkSpeed;
        this.linkFade = linkFade;
        this.linkOpacity = linkOpacity;
        this.lineWidth = lineWidth;
    }

    drawLine(points: number[][], alpha: number = this.linkOpacity) {
        if (points.length > 1 && alpha > 0) {
            this.context.globalAlpha = alpha;
            this.context.beginPath();
            for (let i = 0; i < points.length - 1; i++) {
                this.context.moveTo(points[i][0], points[i][1]);
                this.context.lineTo(points[i + 1][0], points[i + 1][1]);
            }
            this.context.strokeStyle = this.color;
            this.context.lineWidth = this.lineWidth;
            this.context.stroke();
            this.context.closePath();
            this.context.globalAlpha = 1;
        }
    }

    render() {
        // Stages:
        // 0. Vertex collection
        // 1. Render line reaching from vertex to vertex
        // 2. Fade out
        // 3. Finished (delete me)

        let i, p, pos: Point, points: number[][];

        switch (this.stage) {
            // VERTEX COLLECTION STAGE
            case 0:
                // Grab the last member of the link
                const last = this.particles[this.verts[this.verts.length - 1]];

                if (last && last.neighbors && last.neighbors.length > 0) {
                    // Grab a random neighbor
                    const neighbor = last.neighbors[random(0, last.neighbors.length - 1)];
                    // If we haven't seen that particle before, add it to the link
                    if (this.verts.indexOf(neighbor) == -1) {
                        this.verts.push(neighbor);
                    }
                    // If we have seen that particle before, we'll just wait for the next frame
                } else {
                    this.stage = 3;
                    this.finished = true;
                }

                if (this.verts.length >= this.length) {
                    // Calculate all distances at once
                    for (i = 0; i < this.verts.length - 1; i++) {
                        const p1 = this.particles[this.verts[i]],
                            p2 = this.particles[this.verts[i + 1]],
                            dx = p1.x - p2.x,
                            dy = p1.y - p2.y,
                            dist = Math.sqrt(dx * dx + dy * dy);

                        this.distances.push(dist);
                    }

                    this.stage = 1;
                }
                break;

            // RENDER LINE ANIMATION STAGE
            case 1:
                if (this.distances.length > 0) {
                    points = [];
                    //var a = 1;

                    // Gather all points already linked
                    for (i = 0; i < this.linked.length; i++) {
                        p = this.particles[this.linked[i]];
                        pos = position(this.canvas, this.mouse, this.nPos, this.motion, this.noiseStrength, p.x, p.y, p.z);
                        points.push([pos.x, pos.y]);
                    }

                    const linkSpeedRel = this.linkSpeed * 0.00001 * this.canvas.width;
                    this.traveled += linkSpeedRel;
                    const d = this.distances[this.linked.length - 1];
                    // Calculate last point based on linkSpeed and distance travelled to next point
                    if (this.traveled >= d) {
                        this.traveled = 0;
                        // We've reached the next point, add coordinates to array

                        this.linked.push(this.verts[this.linked.length]);
                        p = this.particles[this.linked[this.linked.length - 1]];
                        pos = position(this.canvas, this.mouse, this.nPos, this.motion, this.noiseStrength, p.x, p.y, p.z);
                        points.push([pos.x, pos.y]);

                        if (this.linked.length >= this.verts.length) {
                            this.stage = 2;
                        }
                    } else {
                        // We're still travelling to the next point, get coordinates at travel distance
                        // http://math.stackexchange.com/a/85582
                        const a = this.particles[this.linked[this.linked.length - 1]],
                            b = this.particles[this.verts[this.linked.length]],
                            t = d - this.traveled,
                            x = (this.traveled * b.x + t * a.x) / d,
                            y = (this.traveled * b.y + t * a.y) / d,
                            z = (this.traveled * b.z + t * a.z) / d;

                        pos = position(this.canvas, this.mouse, this.nPos, this.motion, this.noiseStrength, x, y, z);

                        points.push([pos.x, pos.y]);
                    }

                    this.drawLine(points);
                } else {
                    this.stage = 3;
                    this.finished = true;
                }
                break;

            // FADE OUT STAGE
            case 2:
                if (this.verts.length > 1) {
                    if (this.fade < this.linkFade) {
                        this.fade++;

                        // Render full link between all vertices and fade over time
                        points = [];
                        const alpha = (1 - this.fade / this.linkFade) * this.linkOpacity;
                        for (i = 0; i < this.verts.length; i++) {
                            p = this.particles[this.verts[i]];
                            pos = position(this.canvas, this.mouse, this.nPos, this.motion, this.noiseStrength, p.x, p.y, p.z);
                            points.push([pos.x, pos.y]);
                        }
                        this.drawLine(points, alpha);
                    } else {
                        this.stage = 3;
                        this.finished = true;
                    }
                } else {
                    this.stage = 3;
                    this.finished = true;
                }
                break;

            // FINISHED STAGE
            case 3:
            default:
                this.finished = true;
                break;
        }
    }
}
