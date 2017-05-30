import mumble from 'mumble';
import config from 'config';
import MusicPlayer from './MusicPlayer';

const host = config.get('host');
const port = config.get('port');
const botName = config.get('botName');
const muteUsers = config.get('muteUsers');

mumble.connect(`${host}:${port}`, (error, client) => {
  const musicPlayer = new MusicPlayer(client);

  if (error) {
    throw new Error(error);
  }

  client.on('initialized', () => {
    const users = client.users().filter(
      user => muteUsers.includes(user.name),
    );

    if (!users.some(user => user.selfMute == null)) {
      musicPlayer.play(client);
    }
  });

  client.on('user-self-mute', (user, muted) => {
    if (muteUsers.includes(user.name)) {
      if (muted) {
        musicPlayer.play();
      } else {
        musicPlayer.stop();
      }
    }
  });

  client.authenticate(botName);
});
