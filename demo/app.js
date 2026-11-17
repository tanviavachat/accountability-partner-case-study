/* Every example in this file is fictional demonstration data. */
const scenarios = [
  {
    id: 'separate',
    short: 'One finish, one unfinished',
    title: 'A finished post and an unfinished video',
    context: 'The two deliverables are assessed separately. The unfinished video cannot erase the published post.',
    day: { items: [
      { id: 'post', kind: 'artifact', label: 'Fictional: published a short product post', status: 'published' },
      { id: 'video', kind: 'artifact', label: 'Fictional: video draft still in editing', status: 'in_progress' },
    ] },
  },
  {
    id: 'correction',
    short: 'Correct an overstatement',
    title: '“Shipped” became “still testing”',
    context: 'A newer correction changes this feature’s status. Partial work remains visible, but it earns no proof.',
    day: {
      items: [{ id: 'feature', kind: 'feature', label: 'Fictional: new memory feature', status: 'verified' }],
      corrections: [{ targetId: 'feature', status: 'still_testing' }],
    },
  },
  {
    id: 'learning',
    short: 'Watching versus learning',
    title: 'A tutorial and an applied explanation',
    context: 'Passive viewing is useful, but the skill brick needs a demonstrated takeaway.',
    day: { items: [
      { id: 'watch', kind: 'learning', label: 'Fictional: watched a retrieval tutorial', status: 'completed', applied: false },
      { id: 'explain', kind: 'learning', label: 'Fictional: explained when retrieval helps this product', status: 'completed', applied: true },
    ] },
  },
  {
    id: 'rest',
    short: 'A difficult day',
    title: 'Rest can still count',
    context: 'A completed action that protects capacity can earn foundation without being forced into career output.',
    day: { items: [{ id: 'rest', kind: 'capacity', label: 'Fictional: chose intentional rest', status: 'completed' }] },
  },
  {
    id: 'choice',
    short: 'Respect an opt-out',
    title: 'The person declines a brick',
    context: 'Even eligible evidence does not override an explicit choice to withhold the award.',
    day: {
      items: [{ id: 'post', kind: 'artifact', label: 'Fictional: published a post', status: 'published' }],
      withheld: ['proof'],
    },
  },
];

const list = document.getElementById('scenarios');
const title = document.getElementById('result-heading');
const context = document.getElementById('context');
const decisions = document.getElementById('decisions');
const bricks = document.getElementById('bricks');

function showScenario(scenario) {
  for (const button of list.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(button.dataset.id === scenario.id));
  }
  const result = EvidenceDemo.evaluateDay(scenario.day);
  title.textContent = scenario.title;
  context.textContent = scenario.context;
  decisions.replaceChildren();
  for (const decision of result.decisions) {
    const row = document.createElement('article');
    row.className = 'decision';
    const detail = document.createElement('div');
    const label = document.createElement('h3');
    label.textContent = decision.label;
    const explanation = document.createElement('p');
    explanation.textContent = decision.reason;
    detail.append(label, explanation);
    const tag = document.createElement('span');
    tag.className = decision.type ? 'tag earned' : 'tag';
    tag.textContent = decision.type || 'No brick';
    row.append(detail, tag);
    decisions.append(row);
  }
  bricks.textContent = result.bricks.length ? result.bricks.join(' · ') : 'None';
}

for (const scenario of scenarios) {
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.id = scenario.id;
  button.textContent = scenario.short;
  button.addEventListener('click', () => showScenario(scenario));
  list.append(button);
}
showScenario(scenarios[0]);
