import { DataTable, Given, Then, When } from '@cucumber/cucumber'
import { faker } from '@faker-js/faker'
import { strict as assert } from 'node:assert'
import { Registration } from '../../src/models/registration.js'
import { servicIndexDriver } from '../support/drivers.js'
import { setError } from './error.steps.js'

let registrations: Registration[] = []

Given('Service has been registered', async (table: DataTable) => {
    const rows = table.rowsHash()

    await servicIndexDriver.registrateAsnyc(rows.name, rows.uri, [{ type: rows.type, version: rows.version }])
})

Given('Service has been registered with name {string}', async (name: string) => {
    await servicIndexDriver.registrateAsnyc(name, faker.internet.url(), [{ type: faker.lorem.word(), version: faker.system.semver() }])
})

When('Registrating service', async (table: DataTable) => {
    const rows = table.rowsHash()

    const types = [{ type: rows.type, version: rows.version }]
    if (rows.new_version !== undefined) {
        types.push({ type: rows.type, version: rows.new_version })
    }
    try {
        await servicIndexDriver.registrateAsnyc(rows.new_name ?? rows.name, rows.uri, types)
    } catch (e) {
      setError(e);
    }
})

When('Unregistrating service with name {string}', async (name: string) => {
    await servicIndexDriver.unregistrateAsync(name)
})

Then('Service should be registered with name {string}', async (name: string) => {
    if (registrations.length == 0) {
        registrations = await servicIndexDriver.getAsync()
    }

    assert.equal(registrations.length, 1)
    assert.deepEqual(registrations[0].Name, name)
})

Then('Service should be registered', async (table: DataTable) => {
    if (registrations.length == 0) {
        registrations = await servicIndexDriver.getAsync()
    }

    const rows = table.rowsHash()
    assert.equal(registrations.length, 1)

    assert.deepEqual(registrations[0].Name, rows.name)
    assert.deepEqual(registrations[0].Uri, rows.uri)
    assert.deepEqual(registrations[0].Types[0].Type, rows.type)
    assert.deepEqual(registrations[0].Types[0].Version, rows.version)
})

Then('Registration should be skipped', async () => {
    if (registrations.length == 0) {
        registrations = await servicIndexDriver.getAsync()
    }

    assert.equal(registrations.length, 1)
})

Then('Service should not be registered with name {string}', async (name: string) => {
    if (registrations.length == 0) {
        registrations = await servicIndexDriver.getAsync()
    }

    assert.equal(
        registrations.find((r) => r.Name === name),
        undefined
    )
})
