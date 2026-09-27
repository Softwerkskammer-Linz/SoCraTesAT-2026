# Agents Forget. Repos Remember.

**Own the agent team that builds your way.** A talk by Bernhard Woditschka at SoCraTes 2026 Linz.

What a good team knows by heart, an agent team needs in writing. The talk shows that step by step: a rules file, then skills, reviewers, specs, and automatic handoffs. The demo turns a bug report into a reviewed fix. On the eval bench, a feature costs about $9 and runs under half an hour, unattended.

## Links

- **Slides:** [open the talk in the browser](https://woditschka.github.io/agentic-coding-reference/deck/slides.html?v=talk#/title)
- **Repository:** [github.com/woditschka/agentic-coding-reference](https://github.com/woditschka/agentic-coding-reference)
- **Eval numbers:** [evals/results/TREND.md](../../evals/results/TREND.md)
- **One run, record by record:** [feature walkthrough](../feature-walkthrough.md)

## Try It

Clone the repository, then install the harness into a project with one command:

```bash
git clone https://github.com/woditschka/agentic-coding-reference.git
cd agentic-coding-reference
claude
> /materialize ../my-project
```

The runtime installs beside the project's own files. The testing, architecture, and security briefs carry the team's norms; the merge stays with the engineer.