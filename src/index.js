import mumble from 'mumble';
import config from 'config';
import MusicPlayer from './MusicPlayer';

const host = config.get('host');
const port = config.get('port');
const botName = config.get('botName');
const muteUsers = config.get('muteUsers');
const joinUsers = config.get('joinUsers');

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
