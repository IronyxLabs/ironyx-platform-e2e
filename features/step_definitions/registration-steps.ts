import { Given, Then, When } from '@cucumber/cucumber'

Given('Service has been registered with name {string}', (name: string) => {
    return true;
})

When('Unregistrating service with name {string}', (name: string) => {
    return true;
})

Then('Service should not be registered with name {string}', (name: string) => {
    return true;
})
