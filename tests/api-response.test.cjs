const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');

const compiled = ts.transpileModule(readFileSync('src/lib/api-response.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const context = { exports: {} };
vm.runInNewContext(compiled, context);
const { isEventId, readOptionalResource } = context.exports;

test('rejects malformed event IDs before any request', () => {
    for (const id of ['abc', '', 'g'.repeat(24), '../all-events', 'a'.repeat(23), 'a'.repeat(25)]) {
        assert.equal(isEventId(id), false);
    }
    assert.equal(isEventId('0123456789abcdefABCDEF01'), true);
});

test('recognizes missing resources in each backend response format', async () => {
    for (const response of [
        new Response('Not found', { status: 404 }),
        new Response('Gone', { status: 410 }),
        new Response(null, { status: 204 }),
        new Response(''), new Response('  '), new Response('null'),
    ]) assert.equal(await readOptionalResource(response), null);
});

test('preserves an existing resource', async () => {
    const event = { _id: '0123456789abcdefABCDEF01', title: 'Community cleanup' };
    assert.equal(JSON.stringify(await readOptionalResource(Response.json(event))), JSON.stringify(event));
});

test('does not disguise authentication or service failures as missing resources', async () => {
    for (const status of [401, 403, 429, 500, 503]) {
        await assert.rejects(readOptionalResource(new Response('', { status })), new RegExp(`HTTP ${status}`));
    }
});

test('invalid JSON triggers an error instead of being treated as a missing event', async () => {
    await assert.rejects(readOptionalResource(new Response('<html>upstream error</html>')));
});
