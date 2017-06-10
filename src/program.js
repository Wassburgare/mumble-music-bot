import program from 'commander';

program
  .option('-H, --host [host]', 'Set hostname of Mumble server')
  .option('-p, --port [port]', 'Set port of Mumble server')
  .option('-n, --bot-name [name]', 'Set username of bot')
  .option('-m, --mute-users [users]', 'Set list of users bot should mute itself on when users are unmuted')
  .option('-j, --join-users [users]', 'Set list of users bot should mute itself on when users are connected')
  .option('-M, --music-dir [dir]', 'Set path to music directory')
  .option('-c, --config-dir [dir]', 'Set path to directory of config file', '')
  .option('-k, --privateKey [key]', 'Set path to private key file')
  .option('-C, --certificate [cert]', 'Set path to certificate file')
  .parse(process.argv);

export default program;
