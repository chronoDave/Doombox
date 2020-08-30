import { Howler, Howl } from 'howler';
import EventEmitter from 'events';
import {
  TYPES,
  clamp,
  toArray
} from '@doombox/utils';

class Audio extends EventEmitter {
  constructor() {
    super();

    this.instance = null; // Song instance
    this.autoplay = true;
    this.status = TYPES.STATUS.AUDIO.STOPPED;
    this.volume = 1;
    this.muted = false;

    this.playlist = {
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
    this.setPlaylist = this.setPlaylist.bind(this);

    this.mute = this.mute.bind(this);
    this.setVolume = this.setVolume.bind(this);

    this.create = this.create.bind(this);
  }

  play() {
    if (this.instance && this.status !== TYPES.STATUS.AUDIO.PLAYING) {
      this.instance.play();
    } else if (this.playlist.collection.length > 0) {
      this.create();
    }
  }

  pause() {
    if (this.instance) {
      if (this.status === TYPES.STATUS.AUDIO.PLAYING) this.instance.pause();
      if (this.status === TYPES.STATUS.AUDIO.PAUSED) this.instance.play();
    }
  }

  stop() {
    Howler.unload(); // Remove all instances
    this.instance = null;
  }

  seek(pos) {
    if (this.instance) {
      this.instance.seek(pos);

      this.emit(TYPES.EVENT.AUDIO.POSITION, pos);
    }
  }

  setVolume(volume) {
    this.volume = clamp(0, 1, volume);

    if (this.instance) this.instance.volume = volume;

    this.emit(TYPES.EVENT.AUDIO.VOLUME);
  }

  mute() {
    this.muted = !this.muted;

    if (this.instance) this.instance.mute();

    this.emit(TYPES.EVENT.AUDIO.MUTED, this.muted);
  }

  add(songs) {
    this.playlist.collection = this.playlist.collection
      .concat(toArray(songs));

    this.emit(TYPES.EVENT.AUDIO.PLAYLIST, this.playlist);
  }

  setPlaylist(playlist) {
    this.playlist = playlist;

    if (!this.playlist.index) this.playlist.index = 0;

    this.emit(TYPES.EVENT.AUDIO.PLAYLIST, this.playlist);
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
    this.playlist.index = clamp(0, this.playlist.collection.length - 1, n);

    this.create();
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
          this.emit(TYPES.EVENT.AUDIO.DURATION, this.instance.duration());
          this.emit(TYPES.EVENT.AUDIO.METADATA, song);
        },
        onplay: () => {
          this.status = TYPES.STATUS.AUDIO.PLAYING;

          this.emit(TYPES.EVENT.AUDIO.STATUS, this.status);
        },
        onpause: () => {
          this.status = TYPES.STATUS.AUDIO.PAUSED;

          this.emit(TYPES.EVENT.AUDIO.STATUS, this.status);
        },
        onstop: () => {
          this.status = TYPES.STATUS.AUDIO.STOPPED;

          this.emit(TYPES.EVENT.AUDIO.STATUS, this.status);
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
