import { Given, When, Then } from '@cucumber/cucumber'
import assert from 'assert'

let x = 0;
let y = 0;
let result = 0;

Given('X = {int}', (parameter: number) => {
    x = parameter;
})

Given('Y = {int}', (parameter: number) => {
    y = parameter;
})

When('Adding X and Y', () => {
    result = x + y;
})

Then('Result is {int}', (expected: number) => {
    assert.strictEqual(result, expected);
}) 