# Mumble Music Bot

Play music on Mumble servers. Currently only supports local MP3 files. Based on [node-mumble](https://github.com/Rantanen/node-mumble).

## Installation

Clone the repository, install all dependencies and build:  
```
$ git clone https://github.com/Wassburgare/mumble-music-bot.git
$ cd mumble-music-bot
$ npm install
$ npm run build
```
Place MP3 files in `build/music/`. Start the bot with `node build/bundle.js` or `npm start` (will also rebuild).

## Configurations

To configure the bot, edit `build/config.json`.  

The following configurations can be made:

| <center>Config name</center> | <center>Description</center> |
| --- | --- |
| `host` | Hostname of Mumble server |
| `port` | Port of Mumble server |
| `botName` | Username of bot |
| `muteUsers` | Bot mutes itself when users in this list are unmuted |
| `joinUsers` | Bot mutes itself when users in this list are connected |
| `musicDir` | Path to music directory |
