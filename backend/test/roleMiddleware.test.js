const { test } = require('node:test');
const assert = require('node:assert/strict');

const roleMiddleware = require('../src/middleware/roleMiddleware');

function createResponse() {
    return {
        statusCode: null,
        body: null,

        status(code) {
            this.statusCode = code;
            return this;
        },

        json(payload) {
            this.body = payload;
            return this;
        }
    };
}

test('allows a user with an authorized role', () => {
    const middleware = roleMiddleware(['admin', 'setter']);
    const req = { user: { role: 'setter' } };
    const res = createResponse();
    let nextCalled = false;

    middleware(req, res, () => {
        nextCalled = true;
    });

    assert.equal(nextCalled, true);
    assert.equal(res.statusCode, null);
});

test('rejects a user with an unauthorized role', () => {
    const middleware = roleMiddleware(['admin']);
    const req = { user: { role: 'participant' } };
    const res = createResponse();
    let nextCalled = false;

    middleware(req, res, () => {
        nextCalled = true;
    });

    assert.equal(nextCalled, false);
    assert.equal(res.statusCode, 403);
    assert.equal(
        res.body.message,
        'Forbidden: insufficient permissions'
    );
});

test('rejects a request without a user role', () => {
    const middleware = roleMiddleware(['admin']);
    const req = {};
    const res = createResponse();

    middleware(req, res, () => {
        assert.fail('next() should not be called');
    });

    assert.equal(res.statusCode, 403);
});