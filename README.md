# BulkBypasser
Proof of concept annoying Bulk AdLink workaround

PS - My personal API from this has been removed as it is a proof of concept and isnt released for malicious usage
ALSO PS - adlinks.txt is also removed for privacy reasons

Below here is AI slop

> **Status:** Archived / legacy proof-of-concept  
> **Purpose:** Educational security research + automation practice on legacy link-shortener / redirect flows.

This repository contains a small Node.js utility I built to process a list of shortened/redirect-style links in bulk and record how they resolve. It was originally written to understand how certain *legacy* link-shortener ecosystems handled redirects and client-side checks, and to practise building a reliable batch-processing pipeline (I/O, HTTP requests, error handling, logging).

⚠️ **Responsible use only:** This project is shared for portfolio/research purposes. It is **not intended to facilitate abuse** of monetised link services or to bypass protections on systems you do not own or have permission to test. Do not use it on targets without explicit authorisation.

---

## What it does (high level)

- Reads input URLs from `adlinks.txt`
- Processes each URL sequentially
- Requests resolution/analysis via an external resolver endpoint (legacy behaviour)
- Writes the resulting resolution data to `bypassedLinks.txt` (one JSON blob per line)

---

## Why it’s on my portfolio

This repo demonstrates:

- **Batch automation** (file ingestion → processing → output)
- **HTTP client usage** with `axios`
- **Basic resilience** (per-link try/catch, continues on failures)
- **Practical understanding of redirect chains** and why client-side-only checks tend to be weak in adversarial settings
- Thinking in terms of **defensive takeaways** (see mitigations)

---

## Tech stack

- **Node.js**
- `axios` for HTTP requests
- File I/O with `fs`
- Path handling with `path`

---

## Project structure

- `Main.js` — main script
- `adlinks.txt` — input list (one URL per line)
- `bypassedLinks.txt` — output results (JSON per line)
- `package.json` — dependencies

---

## Security / ethics note

This is a **legacy PoC**. In a modern defensive security context, the key lesson is:

- If a protection relies mainly on **client-side logic** (timers, simple JS checks, referrer tricks), it is typically not a strong control against scripted clients.
- Robust designs move enforcement **server-side** with signed tokens, expiry, rate limiting, and anomaly detection.

**If you’re a service owner**, typical mitigations include:
- Server-side validation (avoid “security by JavaScript”)
- Signed, short-lived tokens bound to request context
- Rate limiting + reputation/abuse detection
- Bot challenges and behavioural signals (carefully, privacy-aware)
- Monitoring for automated traffic patterns

---

## Suggested clean-up before publishing

If you plan to make this public on GitHub:

1. Add a `.gitignore` (example below)
2. Consider replacing any hard-coded external resolver endpoint with:
   - a placeholder,
   - an environment variable,
   - or a mocked local service,
   so the repo remains a “research artifact” rather than an operational tool.

Example `.gitignore`:

```gitignore
node_modules/
*.log
.DS_Store
.env
bypassedLinks.txt
