#!/bin/bash
git pull origin master || (echo "Authenticate with GitHub SSH before running this script" && exit)
echo -e "\n=============================="
echo "Pulled latest code from master"
echo "=============================="

npm i || (echo "Failed to update dependencies" && exit)
echo -e "\n============"
echo "Updated deps"
echo "============"

npm run build || (echo "Failed nuxt build" && exit)
echo -e "\n============================="
echo "Built latest code from master"
echo "============================="

pm2 start || (echo "pm2 failed to launch daemon, check ecosystem.config.js" && exit)
echo -e "\n===="
echo "Done"
echo "===="