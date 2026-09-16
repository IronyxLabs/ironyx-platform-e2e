import { DataTable, Given, When } from "@cucumber/cucumber";
import { Configuration } from "../../src/models/configuration.js";
import { servicIndexDriver } from "../support/drivers.js";
import assert from "assert";
import { setError } from "./error.steps.js";

let configuration: Configuration;

Given('Requesting service configuration by canonical type', async (table: DataTable) => {
  const rows = table.rowsHash()

  try {
    configuration = await servicIndexDriver.getConfigurationAsync(rows.type, rows.version);    
  } catch (e) {
    setError(e);
  }
})

When('Service configuration should be returned', async (table: DataTable) => {
  const rows = table.rowsHash();

  assert.equal(configuration.Uri, rows.uri);
})