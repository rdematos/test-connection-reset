#!/bin/bash
sudo apt update -y
sudo apt install nodejs -y
sudo apt install npm -y
sudo apt install git -y
sudo git clone https://github.com/rdematos/test-connection-reset.git
cd test-connection-reset
npm install
npm start &