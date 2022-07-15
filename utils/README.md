### How to use the deploy_to_dev_env.sh script

#### Purpose

This script will build the passport-front docker image from your local source code and push the image into the development account's `passport-front-development-{ENV}` registry. It will then update your passport-front stack to use the image. Specify which of the 3 dev envs you wish to deploy to by providing a, b or c as the first argument.

### How it works

- Run the `deploy_to_dev_env.sh` within a shell with AWS credentials to describe/update stacks and push images in the IPV Passport Development account (most developers have an admin role in the development account which will work), for example:

  `aws-vault exec passport-dev -- ./deploy_to_dev_env.sh a`

- The script will check that the stack exists and you have the necessary binaries installed and processes running.
- Builds the passport-front docker image with the tag of `<epoch seconds>`
- Pushes the passport-front docker image into the `passport-front-development` ECR registry in the passport development account.
- Updates the task definition in your passport-front stack to reference the development image it has just pushed.
- Waits for your passport-front stack to update, this can take a minute or two.

### How to reset your environment

Redeploy the remote `main` branch.
