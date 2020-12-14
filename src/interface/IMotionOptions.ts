export interface IMotionOptions {
    /**
     * Amount of motion to be generated. Default is 0.05. Used to generate motion based on mouse movement/device orientation changes.
     */
    ratio?: number;

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
