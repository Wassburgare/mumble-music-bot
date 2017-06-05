import path from 'path';
import fs from 'fs';
import jsonfile from 'jsonfile';
import program from './program';

const dir = path.join(__dirname, program.configDir);
const configPath = path.join(dir, 'config.json');

if (!fs.existsSync(configPath)) {
  const defaultConfig = {
    host: 'localhost',
    port: 64738,
    botName: 'mumble-music-bot',
    muteUsers: [],
    joinUsers: [],
    musicDir: './music',
  };

  jsonfile.writeFileSync(configPath, defaultConfig, { spaces: 2 });
}

export default jsonfile.readFileSync(configPath);
