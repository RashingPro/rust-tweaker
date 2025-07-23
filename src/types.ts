export enum GameOptionValueType {
    BOOLEAN,
    INTEGER,
    FLOAT
}

export interface GameOptionDeclarationOptions {
    minValue: number;
    maxValue: number;
    availableValues: number[];
}

export class GameOptionDeclarationError extends Error {
    constructor(message?: string) {
        super(message);
    }
}

export class GameOptionDeclaration {
    constructor(
        public readonly description: string,
        public readonly type: GameOptionValueType,
        options?: Partial<GameOptionDeclarationOptions>,
        public readonly useless: boolean = false
    ) {
        if (options.minValue > options.maxValue)
            throw new GameOptionDeclarationError("minValue must be less than maxValue");
        if ((options.minValue || options.maxValue) && options.availableValues)
            throw new GameOptionDeclarationError("availableValues must not be set when minValue or maxValue set too");
        if (options.availableValues !== undefined && options.availableValues.length == 0)
            throw new GameOptionDeclarationError("availableValues must contain at least one element");
        if (type == GameOptionValueType.BOOLEAN) {
            if (options.availableValues !== undefined || options.minValue || options.maxValue)
                throw new GameOptionDeclarationError("These options incompatible with type BOOLEAN");
        }
    }
}

export interface Preset {
    name: string;
    category: Lowercase<string>;
    optionsOverrides: Record<string, number | boolean>;
}

export interface PresetProfile {
    name: string;
    presets: Preset[];
}
