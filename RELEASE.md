# Release Process

This document describes how to create and publish releases for Rolls & Responders.

## Versioning

We follow [Semantic Versioning](https://semver.org/):

- **Major** (X.0.0): Breaking changes, major features
- **Minor** (0.X.0): New features, backwards compatible
- **Patch** (0.0.X): Bug fixes, small improvements

## Release Workflow

### 1. Prepare Release Branch

```bash
# Ensure main is up to date
git checkout main
git pull origin main

# Create release branch
git checkout -b release/v1.0.0
```

### 2. Update Version Numbers

Update version in the following files:

**package.json**
```json
{
  "version": "1.0.0"
}
```

**VERSION file**
```
1.0.0
```

### 3. Update CHANGELOG

Create or update `CHANGELOG.md` with release notes:

```markdown
## [1.0.0] - 2025-12-23

### Added
- Feature 1
- Feature 2

### Changed
- Change 1

### Fixed
- Bug fix 1
```

### 4. Commit Version Bump

```bash
git add package.json VERSION CHANGELOG.md
git commit -m "Bump version to 1.0.0"
git push origin release/v1.0.0
```

### 5. Create Pull Request

1. Open PR from `release/v1.0.0` to `main`
2. Title: "Release v1.0.0"
3. Wait for CI to pass
4. Get approval
5. Merge PR

### 6. Create Git Tag

```bash
# After PR is merged to main
git checkout main
git pull origin main

# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tag to trigger release workflow
git push origin v1.0.0
```

### 7. Verify Release

The GitHub Actions workflow will automatically:

1. Run lint and build checks
2. Create distribution archives (`.tar.gz` and `.zip`)
3. Generate changelog from commits
4. Create GitHub Release
5. Upload build artifacts

**Verify at**: `https://github.com/joris-decombe/rolls-and-responders-app/releases`

---

## Release Types

### Patch Release (Bug Fixes)

Example: `1.0.0` → `1.0.1`

```bash
# Quick process for small fixes
git checkout -b release/v1.0.1
# Update versions
git commit -m "Bump version to 1.0.1"
git push origin release/v1.0.1
# Create PR, merge, tag
```

### Minor Release (New Features)

Example: `1.0.1` → `1.1.0`

```bash
# Feature branch merged to main first
git checkout main
git pull origin main
git checkout -b release/v1.1.0
# Update versions, add CHANGELOG
git commit -m "Bump version to 1.1.0"
# Create PR, merge, tag
```

### Major Release (Breaking Changes)

Example: `1.1.0` → `2.0.0`

⚠️ Major releases require:
- Detailed migration guide
- Announcement in README
- Deprecation warnings in previous version
- Comprehensive testing

---

## Release Checklist

Before creating a release, verify:

### Code Quality
- [ ] All CI checks pass
- [ ] No linting errors (`npm run lint`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Manual testing completed

### Documentation
- [ ] README.md is up to date
- [ ] CHANGELOG.md includes all changes
- [ ] Version numbers updated (package.json, VERSION)
- [ ] Screenshots reflect current UI (if changed)

### Testing
- [ ] Tested all three scenarios
- [ ] Verified facilitator console
- [ ] Verified player display
- [ ] Tested cross-tab synchronization
- [ ] Tested dice rolling mechanics
- [ ] Tested inject system

### Content Accuracy
- [ ] Scenario content matches NCSC documentation
- [ ] Facilitator info is accurate
- [ ] Injects are properly formatted
- [ ] NCSC attribution maintained

---

## Hotfix Process

For critical bugs in production:

### 1. Create Hotfix Branch from Tag

```bash
# Branch from the release tag
git checkout -b hotfix/v1.0.1 v1.0.0
```

### 2. Fix the Issue

```bash
# Make minimal changes to fix the bug
git commit -m "Fix critical bug in state sync"
```

### 3. Update Version

```bash
# Bump patch version
# Update package.json: 1.0.0 → 1.0.1
# Update VERSION: 1.0.1
git commit -m "Bump version to 1.0.1"
```

### 4. Create PR to Main

```bash
git push origin hotfix/v1.0.1
# Create PR, get emergency review, merge
```

### 5. Tag Hotfix Release

```bash
git checkout main
git pull origin main
git tag -a v1.0.1 -m "Hotfix release 1.0.1"
git push origin v1.0.1
```

---

## Automated Release Workflow

The release is automated via `.github/workflows/release.yml`:

### Trigger
```yaml
on:
  push:
    tags:
      - 'v*'
```

### Steps
1. **Checkout**: Get code from tagged version
2. **Setup**: Install Node.js and dependencies
3. **Lint**: Run code quality checks
4. **Build**: Create production build
5. **Archive**: Create `.tar.gz` and `.zip` of dist/
6. **Changelog**: Generate from git commits
7. **Release**: Create GitHub release with artifacts

### Artifacts Included
- `rolls-and-responders-dist.tar.gz` - Compressed distribution
- `rolls-and-responders-dist.zip` - Zip distribution
- Build artifacts stored for 90 days

---

## Manual Release (Fallback)

If automated release fails:

### 1. Build Locally

```bash
npm run lint
npm run build
```

### 2. Create Archives

```bash
cd dist
tar -czf ../rolls-and-responders-dist.tar.gz .
zip -r ../rolls-and-responders-dist.zip .
cd ..
```

### 3. Create GitHub Release Manually

1. Go to: `https://github.com/joris-decombe/rolls-and-responders-app/releases/new`
2. Select tag: `v1.0.0`
3. Title: `Release v1.0.0`
4. Description: Copy from CHANGELOG.md
5. Upload: `rolls-and-responders-dist.tar.gz` and `.zip`
6. Publish release

---

## Post-Release

After publishing a release:

### 1. Announce

- Update README.md with latest version
- Post in Discussions (if applicable)
- Share on social media (if applicable)

### 2. Monitor

- Check for bug reports
- Monitor CI/CD
- Review download metrics

### 3. Plan Next Release

- Create milestone for next version
- Label issues and PRs
- Prioritize features and fixes

---

## Rollback Process

If a release has critical issues:

### Option 1: Quick Hotfix

Create hotfix release (see above)

### Option 2: Revert Release

```bash
# Delete tag locally and remotely
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0

# Delete GitHub release
# Go to Releases → Edit → Delete release

# Revert commits on main
git revert <commit-hash>
git push origin main
```

---

## Release FAQ

### Q: Can I delete a release?
**A**: Yes, but it's better to create a hotfix. Deleting releases can confuse users.

### Q: What if CI fails on the tag?
**A**: Delete the tag, fix the issue, create a new tag. Don't skip CI.

### Q: How do I handle breaking changes?
**A**: Bump major version, document in CHANGELOG, add migration guide.

### Q: Can I release from a branch other than main?
**A**: No. All releases must go through main after PR review.

---

## Resources

- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [GitHub Releases Documentation](https://docs.github.com/en/repositories/releasing-projects-on-github)
