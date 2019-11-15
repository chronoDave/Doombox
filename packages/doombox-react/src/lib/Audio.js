import { Howler, Howl } from 'howler';
import EventEmitter from 'events';

// Types
import {
  createType,
  IMAGE,
  READ,
  ERROR,
  SUCCESS
} from '@doombox/utils/types/ipc';

// Api
import { fetchImage } from '../api';

// Utils
import {
  shuffleArray,
  localToRemoteUrl,
  cleanUrl
} from '../utils';
import { AUDIO_STATUS } from '../utils/const';

const { ipcRenderer } = window.require('electron');

class Audio extends EventEmitter {
  constructor(options) {
    super(options);

    const {
      volume,
      status,
      muted,
      playlist
    } = options;

    this.volume = volume;
    this.song = null;
    this.playlist = playlist;
    this.index = 0;
    this.status = status;
    this.muted = muted;

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
    // Unpause if paused and same song
    if (this.status === AUDIO_STATUS.PAUSED && this.index === index) {
      this.unpause();
    } else {
      // Update index
      this.index = index;

      if (this.song) this.song.unload();
      if (this.status !== AUDIO_STATUS.PLAYING) this.status = AUDIO_STATUS.PLAYING;
      this.emit('status', this.status);

      this.createHowl(this.playlist[index]);
    }
  }

  playOne(metadata) {
    if (metadata) {
      if (this.song) this.song.unload();
      if (this.status !== AUDIO_STATUS.PLAYING) this.status = AUDIO_STATUS.PLAYING;
      this.emit('status', this.status);

      this.createHowl(metadata);
    }
  }

  createHowl(metadata) {
    this.song = new Howl({
      src: `file://${cleanUrl(metadata.file)}`,
      html5: true,
      volume: this.volume / 100,
      autoplay: true,
      onload: () => {
        navigator.mediaSession.metadata.title = metadata.title;
        navigator.mediaSession.metadata.artist = metadata.artist;
        navigator.mediaSession.metadata.album = metadata.album;

        if (metadata.images) {
          fetchImage(metadata.images[0]);
        } else {
          this.emit('image', {});
        }

        this.emit('current', metadata);
        this.emit('duration', this.song.duration());
      },
      onloaderror: () => this.next(),
      onplayerror: () => this.next(),
      onend: () => this.next(),
      onplay: () => requestAnimationFrame(this.step.bind(this))
    });
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
    this.status = AUDIO_STATUS.PAUSED;
    this.emit('status', this.status);
    if (this.song) this.song.pause();
  }

  unpause() {
    this.status = AUDIO_STATUS.PLAYING;
    this.emit('status', this.status);
    if (this.song) this.song.play();
  }

  stop() {
    Howler.unload();
    this.song = null;
    this.playlist = [];
    this.status = AUDIO_STATUS.STOPPED;
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
