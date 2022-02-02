#!/bin/bash
git pull origin master || exit
echo -e "\n=============================="
echo "Pulled latest code from master"
echo "=============================="

npm i || exit
echo -e "\n============"
echo "Updated deps"
echo "============"

npm run build || exit
echo -e "\n============================="
echo "Built latest code from master"
echo "============================="

pm2 start || exit
echo -e "\n===="
echo "Done"
echo "===="