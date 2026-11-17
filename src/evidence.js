/* Fictional, standalone illustration of accountability rules. No user data or network access. */
(function attach(root, factory) {
  const rules = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = rules;
  root.EvidenceDemo = rules;
}(typeof globalThis !== 'undefined' ? globalThis : this, function build() {
  const TYPES = ['foundation', 'skill', 'proof'];

  function evaluateDay(day) {
    const items = Array.isArray(day && day.items) ? day.items : [];
    const corrections = Array.isArray(day && day.corrections) ? day.corrections : [];
    const withheld = new Set(Array.isArray(day && day.withheld) ? day.withheld : []);
    const latestCorrection = new Map();
    for (const correction of corrections) {
      if (correction && typeof correction.targetId === 'string') {
        latestCorrection.set(correction.targetId, correction.status);
      }
    }

    const decisions = items.map(item => {
      const status = latestCorrection.get(item.id) || item.status;
      let type = null;
      let reason = '';
      if (item.kind === 'capacity') {
        if (status === 'completed') type = 'foundation';
        else reason = 'A capacity action must be completed.';
      } else if (item.kind === 'learning') {
        if (status === 'completed' && item.applied === true) type = 'skill';
        else reason = 'Learning needs a completed session and an explained or applied takeaway.';
      } else if (item.kind === 'artifact') {
        if (status === 'published') type = 'proof';
        else reason = 'A draft or unfinished artifact has not crossed its finish line.';
      } else if (item.kind === 'feature') {
        if (status === 'verified') type = 'proof';
        else reason = 'A feature needs a working result verified against defined scenarios.';
      } else {
        reason = 'No award rule matches this activity.';
      }
      if (type && withheld.has(type)) {
        reason = 'The person chose not to take this brick.';
        type = null;
      }
      return { id: item.id, label: item.label, status, type, reason: reason || `${type} evidence met.` };
    });

    // At most one brick of each kind per day. Keep all individual decisions visible.
    const bricks = TYPES.filter(type => decisions.some(decision => decision.type === type));
    return { decisions, bricks };
  }

  return { evaluateDay };
}));
