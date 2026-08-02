import { DataTable, Given, Then, When } from '@cucumber/cucumber'
import { strict as assert } from 'node:assert'
import { ServiceIndexDriver } from '../../src/drivers/service-index-driver.js'
import { Registration } from '../../src/models/registration.js'

let registrations: Registration[] = []

Given('Service has been registered', async (table: DataTable) => {
    var rows = table.rowsHash()

    await ServiceIndexDriver.registrateAsnyc(rows.name, rows.uri, rows.type, rows.version)
})

When('Registrating service', async (table: DataTable) => {
    var rows = table.rowsHash()

    await ServiceIndexDriver.registrateAsnyc(rows.name, rows.uri, rows.type, rows.version)
})

Then('Service should be registered with name {string}', async (name: string) => {
    if (registrations.length == 0) {
        registrations = await ServiceIndexDriver.getAsync()
    }

    assert.equal(registrations.length, 1)
    assert.deepEqual(registrations[0].Name, name)
})

Then('Service should be registered', async (table: DataTable) => {
    if (registrations.length == 0) {
        registrations = await ServiceIndexDriver.getAsync()
    }

    var rows = table.rowsHash()
    assert.equal(registrations.length, 1)

    assert.deepEqual(registrations[0].Name, rows.name)
    assert.deepEqual(registrations[0].Uri, rows.uri)
    assert.deepEqual(registrations[0].Types[0].Type, rows.type)
    assert.deepEqual(registrations[0].Types[0].Version, rows.version)
})
