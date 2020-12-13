export interface IDrifterStarsProps {
    /**
     * Count of the particles to generate.
     * NOTE: Particles will be generated even if its not going to be rendered)
     */
    particleCount?: number;
    /**
     * Count of the flares to render.
     */
    flareCount?: number;
    /**
     * Amount of motion to be generated. Default is 0.05.
     */
    motion?: number;
    /**
     * Color of particles, flare & lines.
     */
    color?: string;
    /**
     * Base size for particles. Size of particle will be calculated as "Z-Axis x Multiplier + Base".
     */
    particleSizeBase?: number;
    /**
     * Multiplier for particle size calculation. Size of particle will be calculated as "Z-Axis x Multiplier + Base".
     */
    particleSizeMultiplier?: number;
    /**
     * Base size for flare. Size of flare will be calculated as "Z-Axis x Multiplier + Base".
     */
    flareSizeBase?: number;
    /**
     * Multiplier for flare size calculation. Size of flare will be calculated as "Z-Axis x Multiplier + Base".
     */
    flareSizeMultiplier?: number;
    /**
     * Width of link line to generate.
     */
    lineWidth?: number;
    /**
     * Probability for a new line to appear per frame. Higher Value = Smaller Chance.
     */
    linkChance?: number;
    /**
     * Minimum number of particles to link when a new line is generated.
     */
    linkLengthMin?: number;
    /**
     * Maximum number of particles to link when a new line is generated.
     */
    linkLengthMax?: number;
    /**
     * Opactity for link line. A number between 0 & 1.
     */
    linkOpacity?: number;
    /**
     * Number of frames for link to fade-out.
     */
    linkFade?: number;
    /**
     * Distance a link travels in 1 frame.
     */
    linkSpeed?: number;
    /**
     * Angle for glare to generate.
     */
    glareAngle?: number;
    /**
     * Glare opacity multiplier.
     */
    glareOpacityMultiplier?: number;
    /**
     * Specifies whether particles should be rendered.
     */
    renderParticles?: boolean;
    /**
     * Specifies whether particle glare should be rendered.
     */
    renderParticleGlare?: boolean;
    /**
     * Specifies whether flares should be rendered.
     */
    renderFlares?: boolean;
    /**
     * Specifies whether links should be rendered.
     */
    renderLinks?: boolean;
    /**
     * Specifies whether mesh should be rendered.
     */
    renderMesh?: boolean;
    /**
     * Amount of smoothing to apply on flickering. Higher Value = Smoother Flicker.
     */
    flickerSmoothing?: number;
    /**
     * Size of blur.
     */
    blurSize?: number;
    /**
     * Enables random motions even without user interation.
     */
    randomMotion?: boolean;
    /**
     * Length of noice for random motion.
     */
    noiseLength?: number;
    /**
     * Strength of noice for random motion.
     */
    noiseStrength?: number;
}
