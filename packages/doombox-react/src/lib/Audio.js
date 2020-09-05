import EventEmitter from 'events';

import {
  EVENTS,
  STATUS,
  clamp,
  toArray
} from '@doombox/utils';
import { Howler, Howl } from 'howler';

class Audio extends EventEmitter {
  constructor() {
    super();

    this.instance = null; // Song instance
    this.autoplay = true;
    this.status = STATUS.AUDIO.STOPPED;
    this.volume = 1;
    this.muted = false;

    this.playlist = {
      name: '',
      collection: [],
      index: 0
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
    this.seek = this.seek.bind(this);

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.skip = this.skip.bind(this);
    this.add = this.add.bind(this);
    this.set = this.set.bind(this);

    this.mute = this.mute.bind(this);
    this.setVolume = this.setVolume.bind(this);

    this.create = this.create.bind(this);
  }

  play() {
    if (this.instance && this.status !== STATUS.AUDIO.PLAYING) {
      this.instance.play();
    } else if (this.playlist.collection.length > 0) {
      this.create();
    }
  }

  pause() {
    if (this.instance) {
      if (this.status === STATUS.AUDIO.PLAYING) this.instance.pause();
      if (this.status === STATUS.AUDIO.PAUSED) this.instance.play();
    }
  }

  stop() {
    Howler.unload(); // Remove all instances
    this.instance = null;
  }

  seek(pos) {
    if (this.instance) {
      this.instance.seek(pos);

      this.emit(EVENTS.AUDIO.POSITION, pos);
    }
  }

  setVolume(volume) {
    const newVolume = clamp(0, 1, volume);

    this.volume = clamp(0, 1, newVolume);

    if (this.instance) this.instance.volume = newVolume;

    this.emit(EVENTS.AUDIO.VOLUME, this.volume);
  }

  mute(muted = !this.muted) {
    this.muted = muted;

    if (this.instance) this.instance.mute();

    this.emit(EVENTS.AUDIO.MUTED, this.muted);
  }

  add(songs) {
    if (!songs) return;
    if (Array.isArray(songs) && songs.length <= 0) return;

    this.playlist.collection = this.playlist.collection.concat(toArray(songs));

    this.emit(EVENTS.AUDIO.PLAYLIST, this.playlist);
  }

  set(playlist) {
    this.playlist = playlist;

    if (!this.playlist) this.playlist = {};
    if (!this.playlist.index) this.playlist.index = 0;
    if (!this.playlist.collection) this.playlist.collection = [];
    if (!this.playlist.name) this.playlist.name = '';

    this.emit(EVENTS.AUDIO.PLAYLIST, this.playlist);
  }

  next() {
    if (this.playlist.collection.length > 0) {
      this.playlist.index += 1;

      if (this.playlist.index > this.playlist.collection.length - 1) {
        this.playlist.index = 0;
      }

      this.create();
    }
  }

  previous() {
    if (this.playlist.collection.length > 0) {
      this.playlist.index -= 1;

      if (this.playlist.index < 0) {
        this.playlist.index = this.playlist.collection.length - 1;
      }

      this.create();
    }
  }

  skip(n) {
    if (this.playlist.collection.length > 0 && n) {
      this.playlist.index = clamp(0, this.playlist.collection.length - 1, n);

      this.create();
    }
  }

  create(song = this.playlist.collection[this.playlist.index]) {
    // Make sure there's never multiple instances
    if (this.instance) this.instance.unload();
    // Only create valid song
    if (song) {
      this.instance = new Howl({
        src: new URL(song.file).href,
        volume: this.volume,
        html5: true,
        format: song.format.container,
        autoplay: this.autoplay,
        onload: () => {
          this.emit(EVENTS.AUDIO.DURATION, this.instance.duration());
          this.emit(EVENTS.AUDIO.METADATA, song);
        },
        onplay: () => {
          this.status = STATUS.AUDIO.PLAYING;

          this.emit(EVENTS.AUDIO.STATUS, this.status);
        },
        onpause: () => {
          this.status = STATUS.AUDIO.PAUSED;

          this.emit(EVENTS.AUDIO.STATUS, this.status);
        },
        onstop: () => {
          this.status = STATUS.AUDIO.STOPPED;

          this.emit(EVENTS.AUDIO.STATUS, this.status);
        },
        onend: () => {
          if (this.autoplay) this.next();
        },
        onloaderror: console.error
      });
    }
  }
}

export default Audio;
