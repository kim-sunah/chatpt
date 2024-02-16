
PROJECT_ROOT="/home/ubuntu/app/backend"
REACT_ROOT="/home/ubuntu/app/frontend"
ROOM_ROOT="/home/ubuntu/app/room"
APP_NAME="nest"
REACT_APP_NAME="react"
ROOM_NAME="node"
PM2_PATH="/home/ubuntu/.nvm/versions/node/v21.5.0/bin/pm2"

TIME_NOW=$(date +%c)

cd $PROJECT_ROOT || { echo "Failed to change directory to $PROJECT_ROOT"; exit 1; }

# Ensure pm2 is installed
command -v pm2 >/dev/null 2>&1 || { echo "pm2 is not installed. Aborting."; exit 1; }

# Delete existing pm2 processes
$PM2_PATH delete $APP_NAME
$PM2_PATH delete $REACT_APP_NAME

# npm install
$PM2_PATH start npm --name $APP_NAME -- start || { echo "Failed to start $APP_NAME"; exit 1; }

cd $REACT_ROOT || { echo "Failed to change directory to $REACT_ROOT"; exit 1; }

# npm install
$PM2_PATH start npm --name $REACT_APP_NAME -- start || { echo "Failed to start $REACT_APP_NAME"; exit 1; }

echo "$TIME_NOW > Deploy has been completed"

# #!/usr/bin/env bash

# PROJECT_ROOT="/home/ubuntu/app/backend"
# REACT_ROOT="/home/ubuntu/app/frontend"
# APP_NAME="nest"
# REACT_APP_NAME="react"
# PM2_PATH="/home/ubuntu/.nvm/versions/node/v21.5.0/bin/pm2"

# TIME_NOW=$(date +%c)

# cd $PROJECT_ROOT

# pm2 delete $APP_NAME
# pm2 delete $REACT_APP_NAME

# # npm install
# pm2 start npm --name $APP_NAME -- start

# cd $REACT_ROOT 

# # npm install
# pm2 start npm --name $REACT_APP_NAME -- start

cd $ROOM_ROOT

pm2 start npm --name $ROOM_NAME -- start

echo "$TIME_NOW > Deploy has been completed"
