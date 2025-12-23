# Branch Protection Setup

This document explains how to configure branch protection rules for the `main` branch to enforce best practices.

## Recommended Settings

Navigate to: **Settings** → **Branches** → **Add branch protection rule**

### Branch name pattern
```
main
```

### Protection Rules

#### ✅ Require a pull request before merging
- **Require approvals**: 1
- **Dismiss stale pull request approvals when new commits are pushed**: ✅
- **Require review from Code Owners**: ❌ (optional, if you have CODEOWNERS file)

#### ✅ Require status checks to pass before merging
- **Require branches to be up to date before merging**: ✅

**Required status checks:**
- `lint-and-build` (from CI workflow)

#### ✅ Require conversation resolution before merging
Ensures all PR comments are addressed before merging.

#### ❌ Require signed commits
Optional, but recommended for security-sensitive projects.

#### ✅ Require linear history
Prevents merge commits, keeps history clean.

#### ❌ Require deployments to succeed before merging
Not applicable (static site, no deployment check needed).

#### ✅ Lock branch
Prevents any pushes to the branch (force push or regular).

#### ✅ Do not allow bypassing the above settings
Administrators must follow the same rules.

#### ✅ Restrict who can push to matching branches
Only allow PRs to merge into main.

---

## Step-by-Step Setup

### 1. Navigate to Repository Settings

Go to: `https://github.com/joris-decombe/rolls-and-responders-app/settings/branches`

### 2. Add Branch Protection Rule

Click **"Add branch protection rule"** or **"Add rule"**

### 3. Configure Pattern

- **Branch name pattern**: `main`

### 4. Enable Required Settings

Check the following boxes:

```
☑ Require a pull request before merging
  ☑ Require approvals (1)
  ☑ Dismiss stale pull request approvals when new commits are pushed

☑ Require status checks to pass before merging
  ☑ Require branches to be up to date before merging

  Search for status checks:
  ☑ lint-and-build

☑ Require conversation resolution before merging

☑ Require linear history

☑ Do not allow bypassing the above settings

☑ Restrict who can push to matching branches
```

### 5. Save Changes

Click **"Create"** or **"Save changes"**

---

## Testing Branch Protection

After setting up, verify protection works:

### Test 1: Direct push should fail
```bash
git checkout main
echo "test" >> README.md
git commit -m "Test direct push"
git push origin main
```

**Expected**: ❌ Push rejected with message about requiring a pull request

### Test 2: PR without approval should not merge
1. Create a branch: `git checkout -b test-pr`
2. Make a change and push
3. Open PR on GitHub
4. Try to merge immediately

**Expected**: ❌ Merge button disabled until CI passes and approval received

### Test 3: PR with failing CI should not merge
1. Create PR that fails linting
2. Wait for CI to run

**Expected**: ❌ Merge blocked until checks pass

### Test 4: Valid PR workflow should succeed
1. Create feature branch
2. Make changes, commit, push
3. Open PR
4. Wait for CI to pass ✅
5. Get approval ✅
6. Merge PR ✅

---

## GitHub Actions Integration

The branch protection integrates with our CI workflow (`.github/workflows/ci.yml`):

### CI Workflow Triggers
```yaml
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
```

### Required Checks
- `lint-and-build` job must pass:
  - ✅ Lint check (`npm run lint`)
  - ✅ Build check (`npm run build`)

---

## Troubleshooting

### "Required status check not found"

If the `lint-and-build` check doesn't appear:

1. Merge an initial PR to trigger the CI workflow
2. Wait for workflow to complete
3. Return to branch protection settings
4. The check should now appear in the search

### Bypassing Protection (Emergency Only)

If you need to bypass protection temporarily:

1. ⚠️ Only for critical hotfixes
2. Temporarily disable "Do not allow bypassing"
3. Make the emergency change
4. Re-enable protection immediately

**Better approach**: Use a hotfix PR even in emergencies

---

## Maintenance

### Adding New Required Checks

When adding new CI jobs:

1. Add job to `.github/workflows/ci.yml`
2. Trigger workflow (merge PR or push to main)
3. Go to branch protection settings
4. Add new check to "Require status checks to pass"

### Updating Approval Requirements

To require more approvals:

1. Settings → Branches → Edit rule
2. Change "Required number of approvals before merging"
3. Save changes

---

## Related Documentation

- [CONTRIBUTING.md](../CONTRIBUTING.md) - PR workflow for contributors
- [pull_request_template.md](pull_request_template.md) - PR template
- [GitHub Branch Protection Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
