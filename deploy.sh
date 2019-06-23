#!/bin/bash
SSH_HOST="personal-site"
DEPLOY_PATH="~/flexbot-config-panel/config"

npm run build
build_return=$?
if [ $build_return -ne 0 ]; then
  echo "BUILD FAILED. EXITING."
  exit
fi

echo "Syncing for ${SSH_HOST}:${DEPLOY_PATH}..."
rsync -a dist/ $SSH_HOST:$DEPLOY_PATH --progress
sync_return=$?
if [ $sync_return -ne 0 ]; then
  echo "SYNC FAILED."
fi