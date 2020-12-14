export interface IFlareOptions {
    /**
     * Specifies whether flares should be rendered.
     */
    render?: boolean;

    /**
     * Count of the flares to render.
     */
    count?: number;

    /**
     * Base size for flare. Size of flare will be calculated as "Z-Axis x Multiplier + Base".
     */
    sizeBase?: number;

    /**
     * Multiplier for flare size calculation. Size of flare will be calculated as "Z-Axis x Multiplier + Base".
     */
    sizeMultiplier?: number;
}
