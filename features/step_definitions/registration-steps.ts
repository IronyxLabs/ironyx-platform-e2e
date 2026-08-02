import { DataTable, Given, Then, When } from '@cucumber/cucumber'
import { strict as assert } from 'node:assert'
import { ServiceIndexDriver } from '../../src/drivers/service-index-driver.js'
import { Registration } from '../../src/models/registration.js'
import { Reply } from '../../src/generated/Generic_pb.js';

let reply: Reply;
let registrations: Registration[] = []

Given('Service has been registered', async (table: DataTable) => {
    const rows = table.rowsHash()

    await ServiceIndexDriver.registrateAsnyc(rows.name, rows.uri, [{ type: rows.type, version: rows.version }])
})

When('Registrating service', async (table: DataTable) => {
  const rows = table.rowsHash()

  const types = [{ type: rows.type, version: rows.version }]
  if (rows.new_version !== undefined)
  {
    types.push({ type: rows.type, version: rows.new_version })
  }
  reply = await ServiceIndexDriver.registrateAsnyc(rows.new_name ?? rows.name, rows.uri, types)
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

    const rows = table.rowsHash()
    assert.equal(registrations.length, 1)

    assert.deepEqual(registrations[0].Name, rows.name)
    assert.deepEqual(registrations[0].Uri, rows.uri)
    assert.deepEqual(registrations[0].Types[0].Type, rows.type)
    assert.deepEqual(registrations[0].Types[0].Version, rows.version)
})

Then('Error should be occured: {string}', async (message: string) => {
  assert.notEqual(reply.error, undefined)
})

Then('Registration should be skipped', async () => {  
  if (registrations.length == 0) {
      registrations = await ServiceIndexDriver.getAsync()
  }
  
  assert.equal(registrations.length, 1)
})
