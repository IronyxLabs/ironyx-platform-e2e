import { setWorldConstructor, World } from "@cucumber/cucumber";

interface WorldConfig {
    serviceIndexUri: string;
}

export class CustomWorld extends World {
    config: WorldConfig;

    constructor(options: any) {
        super(options);

        this.config = options.parameters;
    }
}

setWorldConstructor(CustomWorld);