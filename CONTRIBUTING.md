# Contributing to Rolls & Responders

Thank you for your interest in contributing to this project! This application is based on the NCSC New Zealand Rolls & Responders framework.

## Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## Project Structure

```
├── src/
│   ├── App.jsx           # Main application component
│   ├── scenarios.js      # Scenario definitions
│   └── index.css         # Tailwind CSS styles
├── scripts/
│   └── take-screenshots.mjs  # Screenshot generation tool
├── .github/
│   └── screenshots/      # README screenshots
└── public/               # Static assets
```

## Adding New Scenarios

Scenarios should follow the NCSC NZ Rolls & Responders format. To add a new scenario:

1. Add the scenario object to `SCENARIOS` in [`src/scenarios.js`](src/scenarios.js)
2. Follow this structure:

```javascript
'scenario-id': {
  id: 'scenario-id',
  code: '####',              // 4-digit scenario code
  title: "Scenario: Name",
  difficulty: "Easy|Medium|Hard",
  description: "Brief description",
  turns: [
    {
      id: 0,
      title: "Briefing & Setup",
      publicText: "Text shown to players",
      facilitatorInfo: "Background info (facilitator only)"
    },
    // ... more turns
  ],
  injects: [
    {
      id: 'inject_##',
      title: "Inject ##: Name",
      content: "Inject content",
      triggerText: "Button label"
    }
  ]
}
```

3. Test the scenario in both Facilitator and Player views
4. Update documentation if needed

## Updating Screenshots

Screenshots are generated programmatically using Playwright:

```bash
# Ensure dev server is running
npm run dev

# In another terminal, run the screenshot script
node scripts/take-screenshots.mjs
```

This will:
- Launch a headless browser
- Capture screenshots of key interfaces
- Save them to `.github/screenshots/`

Screenshots should be regenerated when:
- UI design changes significantly
- New major features are added
- App branding or theming is updated

## Code Style

- Use React hooks (no class components)
- Follow existing code formatting patterns
- Keep components focused and functional
- Add comments for complex game mechanics
- Run `npm run lint` before committing

## Important: State Management Bug Prevention

⚠️ **Critical Pattern**: Always batch state updates into a single `updateState()` call to prevent state from being overwritten.

```javascript
// ❌ BAD - causes state reset
updateState({ turnIndex: nextIndex });
addLog({ type: 'phase', text: 'Advanced' });

// ✅ GOOD - single atomic update
updateState({
  turnIndex: nextIndex,
  publicLog: newLog,
  activeInject: null
});
```

See [CLAUDE.md](CLAUDE.md) for detailed architecture notes.

## Dual-View Testing

Always test changes in both views:

1. Open http://localhost:5173 in two browser windows
2. Window 1: Select "Facilitator Console"
3. Window 2: Select "Player Display"
4. Verify state syncs correctly via localStorage

## Continuous Integration

The project uses GitHub Actions for automated checks on all PRs and commits:

- **Linting**: Runs `npm run lint` to check code quality
- **Build**: Runs `npm run build` to ensure production build succeeds

Before submitting a PR, verify locally:
```bash
npm run lint    # Should pass with no errors
npm run build   # Should complete successfully
```

## Pull Request Workflow

We follow GitHub Flow with PR-based development.

### Collaboration Model

**For regular collaborators** (team members with write access):
- Work from the main repository using feature branches
- Create PRs between branches in the same repository
- No forking needed - this streamlines collaboration

**For external contributors** (open-source community):
- Fork the repository and work from your fork
- Create PRs from your fork to the main repository
- Suitable for unaffiliated contributors

---

### Workflow for Regular Collaborators (Branching)

#### 1. Clone and Branch

```bash
# Clone the repository (one-time setup)
git clone https://github.com/joris-decombe/rolls-and-responders-app.git
cd rolls-and-responders-app

# Create a feature branch
git checkout -b feature/amazing-feature
```

#### 2. Make Changes

- Write clear, focused commits
- Follow the code style guidelines
- Add tests if applicable
- Update documentation

#### 3. Test Locally

```bash
# Required before submitting PR
npm run lint    # Must pass with no errors
npm run build   # Must complete successfully

# Manual testing
npm run dev     # Test in both Facilitator and Player views
```

#### 4. Submit Pull Request

```bash
# Push your branch to the repository
git push origin feature/amazing-feature

# Open PR on GitHub
# - Use the PR template
# - Provide clear description
# - Link related issues
# - Wait for CI checks to pass
# - Request review
```

#### 5. PR Review Process

- All PRs require at least one approval
- CI must pass (lint + build)
- Address reviewer feedback
- Keep PR scope focused
- Squash commits if needed before merge

#### 6. After Merge

```bash
# Update your local main branch
git checkout main
git pull origin main

# Delete the feature branch
git branch -d feature/amazing-feature
git push origin --delete feature/amazing-feature
```

---

### Workflow for External Contributors (Forking)

#### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/rolls-and-responders-app.git
cd rolls-and-responders-app
git remote add upstream https://github.com/joris-decombe/rolls-and-responders-app.git

# Create a feature branch
git checkout -b feature/amazing-feature
```

#### 2. Make Changes and Test

Follow steps 2-3 from the branching workflow above.

#### 3. Submit Pull Request

```bash
# Push to your fork
git push origin feature/amazing-feature

# Open PR on GitHub from your fork to joris-decombe/rolls-and-responders-app
# - Use the PR template
# - Provide clear description
# - Wait for CI and review
```

#### 4. After Merge

```bash
# Update your fork from upstream
git checkout main
git pull upstream main
git push origin main
```

## Branch Protection

The `main` branch is protected:

- ✅ Require PR before merging
- ✅ Require status checks to pass (CI)
- ✅ Require up-to-date branches
- ✅ No direct pushes to main
- ✅ Administrators follow same rules

## Commit Message Guidelines

Use clear, descriptive commit messages:

```bash
# Good examples
git commit -m "Add support for custom dice mechanics"
git commit -m "Fix state sync bug in player display"
git commit -m "Update DDoS scenario facilitator info"

# Bad examples
git commit -m "fix bug"
git commit -m "update stuff"
git commit -m "WIP"
```

Format:
- Use imperative mood ("Add feature" not "Added feature")
- Keep first line under 72 characters
- Add detailed description if needed

## Custom Scenarios

If you create custom scenarios based on NCSC NZ Rolls & Responders:
- Share them via Pull Request
- Ensure they follow the official format
- Include scenario code and difficulty rating
- Add source attribution if based on real incidents

## License

By contributing, you agree that your contributions will be licensed under the same Creative Commons Attribution 4.0 New Zealand license as the NCSC NZ Rolls & Responders framework.

## Questions?

For questions about:
- **NCSC NZ Rolls & Responders**: Visit [official resources](https://www.ncsc.govt.nz/resources/rolls-and-responders)
- **This implementation**: Open a GitHub issue
- **Running exercises**: See the original NCSC NZ facilitator manual
