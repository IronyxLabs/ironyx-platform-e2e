import { Given, Then, When } from '@cucumber/cucumber'
import { ServiceIndexDriver } from '../../src/drivers/service-index-driver';

Given('Service has been registered with name {string}', async (name: string) => {
    await new ServiceIndexDriver().registrate(name);
})

When('Unregistrating service with name {string}', (name: string) => {
    return true;
})

Then('Service should not be registered with name {string}', (name: string) => {
    return true;
})
