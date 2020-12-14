export interface ILinkOptions {
    /**
     * Specifies whether links should be rendered.
     */
    render?: boolean;

    /**
     * Width of link line to generate.
     */
    lineWidth?: number;

    /**
     * Opactity for link line. A number between 0 & 1.
     */
    opacity?: number;

    /**
     * Probability for a new line to appear per frame. Higher Value = Smaller Chance.
     */
    chance?: number;

    /**
     * Number of frames for link to fade-out.
     */
    fade?: number;

    /**
     * Distance a link travels in 1 frame.
     */
    speed?: number;

    /**
     * Minimum number of particles to link when a new line is generated.
     */
    minLength?: number;

    /**
     * Maximum number of particles to link when a new line is generated.
     */
    maxLength?: number;
}
