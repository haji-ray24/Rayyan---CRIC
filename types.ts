export enum BowlerType {
  FAST = 'Fast Bowler',
  MEDIUM = 'Medium Pacer',
  OFF_SPIN = 'Off Spinner',
  LEG_SPIN = 'Leg Spinner'
}

export enum Line {
  WIDE_OUTSIDE_OFF = 'Wide Outside Off',
  OUTSIDE_OFF = 'Outside Off',
  STUMP_TO_STUMP = 'Stump to Stump',
  LEG_SIDE = 'Leg Side / Down Leg'
}

export enum Length {
  YORKER = 'Yorker',
  FULL = 'Full',
  GOOD = 'Good Length',
  SHORT = 'Short / Bouncer'
}

export interface ShotAdvice {
  shotName: string;
  description: string;
  executionTips: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
  placementAngle: number; // 0-360 degrees where 0 is straight down the ground (North)
  fieldingRegion: string; // e.g., "Deep Cover", "Long On"
}

export interface SimulationState {
  bowler: BowlerType;
  line: Line;
  length: Length;
}
