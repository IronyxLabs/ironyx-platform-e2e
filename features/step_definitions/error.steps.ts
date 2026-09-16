import { Then } from "@cucumber/cucumber";
import assert from "assert";

let error: any;

export function setError(parameter: any) {
  error = parameter;
}

Then('Error should be occured: {string}', async (message: string) => {
    assert.equal(error.rawMessage, message)
})