# Rolls & Responders

[![CI](https://github.com/joris-decombe/rolls-and-responders-app/workflows/CI/badge.svg)](https://github.com/joris-decombe/rolls-and-responders-app/actions)
[![Deploy](https://github.com/joris-decombe/rolls-and-responders-app/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/joris-decombe/rolls-and-responders-app/actions/workflows/deploy.yml)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

An interactive tabletop exercise application for testing cybersecurity incident response plans.

Based on the [NCSC New Zealand "Rolls & Responders"](https://www.ncsc.govt.nz/protect-your-organisation/rolls-and-responders/) framework (Creative Commons Attribution 4.0 NZ).

**🎮 [Try it live](https://joris-decombe.github.io/rolls-and-responders-app/)** | **📦 [Download Latest Release](https://github.com/joris-decombe/rolls-and-responders-app/releases/latest)**

![Landing Page](.github/screenshots/01-landing.png)

## Features

- **Dual-View Architecture**: Separate facilitator console and player display that sync via localStorage
- **Scenario Library**: 6 scenarios including 3 NCSC NZ official scenarios + 3 2025 real-world incident scenarios
- **Multi-Language Support**: Full English and French translations
- **D20 Dice System**: Advantage/Disadvantage mechanics for action resolution
- **Dynamic Injects**: Facilitator can trigger unexpected events during gameplay
- **Cross-Tab Sync**: Open in multiple windows for simultaneous facilitator/player views

## Quick Start

### Option 1: Use the Live App (Recommended)

Visit **[https://joris-decombe.github.io/rolls-and-responders-app/](https://joris-decombe.github.io/rolls-and-responders-app/)**

Open in two browser windows:
1. **Window 1**: Select "Facilitator Console"
2. **Window 2**: Select "Player Display" (project on shared screen)

### Option 2: Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in two browser windows as above.

### Option 3: Self-Host

Download the latest release and serve the `dist/` folder with any static web server.

## Screenshots

### Facilitator Console
The facilitator view shows hidden background information, controls game flow, triggers injects, and manages dice rolls.

![Facilitator Console](.github/screenshots/02-facilitator.png)

### Player Display
The player view shows only public information - current phase, event logs, and dice results.

![Player Display](.github/screenshots/03-player-display.png)

### Dice Rolling System
D20-based action resolution with advantage/disadvantage mechanics.

![Dice Rolling](.github/screenshots/04-dice-roll.png)

### Dynamic Injects
Facilitators can trigger unexpected events during gameplay.

![Inject System](.github/screenshots/05-injects.png)

## Scenarios

### NCSC NZ Official Scenarios

#### 1. DDoS Attack (Easy)
**Code**: 4452
Paid stressor service hired by criminals for Bitcoin extortion. Tests availability response and stakeholder communication.

#### 2. Ransomware (Medium)
**Code**: 1456
Security tester USB attack on admin laptop. Tests backup recovery and incident disclosure.

#### 3. Cloud Infrastructure Compromise (Hard)
**Code**: 6244
Misconfigured access keys lead to PII exfiltration. Tests data breach response and media handling.

### 2025 Real-World Incident Scenarios

#### 4. The "Deepfake" CFO (Easy)
**Code**: 1461
AI-driven Business Email Compromise using deepfake video technology. Based on the 2024 Arup Hong Kong incident where $25M was fraudulently transferred via deepfake video conference call. Tests detection of AI-generated media and social engineering response.

#### 5. The Poisoned Package (Medium)
**Code**: 3164
Software supply chain attack via NPM/PyPI typosquatting. Based on XZ Utils backdoor (CVE-2024-3094) and Polyfill.io compromise. Tests secure development practices and supply chain security.

#### 6. Hypervisor Ransomware (Hard)
**Code**: 5126
VMware ESXi/Hyper-V hypervisor-level ransomware with double extortion tactics. Based on ESXiArgs and Akira ransomware campaigns (2024). Tests critical infrastructure response and backup strategy at the virtualization layer.

## How to Play

1. **Choose a scenario** on the landing page
2. **Facilitator**: Controls game flow, sees hidden information, triggers injects
3. **Players**: Discuss actions as a team, roll dice for outcomes
4. **Difficulty**: Facilitator sets (Routine 5+, Challenging 10+, Hard 15+)
5. **Advance**: Click "Next Turn" to progress through phases

## Dice Rolling

- **Normal**: Roll 1 D20
- **Advantage**: Roll 2 D20, take higher (team has resources/help)
- **Disadvantage**: Roll 2 D20, take lower (fatigued/under pressure)

## Tech Stack

- React 19
- Vite
- Tailwind CSS 4
- lucide-react icons

## Source Material

Scenarios and mechanics from NCSC NZ Rolls & Responders:
- Facilitator Manual V1.1
- Game Manual V1
- Quick Guides

**Official Resources**:
- [NCSC NZ Rolls & Responders](https://www.ncsc.govt.nz/protect-your-organisation/rolls-and-responders/)

Original concept by Kate Pearce & TradeMe NZ via NZITF.

## License

This application is based on NCSC NZ Rolls & Responders, licensed under [Creative Commons Attribution 4.0 New Zealand](https://creativecommons.org/licenses/by/4.0/).

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- Adding new scenarios
- Updating screenshots
- Development setup
- Code style

## Development

See [CLAUDE.md](CLAUDE.md) for architecture details and development guidelines.
