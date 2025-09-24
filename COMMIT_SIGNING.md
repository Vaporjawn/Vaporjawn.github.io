# Commit Signing Guide

This project requires all future commits to be cryptographically signed so collaborators and automation can verify authorship and integrity.

You can use **SSH key signing (recommended)** or **GPG (classic)**. Either is acceptable; pick one primary method and keep its private key secure.

---
## ✅ Quick Recommendation
| Method | Effort | Security | Works on macOS Keychain | Maintenance | Notes |
|--------|--------|----------|-------------------------|-------------|-------|
| SSH Signing | Easiest | Strong | Yes | Low | Single key can sign & authenticate to GitHub |
| GPG | Moderate | Strong | Yes (via gpg-agent) | Medium | Mature ecosystem, more config |

If you already use SSH for `git clone`, re‑use or create a **new dedicated Ed25519 key** for signing.

---
## 1. SSH Commit Signing (Recommended)

### 1.1 Create (or Re-use) an Ed25519 SSH Key
```bash
# New key (choose a strong passphrase)
ssh-keygen -t ed25519 -C "victor.williams.dev+git-signing@users.noreply.github.com" -f ~/.ssh/id_ed25519_git_sign
```
If you already have `~/.ssh/id_ed25519` and want to reuse it for signing, you may skip creation. A dedicated key is cleaner.

### 1.2 Add the Public Key to GitHub for Signing
Copy the public key:
```bash
pbcopy < ~/.ssh/id_ed25519_git_sign.pub
```
Go to: GitHub > Settings > SSH and GPG keys > **New SSH key** → Type: *Signing Key* → Paste → Save.

### 1.3 Enable SSH Signing in Git
```bash
# Tell Git to use SSH for signatures
git config --global gpg.format ssh

# Point Git at the private key (use the path you chose)
git config --global user.signingkey ~/.ssh/id_ed25519_git_sign.pub

# Auto-sign every commit + tag
git config --global commit.gpgsign true
git config --global tag.gpgSign true
```
> The value should be the **public** key path for SSH signing (Git handles the mapping via ssh-agent).

### 1.4 Ensure `ssh-agent` Loads the Key
```bash
ssh-add --apple-use-keychain ~/.ssh/id_ed25519_git_sign
```
Add this to `~/.zshrc` if not already:
```bash
eval "$(ssh-agent -s)" 2>/dev/null
ssh-add --apple-use-keychain ~/.ssh/id_ed25519_git_sign 2>/dev/null || true
```

### 1.5 Test a Signed Commit
```bash
echo "test" > /tmp/signing_check.txt
git add /tmp/signing_check.txt
git commit -m "chore: verify signed commit"
GIT_TRACE=1 git log -1 --show-signature
```
You should see `Good "git ssh signer" signature`.

---
## 2. GPG Commit Signing (Alternative)

### 2.1 Generate a GPG Key
```bash
gpg --full-generate-key
# Select (1) RSA and RSA or (9) ECC (ed25519) if supported
# 4096-bit RSA or ed25519 recommended
```
List keys:
```bash
gpg --list-secret-keys --keyid-format=long
```
Copy the LONG key ID (e.g., `ABCD1234EF567890`).

### 2.2 Export & Add the Public Key to GitHub
```bash
gpg --armor --export ABCD1234EF567890 | pbcopy
```
GitHub > Settings > SSH and GPG Keys > **New GPG Key** → Paste → Save.

### 2.3 Configure Git to Use It
```bash
git config --global user.signingkey ABCD1234EF567890
git config --global commit.gpgsign true
```
macOS pinentry: ensure `pinentry-mac` is installed (Homebrew):
```bash
brew install pinentry-mac
```
Add to `~/.gnupg/gpg-agent.conf`:
```
pinentry-program /usr/local/bin/pinentry-mac
```
Then restart agent:
```bash
gpgconf --kill gpg-agent
```

### 2.4 Test
```bash
touch /tmp/gpg_test && git add /tmp/gpg_test
git commit -m "chore: test gpg signature"
GIT_TRACE=1 git log -1 --show-signature
```
Expect: `gpg: Good signature`.

---
## 3. Verifying Signatures

### CLI
```bash
git log --show-signature -1
```
For a range:
```bash
git verify-commit <commit-hash>
```
### GitHub UI
Commits tab will show a green **Verified** badge.

---
## 4. Signing Tags
```bash
git tag -s v1.0.0 -m "Release 1.0.0"
git push origin v1.0.0
```
SSH signing uses same config; GPG will prompt for passphrase.

---
## 5. Enforcing Locally (Optional Hook)
You can copy the provided example hook:
```bash
cp docs/hooks/pre-push.example .git/hooks/pre-push && chmod +x .git/hooks/pre-push
```
This will block pushes containing unsigned commits.

Alternatively, create a lightweight `.git/hooks/prepare-commit-msg`:
```bash
#!/usr/bin/env bash
# Abort if commit not already signed (Git will sign automatically if configured)
# This just warns if global config was removed.
if ! git config --get commit.gpgsign >/dev/null; then
  echo "[WARN] commit.gpgsign is disabled. Enable with: git config --global commit.gpgsign true" >&2
fi
```
Make executable:
```bash
chmod +x .git/hooks/prepare-commit-msg
```

For stricter CI enforcement, add a workflow step:
```bash
git log --pretty="%H %G? %an" | awk '$2!~/[GU]/ {print "Unsigned or untrusted: "$0; exit 1}'
```
`%G?` codes: `G` = good, `U` = good but untrusted, `B` = bad, `N` = no sig.

---
## 6. Rotating / Revoking Keys
- **SSH**: Remove old key from GitHub, generate a new one, update `user.signingkey`.
- **GPG**: Generate revocation certificate when creating the key:
```bash
gpg --output revoke.asc --gen-revoke ABCD1234EF567890
```
Store `revoke.asc` safely offline.

---
## 7. Troubleshooting
| Symptom | Cause | Fix |
|---------|-------|-----|
| `gpg: signing failed: Inappropriate ioctl` | No TTY for pinentry | `export GPG_TTY=$(tty)` in shell rc |
| `bad signature` | Wrong key / corruption | Re-export public key to GitHub |
| Commit not signed | `commit.gpgsign` off | Re-enable config |
| GitHub shows "Unverified" for SSH | Key not added as *Signing Key* | Re-add with correct type |
| Repeated GPG passphrase prompts | gpg-agent not caching | Install `pinentry-mac`, configure agent |

---
## 8. Security Best Practices
- Use a unique key just for signing (separation of concerns).
- Protect private key with a strong passphrase and macOS Keychain storage.
- Rotate keys annually or on suspected compromise.
- Never commit private keys or revocation certificates.

---
## 9. Fast Reset / Reconfigure Cheatsheet
```bash
# Switch to SSH signing
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519_git_sign.pub

# Switch to GPG signing
git config --global --unset gpg.format
git config --global user.signingkey <GPG_KEY_ID>
```

---
**All new commits should now display a Verified badge once pushed.**
