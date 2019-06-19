#!/bin/bash
export PM2_HOME=/home/ubuntu/.pm2
pm2 stop instaHub
pm2 delete instaHub
cd /home/ubuntu/instaHub/
pm2 start --name instaHub npm -- start
