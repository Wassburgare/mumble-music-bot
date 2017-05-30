# Mumble Music Bot

Play music on Mumble servers. Currently only supports local MP3 files. Based on [node-mumble](https://github.com/Rantanen/node-mumble).

## Installation

Clone the repository and install dependencies:  
```
$ git clone https://github.com/Wassburgare/mumble-music-bot.git
$ cd mumble-music-bot
$ npm install
```
Place MP3 files in `music/`. Start the bot with `npm start`.

## Configurations

To configurate the bot, edit `config/default.json`.  

The following configurations can be made:

| <center>Config name</center> | <center>Description</center> |
| --- | --- |
| `host` | Hostname of Mumble server |
| `port` | Port of Mumble server |
| `botName` | Username of bot |
| `muteUsers` | List of users bot won't interrupt | 
| `musicDir` | Path to music directory |
