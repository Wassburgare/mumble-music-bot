import program from 'commander';

program
  .option('-H, --host [host]', 'Hostname of Mumble server')
  .option('-p, --port [port]', 'Port of Mumble server')
  .option('-n, --bot-name [name]', 'Username of bot')
  .option('-m, --mute-users [users]', 'Bot mutes itself when users in this list are unmuted')
  .option('-j, --join-users [users]', 'Bot mutes itself when users in this list are connected')
  .option('-M, --music-dir [dir]', 'Path to music directory')
  .option('-c, --config-dir [dir]', 'Set directory of config file', '')
  .parse(process.argv);

export default program;
