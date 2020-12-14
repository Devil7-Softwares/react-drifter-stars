import React from 'react';

import { DrifterStars } from '../DrifterStars';

const StarsStory = (args: Args) => (
    <DrifterStars
        color={args.color}
        motion={{
            ratio: args.motionRatio,
            noiseLength: args.noiseLength,
            randomMotion: args.randomMotion,
            noiseStrength: args.noiseStrength,
        }}
        particle={{
            render: args.renderParticles,
            count: args.particleCount,
            sizeBase: args.particleSizeBase,
            sizeMultiplier: args.particleSizeMultiplier,
            flickerSmoothing: args.flickerSmoothing,
        }}
        flare={{
            render: args.renderFlares,
            count: args.flareCount,
            sizeBase: args.flareSizeBase,
            sizeMultiplier: args.flareSizeMultiplier,
        }}
        links={{
            render: args.renderLinks,
            lineWidth: args.lineWidth,
            chance: args.linkChance,
            minLength: args.linkLengthMin,
            maxLength: args.linkLengthMax,
            opacity: args.linkOpacity,
            fade: args.linkFade,
            speed: args.linkSpeed,
        }}
        glare={{
            render: args.renderParticleGlare,
            angle: args.glareAngle,
            opacityMultiplier: args.glareOpacityMultiplier,
        }}
        renderMesh={args.renderMesh}
        blurSize={args.blurSize}
    />
);

interface Args {
    color: string;
    noiseLength: number;
    particleCount: number;
    flareCount: number;
    motionRatio: number;
    particleSizeBase: number;
    particleSizeMultiplier: number;
    flareSizeBase: number;
    flareSizeMultiplier: number;
    lineWidth: number;
    linkChance: number;
    linkLengthMin: number;
    linkLengthMax: number;
    linkOpacity: number;
    linkFade: number;
    linkSpeed: number;
    glareAngle: number;
    glareOpacityMultiplier: number;
    renderParticles: boolean;
    renderParticleGlare: boolean;
    renderFlares: boolean;
    renderLinks: boolean;
    renderMesh: boolean;
    flickerSmoothing: number;
    blurSize: number;
    randomMotion: boolean;
    noiseStrength: number;
}

export const Basic = StarsStory.bind({});
Basic.args = {
    color: '#FFEED4',
    noiseLength: 1000,
    particleCount: 40,
    flareCount: 10,
    motionRatio: 0.05,
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

export default {
    title: 'Drifter Stars',
    component: DrifterStars,
    argTypes: {
        color: { control: { type: 'color' } },
    },
};
