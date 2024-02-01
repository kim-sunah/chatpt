#!/usr/bin/env bash

PROJECT_ROOT="/home/ubuntu/app"
REACT_ROOT="/home/ubuntu/app/frontend"
APP_NAME="project"
REACT_APP_NAME="project"
PM2_PATH="/home/ubuntu/.nvm/versions/node/v21.5.0/bin/pm2"

TIME_NOW=$(date +%c)

cd $PROJECT_ROOT

pm2 delete $APP_NAME
cd backend
pm2 start npm --name "npm run start"-- start

cd $REACT_ROOT
pm2 start npm --name "npm run start" -- start

echo "$TIME_NOW > Deploy has been completed"