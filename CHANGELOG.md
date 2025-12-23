# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-12-24

### Added

**New 2025 Threat Scenarios (Based on Real-World Incidents):**

Three new cybersecurity scenarios reflecting emerging threats from 2024-2025:

1. **The "Deepfake" CFO** (Easy) - Scenario code: 1461
   - AI-driven Business Email Compromise using deepfake video technology
   - Based on the Arup Hong Kong incident (February 2024) - $25M fraudulent transfer
   - Features social engineering via deepfake video conference call
   - 3 turns: Pre-incident, Response, Recovery
   - Inject: Media coverage of similar attacks

2. **The Poisoned Package** (Medium) - Scenario code: 3164
   - Software supply chain attack via NPM/PyPI typosquatting
   - Based on XZ Utils backdoor (CVE-2024-3094) and Polyfill.io compromise
   - Features malicious dependency with credential exfiltration
   - 3 turns: Pre-incident, Response, Recovery
   - Injects: Developer reports anomaly, additional compromised systems discovered

3. **Hypervisor Ransomware** (Hard) - Scenario code: 5126
   - VMware ESXi/Hyper-V hypervisor-level ransomware with double extortion
   - Based on ESXiArgs and Akira ransomware campaigns (2024)
   - Features VM encryption and data exfiltration threats
   - 3 turns: Pre-incident, Response, Recovery
   - Injects: Ransom demand with threat publication, backup corruption discovered

**Scenario Features:**
- Full multi-language support (English and French)
- Real-life incident references for facilitators
- Difficulty ratings aligned with current threat landscape
- All scenarios follow NCSC Rolls & Responders format

### Changed

- Expanded scenario library from 3 to 6 official scenarios
- Updated scenario selection to include 2025 threat landscape coverage

### Technical Details

**Files Modified:**
- `src/scenarios.js` - Added three new scenario definitions
- `src/locales/en.json` - Added English translations for new scenarios
- `src/locales/fr.json` - Added French translations for new scenarios

## [1.1.0] - 2025-12-23

### Added

**Internationalization (i18n):**
- Multi-language support using react-i18next
- Language selector component in all views (Landing, Facilitator, Player)
- English (en) as default language with complete translations
- French (fr) translations: "La simulation de gestion d'incidents cyber"
- Language preference persistence in localStorage
- Translation infrastructure: `src/i18n.js` and `src/locales/` directory
- All UI elements, scenarios, and game mechanics fully translated
- Documentation for adding new languages in CONTRIBUTING.md

**Scenario Translations:**
- DDoS Attack scenario - fully translated to French
- Ransomware scenario - fully translated to French
- Cloud Infrastructure Compromise scenario - fully translated to French
- Difficulty levels and action resolution text translated

### Changed

- Refactored `src/scenarios.js` to use dynamic `getScenarioData(t)` function for translations
- Updated all React components to use `useTranslation` hook
- Maintained "ROLLS & RESPONDERS" brand name unchanged across all languages
- Updated screenshots to show language selector
- Updated CONTRIBUTING.md with comprehensive i18n workflow documentation

### Fixed

- Screenshot script baseURL now correctly points to `http://localhost:5173/rolls-and-responders-app/`
- Corrected vite dev server port reference (5173 instead of 5174)

### Technical Details

**New Dependencies:**
- `i18next@^25.7.3` - Internationalization framework
- `react-i18next@^16.5.0` - React bindings for i18next

**Translation Structure:**
- `landing.*` - Landing page text
- `header.*` - Header and navigation elements
- `facilitator.*` - Facilitator console UI elements
- `player.*` - Player display UI elements
- `difficulty.*` - Difficulty levels and descriptions
- `log.*` - Log entry text
- `scenarios.*` - Complete scenario content (titles, descriptions, turns, injects)

### Migration Notes

- Fully backward compatible - no breaking changes
- Existing game state and localStorage data remain compatible
- Default language is English if no preference is set

## [1.0.0] - 2025-12-23

### Added

**Core Application Features:**
- Interactive tabletop exercise for cybersecurity incident response training
- Dual-view architecture with Facilitator Console and Player Display
- Real-time cross-tab synchronization using localStorage
- D20 dice rolling system with advantage/disadvantage mechanics
- Dynamic inject system for unexpected scenario events
- Game timer and phase management system

**Scenarios (NCSC NZ Official):**
- DDoS Attack scenario (Code 4452) - Easy difficulty
- Ransomware scenario (Code 1456) - Medium difficulty
- Cloud Infrastructure Compromise (Code 6244) - Hard difficulty

**Documentation:**
- Comprehensive README with setup and usage instructions
- CONTRIBUTING.md with PR workflow (branching vs forking)
- SECURITY.md for vulnerability reporting
- RELEASE.md for release process documentation
- Pull request template
- Branch protection setup guide
- CLAUDE.md for AI-assisted development

**Development Infrastructure:**
- CI/CD workflow for automated testing and building
- Automated release workflow with artifact generation
- ESLint configuration for code quality
- Playwright for screenshot automation
- Vite build system with React 19

**Repository Governance:**
- Branch protection guidelines
- Security policy and responsible disclosure process
- Commit message guidelines
- Code review requirements

### Technical Details

- **Frontend**: React 19 with hooks
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **License**: CC-BY-4.0 (based on NCSC NZ Rolls & Responders)

### Attribution

Based on NCSC New Zealand "Rolls & Responders" framework, licensed under Creative Commons Attribution 4.0 NZ.

Original concept by Kate Pearce & TradeMe NZ via NZITF.

---

[1.2.0]: https://github.com/joris-decombe/rolls-and-responders-app/releases/tag/v1.2.0
[1.1.0]: https://github.com/joris-decombe/rolls-and-responders-app/releases/tag/v1.1.0
[1.0.0]: https://github.com/joris-decombe/rolls-and-responders-app/releases/tag/v1.0.0
