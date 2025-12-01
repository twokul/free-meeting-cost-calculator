# Meeting Cost Calculator

A tool to visualize the true cost of meetings by calculating total spend, mental tax from context switching, and meeting quality scores.

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Run tests
bun test
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## How It Works

This section explains the methodology behind each calculation. Understanding these formulas helps contributors improve the accuracy and add new metrics.

### Meeting Cost

**Formula:** `duration × (yourRate + (otherAttendees × blendedRate))`

Uses your hourly rate for yourself, and a blended average rate ($150/hr) for other attendees. This is more realistic than assuming everyone earns the same rate—a director's meeting still has mostly IC attendees.

```
Example: 1-hour meeting with 5 people, you at $100/hr
Cost = 1 × ($100 + 4 × $150) = $700
```

**Why blended rate?**

- A director ($500/hr) in a meeting with 4 engineers doesn't mean all 5 people cost $500/hr
- The $150/hr blended rate represents a typical org mix (engineers, PMs, designers)
- Your rate is used for you; blended rate for everyone else

### Mental Tax (Context Switching Cost)

**Formula:** `numberOfMeetings × 0.33 hours`

Each meeting fragments your workday. Research by Gloria Mark at UC Irvine found that it takes approximately **23 minutes to fully refocus** after an interruption. We use 20 minutes (0.33 hours) as a conservative estimate.

```
Example: 10 meetings in a week
Mental Tax = 10 × 0.33 = 3.3 hours lost to context switching
```

**Research Reference:**

- Mark, G., Gudith, D., & Klocke, U. (2008). "The Cost of Interrupted Work: More Speed and Stress"
- [UCI Study on Interruptions](https://www.ics.uci.edu/~gmark/chi08-mark.pdf)

### Meeting Quality Score

**Formula:** Start at 100, then apply penalties:

- **Duration penalty:** -20 points per hour over 1 hour
- **Attendee penalty:** -10 points per person over 6

```
Example: 2-hour meeting with 10 people
Score = 100 - (1 × 20) - (4 × 10) = 100 - 20 - 40 = 40/100
```

**Rationale:**

| Factor            | Threshold      | Why                                                                                                                                                    |
| ----------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Duration > 1 hour | -20 pts/hr     | Attention degrades significantly after 45-60 minutes. Meetings over 1 hour see diminishing returns.                                                    |
| Attendees > 6     | -10 pts/person | Amazon's "2-pizza rule": if you can't feed the group with 2 pizzas, it's too big. Large meetings reduce individual participation and decision quality. |

**Score Interpretation:**

- **80-100:** Well-structured meetings
- **60-79:** Room for improvement
- **Below 60:** Consider restructuring or making async

### Budget Burners (Cleanup Suggestions)

Meetings are flagged for review if they meet either criteria:

- **Cost exceeds 5× hourly rate** (represents 5+ person-hours of time)
- **Large meeting:** 10+ attendees AND 1+ hour duration

These are high-impact optimization targets.

## Project Structure

```
lib/
├── metrics.ts      # Core calculation functions (documented)
├── metrics.test.ts # Test suite
├── constants.ts    # Benchmarks and reference data
└── demo-data.ts    # Demo meeting generator
```

## Contributing

1. All calculation logic lives in `lib/metrics.ts` with JSDoc documentation
2. Run `bun test` before submitting PRs
3. If changing formulas, update both the code documentation and this README

## Tech Stack

- [Next.js 16](https://nextjs.org) - React framework
- [Bun](https://bun.sh) - Runtime and package manager
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Recharts](https://recharts.org) - Charts

## License

MIT
