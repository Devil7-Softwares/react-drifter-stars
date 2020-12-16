import '../css/stories.css';

import React from 'react';

import { DrifterStars } from '../DrifterStars';

const StarsStory = (args: Args) => (
    <DrifterStars
        className={args.className}
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
    className: string | undefined;
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

export const CustomBackground = StarsStory.bind({});
CustomBackground.args = { ...Basic.args, className: 'stories-gradiant' };

export default {
    title: 'Drifter Stars',
    component: DrifterStars,
    argTypes: {
        color: { control: { type: 'color' } },
        noiseLength: { control: { type: 'number', min: 100, max: 5000, step: 100 } },
        particleCount: { control: { type: 'number', min: 5, max: 500, step: 1 } },
        flareCount: { control: { type: 'number', min: 1, max: 10, step: 1 } },
        motionRatio: { control: { type: 'number', min: 0.01, max: 5, step: 0.1 } },
        particleSizeBase: { control: { type: 'number', min: 0, max: 5, step: 1 } },
        particleSizeMultiplier: { control: { type: 'number', min: 0.1, max: 5, step: 0.1 } },
        flareSizeBase: { control: { type: 'number', min: 5, max: 50, step: 1 } },
        flareSizeMultiplier: { control: { type: 'number', min: 100, max: 500, step: 100 } },
        lineWidth: { control: { type: 'number', min: 1, max: 10, step: 1 } },
        linkChance: { control: { type: 'number', min: 10, max: 100, step: 5 } },
        linkLengthMin: { control: { type: 'number', min: 3, max: 10, step: 1 } },
        linkLengthMax: { control: { type: 'number', min: 5, max: 20, step: 1 } },
        linkOpacity: { control: { type: 'number', min: 0, max: 1, step: 0.1 } },
        linkFade: { control: { type: 'number', min: 10, max: 180, step: 10 } },
        linkSpeed: { control: { type: 'number', min: 1, max: 5, step: 1 } }, //
        glareAngle: { control: { type: 'number', min: -359, max: 359, step: 1 } },
        glareOpacityMultiplier: { control: { type: 'number', min: 0, max: 1, step: 0.1 } },
        renderParticles: { control: { type: 'boolean' } },
        renderParticleGlare: { control: { type: 'boolean' } },
        renderFlares: { control: { type: 'boolean' } },
        renderLinks: { control: { type: 'boolean' } },
        renderMesh: { control: { type: 'boolean' } },
        flickerSmoothing: { control: { type: 'number', min: 5, max: 20, step: 1 } },
        blurSize: { control: { type: 'number', min: 0, max: 10, step: 1 } },
        randomMotion: { control: { type: 'boolean' } },
        noiseStrength: { control: { type: 'number', min: 1, max: 5, step: 1 } },
    },
};
