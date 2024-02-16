#!/usr/bin/env bash

PROJECT_ROOT="/home/ubuntu/app/backend"
REACT_ROOT="/home/ubuntu/app/frontend"
APP_NAME="nest"
REACT_APP_NAME="react"
PM2_PATH="/home/ubuntu/.nvm/versions/node/v21.5.0/bin/pm2"

TIME_NOW=$(date +%c)

cd $PROJECT_ROOT

pm2 delete $APP_NAME
pm2 delete $REACT_APP_NAME

# npm install
pm2 start npm --name $APP_NAME -- start

cd $REACT_ROOT 

# npm install
pm2 start npm --name $REACT_APP_NAME -- start

echo "$TIME_NOW > Deploy has been completed"

cd $ROOM_ROOT

pm2 start npm --name $ROOM_NAME -- start

echo "$TIME_NOW > Deploy has been completed"