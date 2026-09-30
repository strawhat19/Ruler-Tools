import type { Tool, ToolCategory } from './types';

export const categories: ToolCategory[] = [
    { id: `calculators`, name: `Calculators`, icon: `calculator`, description: `Make the numbers work` },
    { id: `measuring`, name: `Measuring`, icon: `ruler`, description: `Get the right dimensions` },
    { id: `leveling`, name: `Level & angle`, icon: `gauge`, description: `Find your balance` },
    { id: `converters`, name: `Converters`, icon: `convert`, description: `From this to that` },
    { id: `design`, name: `Color & design`, icon: `palette`, description: `A little creative precision` },
    { id: `developer`, name: `Developer tools`, icon: `code`, description: `Work smarter with code` },
];

// Launch URLs are the tools' official websites or store listings. No live API is used.
export const tools: Tool[] = [
    {
        id: `desmos`, name: `Desmos Scientific`, icon: `calculator`, color: `green`,
        category: `calculators`, platform: `website`, platformLabel: `Website`, featured: true,
        description: `Big equations. Clear answers. A capable scientific calculator right in your browser.`,
        url: `https://www.desmos.com/scientific`, tags: [`math`, `scientific`, `calculator`, `functions`],
    },
    {
        id: `apple-measure`, name: `Apple Measure`, icon: `scan`, color: `gold`,
        category: `measuring`, platform: `app`, platformLabel: `iPhone & iPad`, featured: true,
        description: `Turn your camera into a tape measure for everyday objects and spaces.`,
        url: `https://apps.apple.com/us/app/measure/id1383426740`, tags: [`camera`, `ruler`, `distance`, `ios`, `apple`],
    },
    {
        id: `page-ruler`, name: `Page Ruler`, icon: `ruler`, color: `blue`,
        category: `measuring`, platform: `extension`, platformLabel: `Chrome extension`, featured: true,
        description: `Measure elements, spacing, and pixel dimensions directly on any webpage.`,
        url: `https://chromewebstore.google.com/detail/page-ruler/jcbmcnpepaddcedmjdcmhbekjhbfnlff`,
        tags: [`screen`, `pixels`, `ruler`, `dimensions`, `chrome`],
    },
    {
        id: `bubble-level`, name: `Bubble Level`, icon: `gauge`, color: `orange`,
        category: `leveling`, platform: `app`, platformLabel: `Android`, featured: true,
        description: `Straighten the shelf. Hang the frame. Check alignment with your phone.`,
        url: `https://play.google.com/store/apps/details?id=fr.avianey.level`, tags: [`level`, `bubble`, `angle`, `android`],
    },
    {
        id: `unit-converters`, name: `UnitConverters`, icon: `convert`, color: `purple`,
        category: `converters`, platform: `website`, platformLabel: `Website`, featured: true,
        description: `Length, weight, temperature, and more. Get from one unit to another in a moment.`,
        url: `https://www.unitconverters.net/`, tags: [`units`, `length`, `weight`, `temperature`, `conversion`],
    },
    {
        id: `coolors`, name: `Coolors`, icon: `palette`, color: `pink`,
        category: `design`, platform: `website`, platformLabel: `Website`, featured: true,
        description: `Find your next palette, extract image colors, and check color contrast.`,
        url: `https://coolors.co/`, tags: [`palette`, `colors`, `contrast`, `design`],
    },
    {
        id: `calculator-net`, name: `Calculator.net`, icon: `calculator`, color: `blue`,
        category: `calculators`, platform: `website`, platformLabel: `Website`,
        description: `A handy collection of calculators for everyday math, finance, fitness, and science.`,
        url: `https://www.calculator.net/`, tags: [`finance`, `math`, `fitness`, `calculator`],
    },
    {
        id: `iruler`, name: `iRuler`, icon: `ruler`, color: `gold`,
        category: `measuring`, platform: `website`, platformLabel: `Website`,
        description: `An onscreen ruler in inches and centimeters, with calibration for your screen.`,
        url: `https://iruler.net/`, tags: [`screen`, `ruler`, `inches`, `centimeters`, `calibration`],
    },
    {
        id: `colorzilla`, name: `ColorZilla`, icon: `pipette`, color: `purple`,
        category: `design`, platform: `extension`, platformLabel: `Chrome extension`,
        description: `Pick a color from any webpage and explore its values, palettes, and gradients.`,
        url: `https://www.colorzilla.com/chrome/`, tags: [`color`, `eyedropper`, `palette`, `css`, `chrome`],
    },
    {
        id: `pcalc`, name: `PCalc`, icon: `calculator`, color: `orange`,
        category: `calculators`, platform: `app`, platformLabel: `iPhone & iPad`,
        description: `Scientific calculations, unit conversions, and programmer functions in your pocket.`,
        url: `https://apps.apple.com/us/app/pcalc/id284666222`, tags: [`scientific`, `calculator`, `rpn`, `ios`],
    },
    {
        id: `clinometer`, name: `Clinometer`, icon: `compass`, color: `green`,
        category: `leveling`, platform: `app`, platformLabel: `iPhone & iPad`,
        description: `Measure slopes and relative angles with clinometer, camera, and bubble-level modes.`,
        url: `https://apps.apple.com/us/app/clinometer-bubble-level/id286215117`, tags: [`angle`, `slope`, `level`, `ios`],
    },
    {
        id: `whatfont`, name: `WhatFont`, icon: `type`, color: `pink`,
        category: `design`, platform: `extension`, platformLabel: `Chrome extension`,
        description: `Meet the font behind a website. Hover over text to inspect its type and styles.`,
        url: `https://chromewebstore.google.com/detail/whatfont/jabopobgcpjmedljpbcaablpmlmfcogm`,
        tags: [`font`, `type`, `typography`, `design`, `chrome`],
    },
    {
        id: `regex101`, name: `regex101`, icon: `code`, color: `blue`,
        category: `developer`, platform: `website`, platformLabel: `Website`,
        description: `Build and debug regular expressions with clear explanations and match details.`,
        url: `https://regex101.com/`, tags: [`regex`, `regular expression`, `code`, `developer`],
    },
    {
        id: `cyberchef`, name: `CyberChef`, icon: `code`, color: `green`,
        category: `developer`, platform: `website`, platformLabel: `Website`,
        description: `A browser workbench for encoding, hashing, compression, and data transformations.`,
        url: `https://gchq.github.io/CyberChef/`, tags: [`encode`, `hash`, `data`, `code`, `developer`],
    },
];
