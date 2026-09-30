# When AI Reviewers Fight
Day Two, 26th Sept. 2026, 12:00, room 15-05

Slides: [WaRF — When AI Reviewers Fight](./warf_talk.pdf)

## The idea

Ask five LLM code reviewers with different personas about the same change and they disagree. WaRF (Weighted n-Agent Reliability Framework) decides how much each of them counts, and when you have heard enough:

* Each vote is weighted by that agent's track record **in that kind of code**: a per-domain reliability estimate that updates whenever a human says what the right verdict was.
* The weighted votes add up in a sequential probability ratio test (SPRT, so called "Stop test"). The review stops as soon as the evidence crosses a boundary, often after three of the five agents.
* Every verdict comes with a confidence level. HIGH means a boundary was crossed. MEDIUM and LOW mean the panel ran out first, and "check this one yourself" is then the honest answer.

## What we found

* **Two trusted reviewers agreeing is not evidence.** The two highest-weighted security reviewers at the time both approved a urllib3 TLS change ([commit](https://github.com/urllib3/urllib3/commit/d48061505e72271116c5a33b04dbca6273f2a737)) that upstream reverted twelve days later ([revert](https://github.com/urllib3/urllib3/commit/1e94feb2a671bf28721114dfea1105a2c1f91788)). Their weights dropped. Nobody tuned anything by hand.
* **The confidence levels mean something, so far.** On 62 human-labelled reviews, LOW was right 27% of the time, MEDIUM 63% and HIGH 75%. One corpus, small samples: provisional.
* **Five copies of one persona are one opinion counted five times.** On the same 12 files the mixed panel got 11 right, five AUDITORs 10, five SKEPTICs 10. A tie on accuracy, but only the clones were wrong at HIGH confidence. Cloning one persona is a bet on that persona.
* **Letting the agents debate mostly changes the confidence, not the answer.** In six debates the verdict changed once, for the better. Four times a debate lifted the verdict to HIGH, and three of those four verdicts were wrong. Persuasion is not correctness.
* **A persona needs a bar, not just a lens.** "Look for missing tests" produced an agent that rejected all 38 labelled reviews it took part in: a vote that carries no information.

## More

* Code, session data and docs: https://github.com/teymurheydarov/WaRF
* Technical write-up: [warf_technical.pdf](https://github.com/teymurheydarov/WaRF/blob/main/slides/warf_technical.pdf)
* Plain-language guide: [GUIDE.md](https://github.com/teymurheydarov/WaRF/blob/main/GUIDE.md)

Slides CC BY 4.0, Teymur Heydarov.
