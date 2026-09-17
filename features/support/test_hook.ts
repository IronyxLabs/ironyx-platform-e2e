import { Before } from '@cucumber/cucumber'
import { servicIndexDriver } from './drivers.js'
import { CustomWorld } from './world.js'

Before(async function (this: CustomWorld) {
    servicIndexDriver.initialize(this.parameters.serviceIndexUri)
})
