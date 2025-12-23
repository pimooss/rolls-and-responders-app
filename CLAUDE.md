# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Rolls & Responders** is an interactive tabletop exercise application for testing cybersecurity incident response plans. Based on the NCSC New Zealand "Rolls & Responders" framework (Creative Commons Attribution 4.0 NZ).

The app simulates incident response scenarios with dice-based mechanics (D20 system), allowing teams to practice their response procedures in a structured, gamified format.

### Official NCSC Resources

- **Main Resource Page**: https://www.ncsc.govt.nz/protect-your-organisation/rolls-and-responders/
- **NCSC Homepage**: https://www.ncsc.govt.nz/

## Development Commands

```bash
# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Architecture

### Dual-View System
The app has two synchronized views that communicate via localStorage:
- **Facilitator Console**: Controls scenario, triggers injects, rolls dice, sees hidden information
- **Player Display**: Public screen showing current phase, logs, dice results (no facilitator info)

**Key Pattern**: Open app in TWO browser windows - one for facilitator, one for players on shared screen.

### State Management
- **LocalStorage sync**: `rr_gamestate` key syncs between tabs via `storage` event listener
- **State structure**:
  ```js
  {
    scenarioId: string,       // Current scenario ID
    turnIndex: number,        // Current turn (0-3)
    publicLog: array,         // Event log shown to players
    lastRoll: object,         // Latest dice roll result
    activeInject: object,     // Currently triggered inject
    timer: number             // Game timer
  }
  ```

### Scenario System (`src/scenarios.js`)

Scenarios are defined as objects with:
- `turns[]`: 3-4 phases (Briefing → Pre-Incident → Response → Recovery)
- `injects[]`: Optional events the facilitator can trigger (from Extra Injects table in manual)
- Each turn has `publicText` (shown to players) and `facilitatorInfo` (hidden, facilitator-only)

**Current Scenarios** (from NCSC NZ Rolls & Responders Facilitator Manual V1.1):

1. **DDoS Attack** (Code 4452) - Easy
   - Paid stressor service hired by criminals for Bitcoin extortion
   - 3 turns: Pre-Incident → Incident Declared → Recovery
   - Injects: Ransom demand, escalation threat, stakeholder calls

2. **Ransomware** (Code 1456) - Medium
   - Security tester USB attack on admin laptop
   - 3 turns: Pre-Incident → Response Phase → Recovery
   - Inject: Backup failure

3. **Cloud Infrastructure Compromise** (Code 6244) - Hard
   - Misconfigured access keys lead to PII exfiltration
   - 3 turns: Pre-Incident → Response Phase → Recovery
   - Injects: Historical researcher warning, media article

**Adding custom scenarios**:
1. Add to `SCENARIOS` object in `scenarios.js`
2. Follow the structure of existing R&R scenarios
3. Include difficulty rating and scenario code

## Key Files

- `src/App.jsx`: Main component with all views (Landing, Facilitator, Player)
- `src/scenarios.js`: Scenario library and helper functions
- `src/index.css`: Tailwind CSS setup

## Important Notes

### The "Next Turn" Button Bug
There was a critical bug where `handleNextTurn` was updating state in multiple calls, causing state to reset. **Solution**: Always batch state updates into a single `updateState()` call:

```js
// ❌ BAD - state gets overwritten
updateState({ turnIndex: nextIndex });
addLog({ type: 'phase', text: 'Advanced' });

// ✅ GOOD - single state update
updateState({
  turnIndex: nextIndex,
  publicLog: newLog,
  activeInject: null
});
```

### Dice Rolling
- Normal roll: single D20
- Advantage: roll 2, take higher (when team has help/resources)
- Disadvantage: roll 2, take lower (when fatigued/under pressure)

### Difficulty Levels (from NCSC manual)
- Trivial: No roll (still takes time)
- Routine: 5+
- Challenging: 10+
- Hard: 15+
- Elite Hacker: 20

## Tech Stack

- **React 19** with hooks
- **Vite** for build/dev
- **Tailwind CSS 4** for styling
- **lucide-react** for icons
- No state management library (localStorage + React state)

## Source Material

Based on NCSC NZ manuals in `/Rolls & Responders Resources/`:
- Game Manual V1
- Facilitator Manual V1.1
- Quick Guides (Player/Facilitator)

Original concept: Kate Pearce & TradeMe NZ via NZITF
