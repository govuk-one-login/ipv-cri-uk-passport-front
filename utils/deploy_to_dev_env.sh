#!/bin/bash

# This script must be run in a shell with sufficient AWS access.
# This can be achieved by using aws-vault and an amin role for example
# aws-vault exec passport-dev -- ./deploy_to_dev_env.sh

if ! which jq >/dev/null; then
  echo "Please install jq to use this script"
fi

if ! docker info > /dev/null 2>&1 ; then
  echo "Docker engine is not running, please start it."
  exit 1
fi

STACK_NAME="passport-front-development"
DEV_IMAGE_TAG="$(date +%s)"

if ! aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region eu-west-2 > /dev/null 2>&1 ; then
  echo "The stack '${STACK_NAME}' has not been found."
  echo " - check the script has been run with the required permissions, e.g. aws-vault exec <profile> -- $0"
  echo " - check you are on the VPN"
  echo " - check whether the stack exists via the console or cli"
  exit 1
fi

IMAGE_NAME_AND_TAG="passport-front-development:${DEV_IMAGE_TAG}"

docker build -t "$IMAGE_NAME_AND_TAG" ../

echo "Logging into developement ECR registry"
ecr_registry="322814139578.dkr.ecr.eu-west-2.amazonaws.com"
aws ecr get-login-password --region eu-west-2 | \
  docker login --username AWS --password-stdin "${ecr_registry}"

REMOTE_IMAGE_NAME_AND_TAG="${ecr_registry}/passport-front-development:${DEV_IMAGE_TAG}"

echo "Tagging docker image"
docker tag "${IMAGE_NAME_AND_TAG}" "$REMOTE_IMAGE_NAME_AND_TAG"

echo "Pushing development image to ECR"
docker push "$REMOTE_IMAGE_NAME_AND_TAG"

function isStackUpdateComplete() {
  status="$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region eu-west-2 \
    | jq '.Stacks[].StackStatus' -r )"

  echo "Current status is: ${status}"
  if [[ "$status" == "UPDATE_COMPLETE" ]]; then
    return 0
  fi
  return 1
}

echo "Updating stack to use development image"
aws cloudformation update-stack \
  --stack-name "$STACK_NAME" \
  --template-body file://../deploy/template.yaml \
  --parameters ParameterKey=ImageTag,ParameterValue="${DEV_IMAGE_TAG}" \
               ParameterKey=Environment,UsePreviousValue=true \
               ParameterKey=SubnetIds,UsePreviousValue=true \
               ParameterKey=VpcId,UsePreviousValue=true \
  --capabilities CAPABILITY_IAM \
  --region eu-west-2 \

while ! isStackUpdateComplete
do
  echo "Waiting 30s for stack to complete update"
  sleep 30
done

echo "Update complete"
