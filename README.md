# Digital Identity Passport Credential Issuer

This the front-end code for V1 of the UK Passport Credential Issuer(CRI) for the Identity Proofing and Verification (IPV) system within the GDS digital identity platform, GOV.UK Sign In.

Passport front V1 was created as part of all CRI's standardizing on using -

- [common-express](https://github.com/alphagov/di-ipv-cri-common-express) for common processing steps and error handling.
- [hmpo-form-wizard](https://github.com/HMPO/hmpo-form-wizard) for routes and field validation.

## Code Owners

This repo has a `CODEOWNERS` file in the root and is configured to require PRs to reviewed by Code Owners.

## Environment Variables

- `API_BASE_URL` - URL to the cri-passport-back api.
- `PORT` - Default port to run webserver on.
- `GOOGLE_ANALYTICS_4_GTM_CONTAINER_ID` - Container ID for GA4 tracking.
- `UNIVERSAL_ANALYTICS_GTM_CONTAINER_ID` - Container ID for UA tracking.
- `GA4_DISABLED` - BOOLEAN
- `UA_DISABLED` - BOOLEAN

## Local Testing

```bash
export API_BASE_URL=<URL> PORT=5050
yarn install && yarn build && yarn run dev
```

## Linting

Check with `yarn lint`

Apply with `yarn lint-apply`

## Unit Tests

Run with `yarn run test`

## Automation Tests

Run with `yarn run test:browser:ci`

## Pre-Commit Checking / Verification

Completely optional, there is a `.pre-commit-config.yaml` configuration setup in this repo, this uses [pre-commit](https://pre-commit.com/) to verify your commit before actually commiting, it runs the following checks:

- Check Json files for formatting issues
- Fixes end of file issues (it will auto correct if it spots an issue - you will need to run the git commit again after it has fixed the issue)
- It automatically removes trailing whitespaces (again will need to run commit again after it detects and fixes the issue)
- Detects aws credentials or private keys accidentally added to the repo
- runs cloud formation linter and detects issues
- runs checkov and checks for any issues.

### Dependency Installation

To use this locally you will first need to install the dependencies, this can be done in 2 ways:

#### Method 1 - Python pip

Run the following in a terminal:

```
sudo -H pip3 install checkov pre-commit cfn-lint
```

this should work across platforms

#### Method 2 - Brew

If you have brew installed please run the following:

```
brew install pre-commit ;\
brew install cfn-lint ;\
brew install checkov
```

### Post Installation Configuration

once installed run:

```
pre-commit install
```

To update the various versions of the pre-commit plugins, this can be done by running:

```
pre-commit autoupdate && pre-commit install
```

This will install / configure the pre-commit git hooks, if it detects an issue while committing it will produce an output like the following:

```
 git commit -a
check json...........................................(no files to check)Skipped
fix end of files.........................................................Passed
trim trailing whitespace.................................................Passed
detect aws credentials...................................................Passed
detect private key.......................................................Passed
AWS CloudFormation Linter................................................Failed
- hook id: cfn-python-lint
- exit code: 4
W3011 Both UpdateReplacePolicy and DeletionPolicy are needed to protect Resources/PublicHostedZone from deletion
core/deploy/dns-zones/template.yaml:20:3
Checkov..............................................(no files to check)Skipped
- hook id: checkov
```

To remove the pre-commit hooks should there be an issue

```
pre-commit uninstall
```
