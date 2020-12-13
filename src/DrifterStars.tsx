import './css/styles.css';

import Delaunay from 'delaunay-fast';
import React, { useEffect, useRef, useState } from 'react';

import { Flare, Link, Particle, Point } from './classes';
import { IDrifterStartsProps } from './interface';
import { noisePoint, position, random } from './utils';

export const DrifterStars: React.FC<IDrifterStartsProps> = ({
    color = '#FFEED4',
    noiseLength = 1000,
    particleCount = 40,
    flareCount = 10,
    motion = 0.05,
    particleSizeBase = 1,
    particleSizeMultiplier = 0.5,
    flareSizeBase = 100,
    flareSizeMultiplier = 100,
    lineWidth = 1,
    linkChance = 75, // chance per frame of link, higher = smaller chance
    linkLengthMin = 5, // min linked vertices
    linkLengthMax = 7, // max linked vertices
    linkOpacity = 0.25, // number between 0 & 1
    linkFade = 90, // link fade-out frames
    linkSpeed = 1, // distance a link travels in 1 frame
    glareAngle = -60,
    glareOpacityMultiplier = 0.05,
    renderParticles = true,
    renderParticleGlare = true,
    renderFlares = true,
    renderLinks = true,
    renderMesh = false,
    flickerSmoothing = 15, // higher = smoother flicker
    blurSize = 0,
    randomMotion = true,
    noiseStrength = 1,
}: IDrifterStartsProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>();
    const [context, setContext] = useState<CanvasRenderingContext2D | null>();

    useEffect(() => {
        setCanvas(canvasRef.current);
    }, []);

    useEffect(() => {
        if (canvas != null) {
            setContext(canvas.getContext('2d'));
        }
    }, [canvas]);

    useEffect(() => {
        let animationHandle = -1;
        if (canvas != null && context != null) {
            const mouse: Point = { x: 0, y: 0 },
                c = 1000, // multiplier for delaunay points, since floats too small can mess up the algorithm
                nAngle = (Math.PI * 2) / noiseLength,
                nRad = 100,
                points: number[][] = [],
                triangles: number[][] = [],
                links: Link[] = [],
                particles: Particle[] = [],
                flares: Flare[] = [];

            let n = 0,
                nPos: Point = { x: 0, y: 0 },
                vertices: number[] = [];

            function initialize() {
                if (canvas && context) {
                    // Size canvas
                    resize();

                    mouse.x = canvas.clientWidth / 2;
                    mouse.y = canvas.clientHeight / 2;

                    // Create particle positions
                    for (let i = 0; i < particleCount; i++) {
                        const p: Particle = new Particle(
                            canvas,
                            context,
                            mouse,
                            nPos,
                            motion,
                            noiseStrength,
                            color,
                            particleSizeMultiplier,
                            particleSizeBase,
                            flickerSmoothing,
                            renderParticleGlare,
                            glareOpacityMultiplier,
                            glareAngle
                        );
                        particles.push(p);
                        points.push([p.x * c, p.y * c]);
                    }

                    // Delaunay triangulation
                    vertices = Delaunay.triangulate(points);

                    // Create an array of "triangles" (groups of 3 indices)
                    let tri = [];
                    for (let i = 0; i < vertices.length; i++) {
                        if (tri.length == 3) {
                            triangles.push(tri);
                            tri = [];
                        }
                        tri.push(vertices[i]);
                    }

                    // Tell all the particles who their neighbors are
                    for (let i = 0; i < particles.length; i++) {
                        // Loop through all tirangles
                        for (let j = 0; j < triangles.length; j++) {
                            // Check if this particle's index is in this triangle
                            // If it is, add its neighbors to the particles contacts list
                            if (triangles[j].indexOf(i) !== -1) {
                                triangles[j].forEach(function (value) {
                                    if (
                                        value !== i &&
                                        particles[i].neighbors.indexOf(value) ==
                                            -1
                                    ) {
                                        particles[i].neighbors.push(value);
                                    }
                                });
                            }
                        }
                    }

                    if (renderFlares) {
                        // Create flare positions
                        for (let i = 0; i < flareCount; i++) {
                            flares.push(
                                new Flare(
                                    canvas,
                                    context,
                                    mouse,
                                    nPos,
                                    motion,
                                    noiseStrength,
                                    color,
                                    flareSizeMultiplier,
                                    flareSizeBase
                                )
                            );
                        }
                    }

                    // Motion mode
                    //if (Modernizr && Modernizr.deviceorientation) {
                    if (
                        'ontouchstart' in document.documentElement &&
                        window.DeviceOrientationEvent
                    ) {
                        console.log('Using device orientation');
                        window.addEventListener(
                            'deviceorientation',
                            function (e) {
                                if (e.beta && e.gamma) {
                                    mouse.x =
                                        canvas.clientWidth / 2 -
                                        (e.gamma / 90) *
                                            (canvas.clientWidth / 2) *
                                            2;
                                    mouse.y =
                                        canvas.clientHeight / 2 -
                                        (e.beta / 90) *
                                            (canvas.clientHeight / 2) *
                                            2;
                                }
                            },
                            true
                        );
                    } else {
                        // Mouse move listener
                        console.log('Using mouse movement');
                        document.body.addEventListener(
                            'mousemove',
                            function (e) {
                                mouse.x = e.clientX;
                                mouse.y = e.clientY;
                            }
                        );
                    }

                    // Animation loop
                    (function animloop() {
                        resize();
                        render();

                        animationHandle = requestAnimationFrame(animloop);
                    })();
                }
            }

            function render() {
                if (canvas && context) {
                    if (randomMotion) {
                        n++;
                        if (n >= noiseLength) {
                            n = 0;
                        }

                        nPos = noisePoint(nAngle, nRad, n);
                    }

                    // Clear
                    context.clearRect(0, 0, canvas.width, canvas.height);

                    if (blurSize > 0) {
                        context.shadowBlur = blurSize;
                        context.shadowColor = color;
                    }

                    if (renderParticles) {
                        // Render particles
                        for (let i = 0; i < particleCount; i++) {
                            particles[i].render();
                        }
                    }

                    if (renderMesh) {
                        // Render all lines
                        context.beginPath();
                        for (let v = 0; v < vertices.length - 1; v++) {
                            // Splits the array into triplets
                            if ((v + 1) % 3 === 0) {
                                continue;
                            }

                            const p1 = particles[vertices[v]],
                                p2 = particles[vertices[v + 1]];

                            const pos1 = position(
                                    canvas,
                                    mouse,
                                    nPos,
                                    motion,
                                    noiseStrength,
                                    p1.x,
                                    p1.y,
                                    p1.z
                                ),
                                pos2 = position(
                                    canvas,
                                    mouse,
                                    nPos,
                                    motion,
                                    noiseStrength,
                                    p2.x,
                                    p2.y,
                                    p2.z
                                );

                            context.moveTo(pos1.x, pos1.y);
                            context.lineTo(pos2.x, pos2.y);
                        }
                        context.strokeStyle = color;
                        context.lineWidth = lineWidth;
                        context.stroke();
                        context.closePath();
                    }

                    if (renderLinks) {
                        // Possibly start a new link
                        if (random(0, linkChance) == linkChance) {
                            const length = random(linkLengthMin, linkLengthMax);
                            const start = random(0, particles.length - 1);
                            startLink(start, length);
                        }

                        // Render existing links
                        // Iterate in reverse so that removing items doesn't affect the loop
                        for (let l = links.length - 1; l >= 0; l--) {
                            if (links[l] && !links[l].finished) {
                                links[l].render();
                            } else {
                                delete links[l];
                            }
                        }
                    }

                    if (renderFlares) {
                        // Render flares
                        for (let j = 0; j < flareCount; j++) {
                            flares[j].render();
                        }
                    }
                }
            }

            function resize() {
                if (canvas) {
                    canvas.width =
                        window.innerWidth * (window.devicePixelRatio || 1);
                    canvas.height =
                        canvas.width *
                        (canvas.clientHeight / canvas.clientWidth);
                }
            }

            function startLink(vertex: number, length: number) {
                if (canvas && context) {
                    links.push(
                        new Link(
                            canvas,
                            context,
                            mouse,
                            nPos,
                            motion,
                            noiseStrength,
                            color,
                            vertex,
                            length,
                            particles,
                            linkSpeed,
                            linkFade,
                            linkOpacity,
                            lineWidth
                        )
                    );
                }
            }

            initialize();
        }

        return () => {
            if (animationHandle != -1) {
                cancelAnimationFrame(animationHandle);
            }
        };
    }, [context]);

    return (
        <canvas id='stars' width='300' height='300' ref={canvasRef}></canvas>
    );
};
