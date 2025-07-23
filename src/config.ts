import { GameOptionDeclaration, GameOptionValueType, Preset } from "./types";

export const GameOptions = {
    "audio.master": new GameOptionDeclaration("", GameOptionValueType.FLOAT, { minValue: 0, maxValue: 5 }) // Add for testing, remove later
} satisfies Record<string, GameOptionDeclaration>;

export type GameOptionKey = keyof typeof GameOptions;

export const BuiltInPresets: Preset[] = [
    {
        category: "audio",
        name: "",
        optionsOverrides: {
            "audio.master": 0.5
        }
    } // Add for testing, remove later
];
