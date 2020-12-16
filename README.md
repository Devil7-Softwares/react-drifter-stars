
# React Drifter Stars ![build](https://github.com/Devil7-Softwares/react-drifter-stars/workflows/build/badge.svg) ![npm](https://img.shields.io/npm/v/@devil7softwares/react-drifter-stars) ![license](https://img.shields.io/npm/l/@devil7softwares/react-drifter-stars) ![min](https://img.shields.io/bundlephobia/min/@devil7softwares/react-drifter-stars) ![minzip](https://img.shields.io/bundlephobia/minzip/@devil7softwares/react-drifter-stars)
`Drifter Stars by @cr0ybot ported to React with Typescript support`

## Quick Start
1. Install package from NPM
`npm install @devil7softwares/react-drifter-stars`
2. Import drifter stars in your component
`import DrifterStars from '@devil7softwares/react-drifter-stars'`
3. Add component to your JSX/TSX
`<DrifterStars />`
4. Import default stylesheet from package for default background. Or use your own css.
`import '@devil7softwares/react-drifter-stars/dist/styles.css'`

> Note: The component is transparent by default and takes full width and height of window. And can be used with your existing background.

## Options
> NOTE: All of the options below are optional.


|        Prop       |        Type       | Description                                                                                                                           |
|-------------------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| color             | string            | Color of particles, flare & lines.                                                                                                    |
| renderMesh        | boolean           | Specifies whether mesh should be rendered.                                                                                            |
| blurSize          | number            | Size of blur for overall canvas.                                                                                                      |
| particle          | IParticleOptions  | Particle related options.                                                                                                             |
| flare             | IFlareOptions     | Particle flare options.                                                                                                               |
| glare             | IGlareOptions     | Glare related options.                                                                                                                |
| links             | ILinkOptions      | Link generation options.                                                                                                              |
| motion            | IMotionOptions    | Motion/movement options.                                                                                                              |

### IParticleOptions
|        Prop       |        Type       | Description                                                                                                                           |
|-------------------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| render            | boolean           | Specifies whether particles should be rendered.                                                                                       |
| count             | number            | Count of the particles to generate.\nNOTE: Particles will be generated even if its not going to be rendered)                          |
| sizeBase          | number            | Base size for particles. Size of particle will be calculated as "Z-Axis x Multiplier + Base".                                         |
| sizeMultiplier    | number            | Multiplier for particle size calculation. Size of particle will be calculated as "Z-Axis x Multiplier + Base".                        |
| flickerSmoothing  | number            | Amount of smoothing to apply on flickering. Higher Value = Smoother Flicker.                                                          |

### IFlareOptions
|        Prop       |        Type       | Description                                                                                                                           |
|-------------------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| render            | boolean           | Specifies whether flares should be rendered.                                                                                          |
| count             | number            | Count of the flares to render.                                                                                                        |
| sizeBase          | number            | Base size for flare. Size of flare will be calculated as "Z-Axis x Multiplier + Base".                                                |
| sizeMultiplier    | number            | Multiplier for flare size calculation. Size of flare will be calculated as "Z-Axis x Multiplier + Base".                              |

### IGlareOptions
|        Prop       |        Type       | Description                                                                                                                           |
|-------------------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| render            | boolean           | Specifies whether particle glare should be rendered.                                                                                  |
| angle             | number            | Angle for glare to generate.                                                                                                          |
| opacityMultiplier | number            | Glare opacity multiplier.                                                                                                             |

### ILinkOptions
|        Prop       |        Type       | Description                                                                                                                           |
|-------------------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| render            | boolean           | Specifies whether links should be rendered.                                                                                           |
| lineWidth         | number            | Width of link line to generate.                                                                                                       |
| opacity           | number            | Opactity for link line. A number between 0 & 1.                                                                                       |
| chance            | number            | Probability for a new line to appear per frame. Higher Value = Smaller Chance.                                                        |
| fade              | number            | Number of frames for link to fade-out.                                                                                                |
| speed             | number            | Distance a link travels in 1 frame.                                                                                                   |
| minLength         | number            | Minimum number of particles to link when a new line is generated.                                                                     |
| maxLength         | number            | Maximum number of particles to link when a new line is generated.                                                                     |

### IMotionOptions
|        Prop       |        Type       | Description                                                                                                                           |
|-------------------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| ratio             | number            | Amount of motion to be generated. Default is 0.05.<br/>Used to generate motion based on mouse movement/device orientation changes.    |
| randomMotion      | boolean           | Enables random motions even without user interation.                                                                                  |
| noiseLength       | number            | Length of noice for random motion.                                                                                                    |
| noiseStrength     | number            | Strength of noice for random motion.                                                                                                  |

## Credits
 * Cory Hughart (@cr0ybot) - For original [Drifter Stars](https://codepen.io/cr0ybot/pen/zNyYeW) animation.
 * Steve Courtney - For Celsius GS's Drifter [poster art](http://celsiusgs.com/drifter/posters.php)
