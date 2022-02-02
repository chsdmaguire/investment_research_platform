#!/bin/bash
git pull origin master || exit 1
echo -e "\n=============================="
echo "Pulled latest code from master"
echo "=============================="

npm i || exit 1
echo -e "\n============"
echo "Updated deps"
echo "============"

npm run build || exit 1
echo -e "\n============================="
echo "Built latest code from master"
echo "============================="

pm2 reload flibyrd-nuxt || exit 1
echo -e "\n===="
echo "Done"
echo "===="
exit 0