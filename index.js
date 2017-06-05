import mumble from 'mumble';
import program from './src/program';
import config from './src/config';
import MusicPlayer from './src/MusicPlayer';

const host = program.host || config.host;
const port = program.port || config.port;
const botName = program.botName || config.botName;
const muteUsers = program.muteUsers || config.muteUsers;
const joinUsers = program.joinUsers || config.joinUsers;

mumble.connect(`${host}:${port}`, (error, client) => {
  const musicPlayer = new MusicPlayer(client);

  let users = [];

  const shouldPlay = () => {
    const userListMute = users.filter(
      user => muteUsers.includes(user.name),
    );

    const userListJoin = users.filter(
      user => joinUsers.includes(user.name),
    );

    return userListMute.every(user => user.selfMute === true) && userListJoin.length === 0;
  };

  if (error) {
    throw new Error(error);
  }

  client.on('initialized', () => {
    users = client.users();

    if (shouldPlay()) {
      musicPlayer.play();
    }
  });

  client.on('user-connect', (user) => {
    users.push(user);

    if (!shouldPlay()) {
      musicPlayer.stop();
    }
  });

  client.on('user-disconnect', (user) => {
    users = users.filter(u => u.name !== user.name);

    if (shouldPlay()) {
      musicPlayer.play();
    }
  });

  client.on('user-self-mute', (user, muted) => {
    if (shouldPlay()) {
      musicPlayer.play();
    } else {
      musicPlayer.stop();
    }
  });

  client.authenticate(botName);
});
