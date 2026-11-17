# Accountability Partner: an AI product case study

**A private daily companion that rewards evidence, accepts corrections, and keeps personal history under the owner's control.**

I built this product while learning AI by building. This repository is a public case study and a small, runnable rule demo. The working app, its source history, and all personal records remain private. The [product deep dive video](https://www.youtube.com/watch?v=bRUY81JT3tY) shows the product story.

> **Privacy boundary:** Every daily entry in this repository is **fictional demonstration data**. No real journal, transcript, account, private memory, or production configuration is included. The demo runs entirely in your browser, makes no network requests, and saves nothing.

## The product problem

Most accountability tools confuse activity with progress. Watching a video, starting a feature, and publishing something are different outcomes. A useful AI companion should recognize the difference, remain humane on difficult days, and let the person correct an overstatement without losing the underlying work.

## Three product decisions

### 1. Make progress evidence-based

The product distinguishes **foundation** (capacity actions), **skill** (demonstrated learning), and **proof** (a finished result outside the person's head). An unfinished deliverable does not cancel a separate finished one. A published post can count as proof even if a video discussed the same day remains unfinished. Intentions and passive consumption do not earn proof.

The [live fictional rule demo](https://tanviavachat.github.io/accountability-partner-case-study/demo/) lets you try these edge cases. Its small [rule engine](src/evidence.js) and [tests](test/evidence.test.js) are a simplified, independent illustration of the decision logic, not the private production source.

### 2. Let corrections change the record

When someone says “still testing” or retracts a completion claim, the companion must revise that specific claim. It should keep a separately completed artifact intact. Saved memory is interpreted with dates and source context; a newer correction takes precedence over an older summary. A single difficult day is not a permanent trait.

The demo shows targeted corrections. The private app also handles dated summaries and original user passages; those records and the retrieval implementation are not published here.

### 3. Make cross-device memory private by design

The working app stores personal history in an authenticated, owner-scoped account. Its sync checks revisions so an older device cannot silently overwrite newer work. Raw sent words have a separate private archive; audio is discarded after transcription. The public demo has no account, sync, AI call, or storage. It illustrates the product decision without creating a second copy of anyone's records.

```text
Private working app → authenticated owner account → private records
Public case study   → fictional examples only  → no personal storage
```

## Try the demonstration

Open the [live demo](https://tanviavachat.github.io/accountability-partner-case-study/demo/), or open `demo/index.html` locally. Choose a fictional scenario to see the evidence, correction, and resulting brick decision. No setup keys or dependencies are needed.

To run the rule tests, use Node.js 18 or newer:

```bash
node --test test/evidence.test.js
```

## What this demonstrates about my work

- **Product judgment:** deciding what constitutes meaningful progress and where a game mechanic could mislead.
- **AI product design:** specifying evidence, correction, date, and privacy behavior around an AI conversation.
- **Execution:** building and testing a working companion, then making a focused public demonstration that protects its users.

The [video](https://www.youtube.com/watch?v=bRUY81JT3tY) is the public product walkthrough. My [YouTube channel](https://www.youtube.com/@OneThingLedtoAnother1) documents the broader learning-by-building journey.

## Scope and honesty

This is a deliberately small portfolio sample. It does not run the production app or verify its private database from this repository. The rules in `src/evidence.js` are illustrative and deterministic; they are not an AI model, a transcript of a real day, or a claim that every production edge case is solved. No user data is needed to review or run this repository.
