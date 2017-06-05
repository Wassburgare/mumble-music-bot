import lame from 'lame';
import fs from 'fs';
import path from 'path';
import EventEmitter from 'events';
import config from './config';

const nextSong = () => {
  if (!process.stdin.isTTY) {
    return process.stdin;
  }

  const musicDir = path.join(__dirname, config.musicDir);
  // Should probably improve this file check...
  const songs = fs.readdirSync(musicDir).filter(song => /\.(mp3)$/i.test(song));
  const songName = songs[Math.floor(Math.random() * songs.length)];

  if (!songName) {
    console.error(`No MP3 file was found in ${musicDir}.`);
    process.exit(1);
  }

  return fs.createReadStream(`${musicDir}/${songName}`);
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
      this.removeAllListeners();
      console.log('Music stopped playing.');
    }
  }
}

export default MusicPlayer;
