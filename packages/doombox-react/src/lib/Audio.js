import { Howler, Howl } from 'howler';
import EventEmitter from 'events';
import { toArray, STATUS } from '@doombox/utils';

// Utils
import { EVENT } from '../utils/const';

class Audio extends EventEmitter {
  constructor() {
    super();

    // General
    this.instance = null; // Current song
    this.autoplay = true;
    this.status = STATUS.AUDIO.STOPPED;

    // Volume
    this.volume = 1;
    this.muted = false;

    // Playlist
    this.playlist = {
      collection: [],
      index: 0
    };

    // Bind
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
    this.seek = this.seek.bind(this);

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.skipTo = this.skipTo.bind(this);
    this.addPlaylist = this.addPlaylist.bind(this);
    this.setPlaylist = this.setPlaylist.bind(this);

    this.mute = this.mute.bind(this);
    this.setVolume = this.setVolume.bind(this);
  }

  // Player
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
    Howler.unload(); // Make sure all instances are deleted
    this.instance = null;
  }

  seek(pos) {
    if (this.instance) {
      this.instance.seek(pos);
      this.emit(EVENT.AUDIO.POSITION, pos);
    }
  }

  // Volume
  setVolume(volume) {
    if (volume > 0 && volume <= 1) {
      this.volume = volume;
      if (this.instance) this.instance.volume = this.volume;
      this.emit(EVENT.AUDIO.VOLUME, this.volume);
    }
  }

  mute() {
    this.muted = !this.muted;
    if (this.instance) this.instance.mute();
    this.emit(EVENT.AUDIO.MUTED, this.muted);
  }

  // Playlist
  addPlaylist(collection) {
    this.playlist.collection = this.playlist.collection
      .concat(toArray(collection));
    this.emit(EVENT.AUDIO.PLAYLIST, this.playlist);
  }

  setPlaylist(playlist) {
    this.playlist = playlist;
    this.emit(EVENT.AUDIO.PLAYLIST, this.playlist);
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

  skipTo(n) {
    if (n < this.playlist.collection.length && n > 0) {
      this.playlist.index = n;
      this.create();
    }
  }

  create(song) {
    // Make sure there's never multiple istances
    if (this.instance) this.instance.unload();
    // Don't create new instance if song is invalid
    if (song || this.playlist.collection[this.playlist.index]) {
      const { file } = song || this.playlist.collection[this.playlist.index];

      this.instance = new Howl({
        src: new URL(file).href,
        volume: this.volume,
        html5: true,
        format: ['mp3'],
        autoplay: this.autoplay,
        onload: () => {
          this.emit(EVENT.AUDIO.DURATION, this.instance.duration());
          this.emit(EVENT.AUDIO.SONG, song || this.playlist.collection[this.playlist.index]);
        },
        onplay: () => {
          this.status = STATUS.AUDIO.PLAYING;
          this.emit(EVENT.AUDIO.STATUS, this.status);
        },
        onpause: () => {
          this.status = STATUS.AUDIO.PAUSED;
          this.emit(EVENT.AUDIO.STATUS, this.status);
        },
        onstop: () => {
          this.status = STATUS.AUDIO.STOPPED;
          this.emit(EVENT.AUDIO.STATUS, this.status);
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
