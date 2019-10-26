import { Howler, Howl } from 'howler';
import EventEmitter from 'events';

// Types
import {
  createType,
  IMAGE,
  READ,
  SONG,
  ERROR,
  SUCCESS
} from '@doombox/utils/types/ipc';

// Api
import {
  fetchImage,
  fetchMetadata
} from '../api';

// Utils
import {
  shuffleArray,
  localToRemoteUrl,
  cleanUrl
} from '../utils';
import { AUDIO } from '../utils/const';

const { ipcRenderer } = window.require('electron');

class Audio extends EventEmitter {
  constructor() {
    super();

    this.volume = 100;
    this.song = null;
    this.playlist = [];
    this.index = 0;
    this.status = AUDIO.STOPPED;
    this.muted = false;

    // Media session
    if ('mediaSession' in navigator) {
      // eslint-disable-next-line no-undef
      navigator.mediaSession.metadata = new MediaMetadata({});

      navigator.mediaSession.setActionHandler('play', () => this.play());
      navigator.mediaSession.setActionHandler('pause', () => this.pause());
      navigator.mediaSession.setActionHandler('previoustrack', () => this.previous());
      navigator.mediaSession.setActionHandler('nexttrack', () => this.next());
    }

    // IPC
    ipcRenderer.on(createType([SUCCESS, READ, IMAGE]), async (event, payload) => {
      this.emit('image', payload || {});

      if (payload) {
        const src = await localToRemoteUrl(cleanUrl(payload.path));
        navigator.mediaSession.metadata.artwork = [{ src, sizes: '128x128' }];
      }
    });
    ipcRenderer.on(createType([ERROR, READ, IMAGE]), () => {
      this.emit('image', {});

      navigator.mediaSession.metadata.artwork = [{ src: null }];
    });
    ipcRenderer.on(createType([SUCCESS, READ, SONG]), (event, payload) => {
      navigator.mediaSession.metadata.title = payload.title;
      navigator.mediaSession.metadata.artist = payload.artist;
      navigator.mediaSession.metadata.album = payload.album;

      this.emit('current', payload);
    });
  }

  set(playlist) {
    this.playlist = playlist;
    this.emit('playlist', this.playlist);
  }

  add(playlist) {
    this.playlist.push(playlist);
    this.emit('playlist', this.playlist);
  }

  shuffle() {
    this.playlist = shuffleArray(this.playlist);
    this.emit('playlist', this.playlist);
    this.play(0);
  }

  next() {
    if (this.index >= this.playlist.length - 1) {
      this.play(0);
    } else {
      this.play(this.index + 1);
    }
  }

  previous() {
    if (this.index <= 0) {
      this.play(this.playlist.length - 1);
    } else {
      this.play(this.index - 1);
    }
  }

  skip(index) {
    this.play(index);
  }

  play(index = this.index) {
    this.index = index;

    if (this.status === AUDIO.PAUSED) {
      this.status = AUDIO.PLAYING;
      this.emit('status', this.status);
      this.song.play();
    } else {
      const current = this.playlist[index];

      if (this.song) this.song.unload();
      if (this.status !== AUDIO.PLAYING) this.status = AUDIO.PLAYING;

      this.emit('status', this.status);

      this.song = new Howl({
        src: `file://${cleanUrl(current.file)}`,
        html5: true,
        volume: this.volume / 100,
        autoplay: true,
        onload: () => {
          fetchMetadata(current._id);

          if (current.images) {
            fetchImage(current.images[0]);
          } else {
            this.emit('image', {});
          }

          this.emit('duration', this.song.duration());
        },
        onloaderror: () => {
          this.next();
        },
        onplayerror: () => {
          this.next();
        },
        onend: () => {
          this.next();
        },
        onplay: () => {
          requestAnimationFrame(this.step.bind(this));
        }
      });
    }
  }

  requestFrame() {
    if (this.song && this.song.playing()) requestAnimationFrame(this.step.bind(this));
  }

  seek(position) {
    if (this.song) {
      this.song.seek(position);
      this.emit('position', position);
    }
  }

  step() {
    if (this.song && this.song.state !== 'unloaded') {
      const position = this.song.seek();
      if (typeof position === 'number') this.emit('position', position);
      if (this.song.playing()) requestAnimationFrame(this.step.bind(this));
    }
  }

  pause() {
    this.status = AUDIO.PAUSED;
    if (this.song) this.song.pause();
    this.emit('status', this.status);
  }

  stop() {
    Howler.unload();
    this.song = null;
    this.playlist = [];
    this.status = AUDIO.STOPPED;
    this.emit('status', this.status);
  }

  mute() {
    this.muted = !this.muted;
    this.emit('mute', this.muted);
    if (this.song) {
      this.song.mute(this.muted);
    }
  }

  setVolume(volume) {
    this.volume = volume;
    this.emit('volume', this.volume);
    if (this.song) {
      this.song.volume(volume / 100);
    }
  }
}

export default Audio;
