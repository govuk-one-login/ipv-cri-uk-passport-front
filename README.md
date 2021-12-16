# Digital Identity DCS Credential Issuer Front

`di-ipv-cri-uk-passport-front`

This is the home for the DCS Credential Issuer front end user interface for the Identity Proofing and Verification (IPV) system within the GDS digital identity platform, GOV.UK Sign In.

# Installation

Clone this repository and then run

```bash
yarn install
```

## Environment Variables

- `API_BASE_URL` - URL to the cri-passport-back api.
- `PORT` - Default port to run webserver on. (Default to `3000`)
- `SESSION_SECRET` - Secret used when configuring the HMPO session.

### Code Owners

This repo has a `CODEOWNERS` file in the root and is configured to require PRs to reviewed by Code Owners.
