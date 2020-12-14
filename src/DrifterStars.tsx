import './css/styles.css';

import Delaunay from 'delaunay-fast';
import React, { MutableRefObject, useEffect, useRef } from 'react';

import { Flare, Link, Particle, Point } from './classes';
import { IDrifterStarsProps } from './interface';
import { noisePoint, position, random } from './utils';

const defaultProps = {
    color: '#FFEED4',
    noiseLength: 1000,
    particleCount: 40,
    flareCount: 10,
    motion: 0.05,
    particleSizeBase: 1,
    particleSizeMultiplier: 0.5,
    flareSizeBase: 100,
    flareSizeMultiplier: 100,
    lineWidth: 1,
    linkChance: 75,
    linkLengthMin: 5,
    linkLengthMax: 7,
    linkOpacity: 0.25,
    linkFade: 90,
    linkSpeed: 1, //
    glareAngle: -60,
    glareOpacityMultiplier: 0.05,
    renderParticles: true,
    renderParticleGlare: true,
    renderFlares: true,
    renderLinks: true,
    renderMesh: false,
    flickerSmoothing: 15,
    blurSize: 0,
    randomMotion: true,
    noiseStrength: 1,
};

/**
 * Drifter stars animation by @cr0ybot ported for React.
 */
export const DrifterStars: React.FC<IDrifterStarsProps> = (props: IDrifterStarsProps) => {
    const { color, flare, glare, links, motion, particle, blurSize, renderMesh } = props;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef: MutableRefObject<CanvasRenderingContext2D | null> = useRef<CanvasRenderingContext2D>(null);

    const animationHandleRef = useRef<number>(-1);

    const flaresRef: MutableRefObject<Flare[]> = useRef<Flare[]>([]);
    const linksRef: MutableRefObject<Link[]> = useRef<Link[]>([]);
    const particlesRef: MutableRefObject<Particle[]> = useRef<Particle[]>([]);
    const verticesRef: MutableRefObject<number[]> = useRef<number[]>([]);
    const mouseRef: MutableRefObject<Point> = useRef<Point>({ x: 0, y: 0 });
    const noicePositionRef: MutableRefObject<Point> = useRef<Point>({ x: 0, y: 0 });
    const noiseRef: MutableRefObject<number> = useRef<number>(0);

    function initialize() {
        if (canvasRef.current && contextRef.current) {
            const points: number[][] = [];

            flaresRef.current = [];
            linksRef.current = [];
            particlesRef.current = [];
            noiseRef.current = 0;

            resize();

            mouseRef.current.x = canvasRef.current.clientWidth / 2;
            mouseRef.current.y = canvasRef.current.clientHeight / 2;

            // Create particle positions
            for (let i = 0; i < (particle?.count || defaultProps.particleCount); i++) {
                const p: Particle = new Particle(
                    canvasRef.current,
                    contextRef.current,
                    mouseRef.current,
                    noicePositionRef.current,
                    motion?.ratio || defaultProps.motion,
                    motion?.noiseStrength || defaultProps.noiseStrength,
                    color || defaultProps.color,
                    particle?.sizeMultiplier || defaultProps.particleSizeMultiplier,
                    particle?.sizeBase || defaultProps.particleSizeBase,
                    particle?.flickerSmoothing || defaultProps.flickerSmoothing,
                    glare?.render || defaultProps.renderParticleGlare,
                    glare?.opacityMultiplier || defaultProps.glareOpacityMultiplier,
                    glare?.angle || defaultProps.glareAngle
                );
                particlesRef.current.push(p);
                points.push([p.x * 1000, p.y * 1000]);
            }

            // Delaunay triangulation
            verticesRef.current = Delaunay.triangulate(points);

            // Create an array of "triangles" (groups of 3 indices)
            const triangles: number[][] = [];
            let trianglePoints = [];
            for (let i = 0; i < verticesRef.current.length; i++) {
                if (trianglePoints.length == 3) {
                    triangles.push(trianglePoints);
                    trianglePoints = [];
                }
                trianglePoints.push(verticesRef.current[i]);
            }

            // Tell all the particles who their neighbors are
            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = 0; j < triangles.length; j++) {
                    // Check if this particle's index is in this triangle
                    // If it is, add its neighbors to the particles contacts list
                    if (triangles[j].indexOf(i) !== -1) {
                        triangles[j].forEach(function (value) {
                            if (value !== i && particlesRef.current[i].neighbors.indexOf(value) == -1) {
                                particlesRef.current[i].neighbors.push(value);
                            }
                        });
                    }
                }
            }

            if (flare?.render) {
                for (let i = 0; i < (flare?.count || defaultProps.flareCount); i++) {
                    flaresRef.current.push(
                        new Flare(
                            canvasRef.current,
                            contextRef.current,
                            mouseRef.current,
                            noicePositionRef.current,
                            motion?.ratio || defaultProps.motion,
                            motion?.noiseStrength || defaultProps.noiseStrength,
                            color || defaultProps.color,
                            flare.sizeMultiplier || defaultProps.flareSizeMultiplier,
                            flare.sizeBase || defaultProps.flareSizeBase
                        )
                    );
                }
            }

            // Motion mode
            if ('ontouchstart' in document.documentElement && window.DeviceOrientationEvent) {
                window.addEventListener(
                    'deviceorientation',
                    function (e) {
                        if (canvasRef.current && e.beta && e.gamma) {
                            mouseRef.current.x = canvasRef.current.clientWidth / 2 - (e.gamma / 90) * (canvasRef.current.clientWidth / 2) * 2;
                            mouseRef.current.y = canvasRef.current.clientHeight / 2 - (e.beta / 90) * (canvasRef.current.clientHeight / 2) * 2;
                        }
                    },
                    true
                );
            } else {
                document.body.addEventListener('mousemove', function (e) {
                    mouseRef.current.x = e.clientX;
                    mouseRef.current.y = e.clientY;
                });
            }

            (function animloop() {
                resize();
                render();

                animationHandleRef.current = requestAnimationFrame(animloop);
            })();
        }
    }

    function render() {
        if (canvasRef.current && contextRef.current) {
            if ((motion?.randomMotion == undefined && defaultProps.randomMotion) || motion?.randomMotion) {
                noiseRef.current++;
                if (noiseRef.current >= (motion?.noiseLength || defaultProps.noiseLength)) {
                    noiseRef.current = 0;
                }

                const nPos = noisePoint((Math.PI * 2) / (motion?.noiseLength || defaultProps.noiseLength), 100, noiseRef.current);
                noicePositionRef.current.x = nPos.x;
                noicePositionRef.current.y = nPos.y;
            }

            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            if ((blurSize || defaultProps.blurSize) > 0) {
                contextRef.current.shadowBlur = blurSize || defaultProps.blurSize;
                contextRef.current.shadowColor = color || defaultProps.color;
            }

            if (((particle?.render == undefined && defaultProps.renderParticles) || particle?.render) && particlesRef.current) {
                for (let i = 0; i < (particle?.count || defaultProps.particleCount); i++) {
                    particlesRef.current[i].render();
                }
            }

            if (renderMesh && particlesRef.current) {
                contextRef.current.beginPath();
                for (let v = 0; v < verticesRef.current.length - 1; v++) {
                    // Splits the array into triplets
                    if ((v + 1) % 3 === 0) {
                        continue;
                    }

                    const p1 = particlesRef.current[verticesRef.current[v]],
                        p2 = particlesRef.current[verticesRef.current[v + 1]];

                    const pos1 = position(canvasRef.current, mouseRef.current || { x: 0, y: 0 }, noicePositionRef.current, motion?.ratio || defaultProps.motion, motion?.noiseStrength || defaultProps.noiseStrength, p1.x, p1.y, p1.z),
                        pos2 = position(canvasRef.current, mouseRef.current || { x: 0, y: 0 }, noicePositionRef.current, motion?.ratio || defaultProps.motion, motion?.noiseStrength || defaultProps.noiseStrength, p2.x, p2.y, p2.z);

                    contextRef.current.moveTo(pos1.x, pos1.y);
                    contextRef.current.lineTo(pos2.x, pos2.y);
                }
                contextRef.current.strokeStyle = color || defaultProps.color;
                contextRef.current.lineWidth = links?.lineWidth || defaultProps.lineWidth;
                contextRef.current.stroke();
                contextRef.current.closePath();
            }

            if (((links?.render == undefined && defaultProps.renderLinks) || links?.render) && particlesRef.current && linksRef.current) {
                // Possibly start a new link
                const linkChance = links?.chance || defaultProps.linkChance;
                if (random(0, linkChance) == linkChance) {
                    const length = random(links?.minLength || defaultProps.linkLengthMin, links?.maxLength || defaultProps.linkLengthMax);
                    const start = random(0, particlesRef.current.length - 1);
                    startLink(start, length);
                }

                // Render existing links
                // Iterate in reverse so that removing items doesn't affect the loop
                for (let l = linksRef.current.length - 1; l >= 0; l--) {
                    if (linksRef.current[l] && !linksRef.current[l].finished) {
                        linksRef.current[l].render();
                    } else {
                        delete linksRef.current[l];
                    }
                }
            }

            if (((flare?.render == undefined && defaultProps.renderFlares) || flare?.render) && flaresRef.current) {
                for (let j = 0; j < flaresRef.current.length; j++) {
                    flaresRef.current[j].render();
                }
            }
        }
    }

    function resize() {
        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        }
    }

    function startLink(vertex: number, length: number) {
        if (canvasRef.current && contextRef.current && particlesRef.current) {
            linksRef.current.push(
                new Link(
                    canvasRef.current,
                    contextRef.current,
                    mouseRef.current || { x: 0, y: 0 },
                    noicePositionRef.current,
                    motion?.ratio || defaultProps.motion,
                    motion?.noiseStrength || defaultProps.noiseStrength,
                    color || defaultProps.color,
                    vertex,
                    length,
                    particlesRef.current,
                    links?.speed || defaultProps.linkSpeed,
                    links?.fade || defaultProps.linkFade,
                    links?.opacity || defaultProps.linkOpacity,
                    links?.lineWidth || defaultProps.lineWidth
                )
            );
        }
    }

    useEffect(() => {
        if (canvasRef != null && canvasRef.current != null) {
            contextRef.current = canvasRef.current.getContext('2d');
            initialize();
        }

        return () => {
            if (animationHandleRef.current != -1) {
                cancelAnimationFrame(animationHandleRef.current);
            }
        };
    }, [canvasRef, canvasRef.current, props]);

    return <canvas className='drifter-stars' width='300' height='300' ref={canvasRef}></canvas>;
};
