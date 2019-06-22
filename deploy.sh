#!/bin/bash

npm run build
build_return=$?
if [ $build_return -ne 0 ]; then
  echo "BUILD FAILED. EXITING."
  exit
fi

echo "Syncing..."
rsync -a dist/ personal-site:~/flexbot-config-panel/config --progress
sync_return=$?
if [ $sync_return -ne 0 ]; then
  echo "SYNC FAILED."
fi