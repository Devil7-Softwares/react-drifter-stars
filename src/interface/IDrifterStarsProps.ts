import { IFlareOptions } from './IFlareOptions';
import { IGlareOptions } from './IGlareOptions';
import { ILinkOptions } from './ILinkOptions';
import { IMotionOptions } from './IMotionOptions';
import { IParticleOptions } from './IParticleOptions';

export interface IDrifterStarsProps {
    /**
     * Color of particles, flare & lines.
     */
    color?: string;

    /**
     * Specifies whether mesh should be rendered.
     */
    renderMesh?: boolean;

    /**
     * Size of blur.
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
}
