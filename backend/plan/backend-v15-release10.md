# Backend v15 / Release 10 — Integration with `Frontend/`

This plan describes how to connect the Hub Socrates application under [`Frontend/`](../../Frontend/) to a real BSP (Launchpad)–compatible backend, using the same API paths and auth conventions as the reference submodule at [`launchpad-frontend/`](../../launchpad-frontend/).

## 1. What the Frontend expects today

| Area | Implementation | Notes |
|------|------------------|--------|
| **Config** | `VITE_API_BASE_URL` in `Frontend/src/const/common/api.const.ts` | Base URL for all REST calls (trailing slash optional; the client normalizes it). If unset, `apiClient` returns a 503-style error and does not call the network. |
| **HTTP client** | `Frontend/src/lib/apiClient.ts` | `get` / `post` / `put` / `patch` / `delete` with JSON bodies, 30s timeout, `Content-Type: application/json`. |
| **Authorization header** | `Authorization: Bearer <token>` | Token from `getBearerToken()` (see below). |
| **Entry / routing** | `Frontend/src/main.tsx` | `BrowserRouter` wraps the app (aligned with `launchpad-frontend`); the Hub UI is still tab-driven but can adopt URL routes later. |

## 2. Data contracts and endpoints

`API_ENDPOINTS` in `Frontend/src/const/common/api.const.ts` is kept in lockstep with `launchpad-frontend/src/const/common/api.const.ts`. The backend v15 line should expose the same path prefixes (examples):

- `GET/POST /corporations` and nested `/corporations/{id}/...`
- `GET/POST /companies`, `GET /companies/filter-options`
- `GET /users`, `GET /key-contacts`, `GET/POST /roles`, `GET /roles/categories`, `GET /permissions/modules-with-permissions`
- `GET /pricing/plans`
- `GET/POST` finance routes under `/finance/invoices/...` (invoices, PDF, bulk download/send)
- `GET/POST` company admin: `/company-admin/me/onboarding-review`, `/company-admin/me/checkout-session`
- Auth (password reset): `/auth/password-reset/...`

**Typical success envelope** (match Launchpad services and the mock in the submodule’s `apiClient` where applicable):

```json
{ "success": true, "message": "ok", "data": { } }
```

List endpoints that paginate should follow the same `items` + `pagination` (or equivalent) structure used by the reference app’s services.

## 3. Auth and session

### 3.1 Prototype / integration token (current Frontend behavior)

On login, `useAppState` sets:

- `sessionStorage` keys: `prototype-user-email`, `prototype-user-role` (see `HUB_SESSION_KEYS` in `Frontend/src/const/hub.const.ts`).

`getBearerToken()` builds:

```text
proto.<base64url({"email": "...", "cognito:groups": [ "<role string>" ]})>.sig
```

The gateway or backend for **local integration tests** can accept this as a stand-in for a real JWT, or you can require a real Cognito id token only in non-dev environments (recommended for production).

### 3.2 Production (aligned with `launchpad-frontend`)

The Launchpad app uses **AWS Cognito** (Amplify) and sends a real **Bearer** token. For production Hub + BSP:

1. Issue Cognito id/access tokens (same user pool and app client as the rest of BSP, or a dedicated client with correct scopes).
2. Replace or extend `getBearerToken()` to return the current Cognito `idToken` (or `accessToken` if the API is configured for it) from Amplify’s session.
3. Map Hub roles to Cognito **groups** so existing authorization middleware (group-based) continues to work.

## 4. CORS, TLS, and environment split

- **CORS**: Allow the Hub static origin (e.g. `https://hub.<env>.example.com`) to call the API base URL with `Authorization` and `Content-Type`.
- **TLS**: Terminate TLS at the load balancer or API gateway; the browser only needs `VITE_API_BASE_URL` to point at the HTTPS API host.
- **Environments**: Use distinct values per env (e.g. `VITE_API_BASE_URL=https://api.dev.bsp.example`) in CI/CD for `Frontend` builds.

## 5. Hub-specific features vs BSP core

The Hub Socrates UI (meetings, MOM, Jira, calendar integrations) is **not** fully modeled in the Launchpad `API_ENDPOINTS` list. For Release 10 you can:

- **Option A (minimal)**: Run Hub as a thin shell that only needs shared entities (companies, users) from BSP; keep meetings data in the browser (current `localStorage` behavior) until Hub APIs exist.
- **Option B (full product)**: Add a dedicated namespace (e.g. `/hub/meetings`, `/hub/integrations`) in v15+ with OpenAPI/Swagger documentation and implement server persistence; then extend `Frontend/src/const/common/api.const.ts` with a `hub` section and add `api/` modules following `launchpad-frontend/src/api/*.api.ts` patterns.

## 6. Deployment

1. **Build**: `npm run build` in `Frontend/` (output in `Frontend/build` per Vite config).
2. **Host**: Any static host (S3 + CloudFront, Netlify, etc.). Configure SPA fallback to `index.html` if you later add client-side routes beyond `/`.
3. **Secrets**: Do **not** embed API keys in the bundle; use `VITE_*` only for public base URLs. Cognito / OAuth client IDs are often public; keep real secrets on the server.

## 7. Concrete integration steps (checklist)

1. **Set** `VITE_API_BASE_URL` in `Frontend/.env` (or CI env) to your API gateway / ALB URL.
2. **Verify** one known route (e.g. `GET /companies` or health) with `curl` and the same `Authorization` strategy you will use in the browser.
3. **Wire** Cognito in the Frontend (follow `launchpad-frontend` Amplify configuration) and update `getBearerToken()` to use live tokens in staging.
4. **Re-run** the Hub app: confirm `sessionStorage` / Cognito session populates and API calls return `ok: true` in `apiClient` responses.
5. **Map** each screen that should be server-backed to the appropriate `API_ENDPOINTS` and add `src/api/<feature>.api.ts` files mirroring the Launchpad `api` layer.
6. **Add** end-to-end tests (optional) that hit a deployed API with a test user in the right Cognito groups.

## 8. Reference files

- Submodule API constants: `launchpad-frontend/src/const/common/api.const.ts`
- Submodule token helper (mock context): `launchpad-frontend/src/lib/apiClient.ts`
- This repo’s aligned copies: `Frontend/src/const/common/api.const.ts`, `Frontend/src/lib/apiClient.ts`

This document is aimed at **backend v15 / Release 10** alignment: same URL surface and auth model as the Launchpad web client, with a clear path to Hub-specific resources when product scope requires it.
