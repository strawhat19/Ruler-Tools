import type { ToolIcon } from '../../shared/types';
import {
    X, Type, Code2, Gauge, Ruler, Search, Check, Globe, Heart, Menu, Info, Clock,
    SlidersHorizontal, Calculator, ArrowLeftRight, ExternalLink, ArrowRight,
    Bookmark, Compass, ScanLine, Palette, Pipette, Puzzle, Smartphone, ChevronDown, FileText, ShieldCheck,
} from 'lucide-react';

const icons = {
    x: X, type: Type, code: Code2, gauge: Gauge, ruler: Ruler,
    info: Info, clock: Clock, terms: FileText, shield: ShieldCheck,
    menu: Menu, heart: Heart, check: Check, globe: Globe, search: Search,
    scan: ScanLine, puzzle: Puzzle, palette: Palette, pipette: Pipette,
    compass: Compass, bookmark: Bookmark, calculator: Calculator,
    convert: ArrowLeftRight, phone: Smartphone, arrow: ArrowRight,
    external: ExternalLink, chevron: ChevronDown, filters: SlidersHorizontal,
};

export type IconName = ToolIcon | keyof typeof icons;

interface IconProps {
    id: string;
    name: IconName;
    size?: number;
    className?: string;
}

export default function Icon({ id, name, size = 20, className = `` }: IconProps) {
    const Glyph = icons[name];

    return (
        <Glyph
            id={id}
            size={size}
            aria-hidden={true}
            strokeWidth={1.8}
            className={`ruler-icon ${className}`}
        />
    );
}
