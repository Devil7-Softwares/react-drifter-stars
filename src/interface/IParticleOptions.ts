export interface IParticleOptions {
    /**
     * Specifies whether particles should be rendered.
     */
    render?: boolean;

    /**
     * Count of the particles to generate.
     * NOTE: Particles will be generated even if its not going to be rendered)
     */
    count?: number;

    /**
     * Base size for particles. Size of particle will be calculated as "Z-Axis x Multiplier + Base".
     */
    sizeBase?: number;

    /**
     * Multiplier for particle size calculation. Size of particle will be calculated as "Z-Axis x Multiplier + Base".
     */
    sizeMultiplier?: number;

    /**
     * Amount of smoothing to apply on flickering. Higher Value = Smoother Flicker.
     */
    flickerSmoothing?: number;
}
