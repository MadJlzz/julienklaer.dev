export type StarfieldConfig = {
  /** Pixels² per star at runtime — lower = denser field. */
  density: number;
  /** Hard cap on stars regardless of viewport size. */
  maxStars: number;
  /** Minimum drift speed in px/frame. */
  speedMin: number;
  /** Random speed added on top of speedMin. */
  speedRange: number;
  /** Minimum depth (drives min brightness; range 0–1). */
  depthMin: number;
  /** Random depth added on top of depthMin. */
  depthRange: number;
  /** Twinkle phase increment per frame — higher = faster twinkle. */
  twinkleSpeed: number;
  /** Pixel size for "far" stars (depth < sizeThreshold). */
  sizeSmall: number;
  /** Pixel size for "near" stars (depth >= sizeThreshold). */
  sizeLarge: number;
  /** Depth boundary between sizeSmall and sizeLarge. */
  sizeThreshold: number;
  /** Star color as an "r, g, b" string. */
  color: string;
};

export const PRESETS = {
  /** Original — small (1–2px), slow drift, subtle ambient field. */
  ambient: {
    density: 9000,
    maxStars: 180,
    speedMin: 0.02,
    speedRange: 0.05,
    depthMin: 0.3,
    depthRange: 0.7,
    twinkleSpeed: 0.02,
    sizeSmall: 1,
    sizeLarge: 2,
    sizeThreshold: 0.5,
    color: '229, 233, 240',
  },
  /** Bigger and faster — chunkier stars (1–3px), more visible drift. */
  vivid: {
    density: 7000,
    maxStars: 220,
    speedMin: 0.05,
    speedRange: 0.10,
    depthMin: 0.4,
    depthRange: 0.6,
    twinkleSpeed: 0.04,
    sizeSmall: 1,
    sizeLarge: 3,
    sizeThreshold: 0.55,
    color: '229, 233, 240',
  },
} as const satisfies Record<string, StarfieldConfig>;

export const STARFIELD: StarfieldConfig = PRESETS.vivid;
