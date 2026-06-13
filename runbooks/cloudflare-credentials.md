# Cloudflare credentials runbook — PlexAPI.dev docs

## Target deployment

- **Pages project:** `plexapi-dev-docs`
- **Production branch:** `main`
- **Build output:** `docs/.vitepress/dist`
- **CI workflow:** `.github/workflows/ci.yml`
- **Required GitHub repository secrets:**
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`

## Least-privilege API token

Create a Cloudflare API token with the minimum permission needed for Pages deployment:

| Permission | Resource | Access |
|------------|----------|--------|
| **Cloudflare Pages:Edit** | Account | Include the account that owns `plexapi-dev-docs` (or "All accounts" if the exact account ID is not yet pinned). |

No Zone or DNS permissions are required for the deploy step itself. DNS for `docs.plexapi.dev` is managed separately in the Cloudflare dashboard.

### Token creation steps

1. Log in to the Cloudflare dashboard: https://dash.cloudflare.com
2. Go to **My Profile → API Tokens → Create Token**.
3. Use the **Custom token** template.
4. Set permissions:
   - **Account** → **Cloudflare Pages** → **Edit**
5. Set account resources to the target account.
6. Copy the token value immediately — it is shown only once.

## Store credentials securely

Add the values to the GitHub repository as **encrypted secrets** at **Settings → Secrets and variables → Actions**:

| Secret name | Value |
|-------------|-------|
| `CLOUDFLARE_API_TOKEN` | The token created above. |
| `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account ID that owns the Pages project. |

Do **not** commit these values to the repo, issue comments, or documents.

## Verify authentication

After the secrets are configured, verify the token works locally (requires the token to be present as an environment variable):

```bash
export CLOUDFLARE_API_TOKEN="<token>"
npx wrangler whoami
```

Then verify the Pages project is reachable:

```bash
npx wrangler pages project list
```

## Verify the deployment pipeline

1. Push a commit to `main` (or open a pull request against `main`).
2. Confirm the `config` job in `.github/workflows/ci.yml` outputs `deploy=true`.
3. Confirm the `deploy-production` (or `deploy-preview`) job reaches the `Publish to Cloudflare Pages` step without an authentication error.
4. Confirm the deployment URL is returned and the site is reachable.

## Manual deployment fallback

If CI is unavailable, a maintainer with the token can deploy manually:

```bash
npm run docs:build
npx wrangler pages deploy docs/.vitepress/dist \
  --project-name=plexapi-dev-docs \
  --branch=main
```

## Credential lifecycle and rotation

- **Owner:** CTO
- **Rotation trigger:** annually, on suspected exposure, or when a maintainer leaves.
- **Rotation procedure:**
  1. Create a new Cloudflare API token with the same permissions.
  2. Update the `CLOUDFLARE_API_TOKEN` GitHub secret.
  3. Trigger a deploy to confirm the new token works.
  4. Delete the old token in the Cloudflare dashboard.
- **Incident response:** If the token is exposed, rotate it immediately and audit Cloudflare audit logs for unauthorized deploys.
