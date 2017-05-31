import lame from 'lame';
import fs from 'fs';
import EventEmitter from 'events';
import config from 'config';

const getSongs = () => {
  const musicDir = config.get('musicDir');
  const regex = /\.(mp3)$/i;

  return fs.readdirSync(musicDir)
    .filter(song => regex.test(song))
    .map(song => `${musicDir}/${song}`);
};

const getRandomSong = () => {
  const songs = getSongs();

  return songs[Math.floor(Math.random() * songs.length)];
};

const getSong = () => {
  const playOrder = config.get('playOrder');
  switch (playOrder) {
    case 'random':
      return getRandomSong();
    case 'loop':
      return getRandomSong();
    default:
      console.warn(`Invalid config value "${playOrder}" for playOrder specified. Playing random song instead.`);
      return getRandomSong();
  }
};

const nextSong = () => {
  if (!process.stdin.isTTY) {
    return process.stdin;
  }

  const song = getSong();

  if (!song) {
    console.error(`No MP3 file was found in ${config.get('musicDir')}.`);
    process.exit(1);
  }

  return fs.createReadStream(song);
};

class MusicPlayer extends EventEmitter {

  constructor(client) {
    super();
    this.client = client;
    this.isPlaying = false;
  }

  play() {
    this.playSong();

    this.on('song-end', () => {
      this.playSong();
    });
  }

  playSong() {
    if (this.isPlaying) {
      return;
    }

    const lameDecoder = new lame.Decoder();

    lameDecoder.on('format', (format) => {
      this.stream.pipe(this.client.inputStream({
        channels: format.channels,
        sampleRate: format.sampleRate,
        gain: 0.25,
      }));
    });

    this.isPlaying = true;
    this.stream = nextSong().pipe(lameDecoder);
    console.log('Music started playing.');

    this.stream.on('end', () => {
      this.isPlaying = false;
      console.log('Song ended.');
      this.emit('song-end');
    });
  }

  stop() {
    if (this.stream) {
      this.stream.unpipe();
      this.stream.end();
      this.isPlaying = false;
      console.log('Music stopped playing.');
    }
  }
}

export default MusicPlayer;
