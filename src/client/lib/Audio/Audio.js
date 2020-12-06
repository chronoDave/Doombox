import EventEmitter from 'events';
import url from 'url';

import { Howler, Howl } from 'howler';

import { clamp, shuffle, toArray } from '@doombox-utils';
import { EVENTS, STATUS } from '@doombox-utils/types';

class Audio extends EventEmitter {
  constructor({ autoplay = true, volume = 1 } = {}) {
    super();

    this.autoplay = autoplay;
    this.volume = volume;

    this.instance = null; // Song instance
    this.status = STATUS.AUDIO.STOPPED;
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
    this.step = this.step.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.skip = this.skip.bind(this);
    this.add = this.add.bind(this);
    this.set = this.set.bind(this);
    this.mute = this.mute.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.create = this.create.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  seek(pos) {
    if (this.instance) {
      this.instance.seek(pos);
      this.step(pos);
    }
  }

  step(pos = null) {
    if (this.instance) {
      const newPos = Math.round(pos || this.instance.seek());

      if (!Number.isNaN(newPos)) this.emit(EVENTS.AUDIO.POSITION, newPos);
      if (this.status === STATUS.AUDIO.PLAYING) requestAnimationFrame(() => this.step());
    }
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

  setVolume(volume) {
    const newVolume = clamp(0, 1, volume);

    this.volume = newVolume;

    if (this.instance) this.instance.volume(newVolume);

    this.emit(EVENTS.AUDIO.VOLUME, this.volume);
  }

  mute() {
    this.muted = !this.muted;

    if (this.instance) {
      this.instance.mute(this.muted);
    }

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

    this.create();

    this.emit(EVENTS.AUDIO.PLAYLIST, this.playlist);
  }

  shuffle() {
    if (this.playlist.collection.length > 0) {
      this.playlist.collection = shuffle(this.playlist.collection);
      this.playlist.index = 0;

      this.create();

      this.emit(EVENTS.AUDIO.PLAYLIST, this.playlist);
    }
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
    if (this.playlist.collection.length > 0 && typeof n === 'number') {
      this.playlist.index = clamp(0, this.playlist.collection.length - 1, n);

      this.create();
    }
  }

  create(song = this.playlist.collection[this.playlist.index]) {
    // Make sure there's never multiple instances
    if (this.instance) this.instance.unload();
    // Only create valid song
    if (song) {
      this.emit(EVENTS.AUDIO.STATUS, STATUS.AUDIO.STOPPED);

      this.instance = new Howl({
        src: url.pathToFileURL(song.file).href,
        volume: this.volume,
        html5: true,
        autoplay: this.autoplay,
        mute: this.muted,
        onload: () => {
          this.emit(EVENTS.AUDIO.DURATION, Math.round(this.instance.duration()));
          this.emit(EVENTS.AUDIO.METADATA, { _id: song._id, covers: song.covers, ...song.metadata });
        },
        onplay: () => {
          this.status = STATUS.AUDIO.PLAYING;

          this.emit(EVENTS.AUDIO.STATUS, this.status);

          requestAnimationFrame(() => this.step());
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
