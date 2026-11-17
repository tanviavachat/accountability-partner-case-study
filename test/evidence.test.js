const test = require('node:test');
const assert = require('node:assert/strict');
const { evaluateDay } = require('../src/evidence.js');

test('a separate unfinished video does not erase a published post', () => {
  const result = evaluateDay({ items: [
    { id: 'post', kind: 'artifact', label: 'Fictional published post', status: 'published' },
    { id: 'video', kind: 'artifact', label: 'Fictional unfinished video', status: 'in_progress' },
  ] });
  assert.deepEqual(result.bricks, ['proof']);
  assert.equal(result.decisions[0].type, 'proof');
  assert.equal(result.decisions[1].type, null);
});

test('a correction retracts only its target', () => {
  const result = evaluateDay({
    items: [
      { id: 'feature', kind: 'feature', label: 'Fictional app feature', status: 'verified' },
      { id: 'post', kind: 'artifact', label: 'Fictional published post', status: 'published' },
    ],
    corrections: [{ targetId: 'feature', status: 'still_testing' }],
  });
  assert.equal(result.decisions[0].type, null);
  assert.equal(result.decisions[0].status, 'still_testing');
  assert.equal(result.decisions[1].type, 'proof');
  assert.deepEqual(result.bricks, ['proof']);
});

test('a passive video earns no skill; a completed explanation does', () => {
  const result = evaluateDay({ items: [
    { id: 'watch', kind: 'learning', label: 'Fictional watched tutorial', status: 'completed', applied: false },
    { id: 'explain', kind: 'learning', label: 'Fictional explained a retrieval tradeoff', status: 'completed', applied: true },
  ] });
  assert.equal(result.decisions[0].type, null);
  assert.equal(result.decisions[1].type, 'skill');
  assert.deepEqual(result.bricks, ['skill']);
});

test('completed rest can be a foundation on a hard day', () => {
  const result = evaluateDay({ items: [
    { id: 'rest', kind: 'capacity', label: 'Fictional intentional rest', status: 'completed' },
  ] });
  assert.deepEqual(result.bricks, ['foundation']);
});

test('an explicit opt-out overrides otherwise eligible evidence', () => {
  const result = evaluateDay({
    items: [{ id: 'post', kind: 'artifact', label: 'Fictional published post', status: 'published' }],
    withheld: ['proof'],
  });
  assert.deepEqual(result.bricks, []);
  assert.match(result.decisions[0].reason, /chose not to take/);
});

test('multiple eligible results still earn at most one proof brick', () => {
  const result = evaluateDay({ items: [
    { id: 'one', kind: 'artifact', label: 'Fictional post', status: 'published' },
    { id: 'two', kind: 'artifact', label: 'Fictional report', status: 'published' },
  ] });
  assert.deepEqual(result.bricks, ['proof']);
});
