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

### Certificate

If you want to connect using a certificate, generate a private key and a self-signed certificate:
```
$ openssl req -x509 -newkey rsa:2048 -nodes -keyout build/mumble.pem -out build/mumble.pem
```
Then configure the bot to use the key and certificate. See [Configurations](#configurations) for more information.

## Configurations

To configure the bot, edit `build/config.json` or pass configurations as options.  

The following configurations can be made:

| <center>Config name</center> | <center>Option</center> | <center>Description</center> |
| --- | --- | --- |
| `host` | `-H`, `--host [host]` | Hostname of Mumble server |
| `port` | `-p`, `--port [port]` | Port of Mumble server |
| `botName` | `-n`, `--bot-name [name]` | Username of bot |
| `muteUsers` | `-m`, `--mute-users [users]` | Bot mutes itself when users in this list are unmuted |
| `joinUsers` | `-j`, `--join-users [users]` | Bot mutes itself when users in this list are connected |
| `musicDir` | `-M`, `--music-dir [dir]` | Path to music directory |
| `configDir` | `-c`, `--config-dir [dir]` | Path to config directory |
| `privateKey` | `-k`, `--private-key` | Path to private key file |
| `certificate` | `-C`, `--certificate` | Path to certificate file |
