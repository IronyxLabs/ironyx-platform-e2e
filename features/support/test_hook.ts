import { Before, World } from "@cucumber/cucumber";
import { CustomWorld } from "./world.js";
import { ServiceIndexDriver } from "../../src/drivers/service-index-driver.js";

Before(async function (this: CustomWorld) {
    ServiceIndexDriver.initialize(this.parameters.serviceIndexUri);
})