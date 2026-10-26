const { test } = require('node:test');
const assert = require('node:assert/strict');

const {
    hashPassword,
    comparePassword
} = require('../src/utils/passwordHelper');

test('password hashing verifies correct and incorrect passwords', async () => {
    const password = 'correct-password-123';

    const hashedPassword = await hashPassword(password);

    assert.notEqual(hashedPassword, password);

    assert.equal(
        await comparePassword(password, hashedPassword),
        true
    );

    assert.equal(
        await comparePassword('wrong-password', hashedPassword),
        false
    );
});