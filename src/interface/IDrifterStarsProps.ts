import { HTMLAttributes } from 'react';

import { IFlareOptions } from './IFlareOptions';
import { IGlareOptions } from './IGlareOptions';
import { ILinkOptions } from './ILinkOptions';
import { IMotionOptions } from './IMotionOptions';
import { IParticleOptions } from './IParticleOptions';

export interface IDrifterStarsProps extends HTMLAttributes<HTMLCanvasElement> {
    /**
     * Color of particles, flare & lines.
     */
    color?: string;

    /**
     * Specifies whether mesh should be rendered.
     */
    renderMesh?: boolean;

    /**
     * Size of blur for overall canvas.
     */
    blurSize?: number;

    /**
     * Particle related options.
     */
    particle?: IParticleOptions;

    /**
     * Particle flare options.
     */
    flare?: IFlareOptions;

    /**
     * Glare related options.
     */
    glare?: IGlareOptions;

    /**
     * Link generation options.
     */
    links?: ILinkOptions;

    /**
     * Motion/movement options.
     */
    motion?: IMotionOptions;

    /**
     * On every render the canvas size will be adusted to the window size. If you want to override this behavior, you can use this function.
     *
     * @param width Width of the canvas. Defaults to window.innerWidth.
     * @param height Height of the canvas. Defaults to window.innerHeight.
     * @returns Object containing width & height of the canvas.
     */
    transformCanvasSize?: (width: number, height: number) => { width: number; height: number };
}
