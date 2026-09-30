export type RulerMarqueeVariant = `slim` | `featured`;

export interface RulerMarqueeProps {
    id: string;
    variant?: RulerMarqueeVariant;
}

export const rulerUnitWidth = 80;
export const rulerDuration = 48000;
export const rulerCopies = [0, 1];
export const rulerTicks = Array.from({ length: 10 }, (_, index) => index);
export const rulerUnits = Array.from({ length: 24 }, (_, index) => index);

export const getRulerTickClass = (tick: number) => (
    tick === 0 ? `is-major` : tick === 5 ? `is-middle` : `is-minor`
);
