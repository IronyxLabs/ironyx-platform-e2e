import { Given, When, Then } from '@cucumber/cucumber'
import assert from 'assert'

let x = 0;
let y = 0;
let result = 0;

Given('X = 1', () => {
    x = 1;
})

Given('Y = 1', () => {
    y = 1;
})

When('Adding X and Y', () => {
    result = x + y;
})

Then('Result is 2', () => {
    assert.strictEqual(result, 2);
}) 