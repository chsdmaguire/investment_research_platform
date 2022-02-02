#!/bin/bash
git pull origin master || echo "Authenticate with GitHub SSH before running this script"
echo "=============================="
echo "Pulled latest code from master"
echo "=============================="

npm i || echo "Failed to update dependencies"
echo "============"
echo "Updated deps"
echo "============"

nuxt build || echo "Failed nuxt build"
echo "============================="
echo "Built latest code from master"
echo "============================="

pm2 start || echo "pm2 failed to launch daemon"
echo "===="
echo "Done"
echo "===="