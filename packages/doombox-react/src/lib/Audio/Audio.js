import { Howler, Howl } from 'howler';
import EventEmitter from 'events';
import path from 'path';

// Utils
import {
  STATUS,
  EVENT
} from '../../utils/const';

class Audio extends EventEmitter {
  constructor() {
    super();

    // General
    this.status = STATUS.AUDIO.STOPPED;
    this.autoplay = true;

    // Player
    this.volume = 1;
    this.muted = false;

    // Current song instance
    this.current = null;

    // Playlist instance
    this.playlist = {
      collection: [],
      index: 0
    };

    // Discord
    this.rpc = {
      imageKey: null
    };
  }

  // General
  setAutoplay(autoplay) {
    this.autoplay = autoplay;
    this.emit(EVENT.AUDIO.AUTOPLAY, this.autoplay);
  }

  // Position
  step() {
    if (this.current && this.current.state !== 'unloaded') {
      this.emit(EVENT.AUDIO.POSITION, parseInt(this.current.seek(), 10));
      if (this.current.playing()) requestAnimationFrame(this.step.bind(this));
    }
  }

  seek(pos) {
    if (!this.current) return;
    this.current.seek(pos);
    this.emit(EVENT.AUDIO.POSITION, pos);
  }

  requestFrame() {
    if (this.current) requestAnimationFrame(this.step.bind(this));
  }

  // Volume
  setVolume(volume) {
    if (volume > 1 || volume < 0) return;
    this.volume = volume;
    if (this.current) this.current.volume(this.volume);
    this.emit(EVENT.AUDIO.VOLUME, this.volume);
  }

  mute() {
    this.muted = !this.muted;
    if (this.current) this.current.mute(this.muted);
    this.emit(EVENT.AUDIO.MUTED, this.muted);
  }

  // Status
  play() {
    if (this.playlist.collection.length === 0) return;
    if (!this.current) {
      this.newSong();
    } else {
      this.pause();
    }
  }

  pause() {
    if (!this.current) return;
    if (this.status === STATUS.AUDIO.PAUSED) {
      this.current.play();
      this.status = STATUS.AUDIO.PLAYING;
      this.emit(EVENT.AUDIO.STATUS, this.status);
    } else {
      this.current.pause();
      this.status = STATUS.AUDIO.PAUSED;
      this.emit(EVENT.AUDIO.STATUS, this.status);
    }
  }

  stop() {
    Howler.unload();
    this.current = null;
    this.status = STATUS.AUDIO.STOPPED;
    this.emit(EVENT.AUDIO.DURATION, 0);
    this.emit(EVENT.AUDIO.POSITION, 0);
    this.emit(EVENT.AUDIO.STATUS, this.status);
  }

  // Playlist
  /**
   * @param {Object} playlist
   * @param {String} playlist.name - Playlist name
   * @param {Object[]} playlist.collection - Array of song objects
   * @param {String=} playlist.src - Playlist image source
   * @param {Bool} autoplay - Should the playlist be played
   */
  setPlaylist(playlist) {
    this.playlist = { ...playlist, index: 0 };
    if (this.autoplay) this.newSong();
  }

  addPlaylist(playlist) {
    this.playlist.collection = [
      ...this.playlist.collection,
      ...playlist
    ];
  }

  shuffle(playlist) {
    if (this.playlist.collection.length === 0) return;
    this.playlist.collection = playlist;
    this.playlist.index = 0;
    this.newSong();
  }

  next() {
    if (this.playlist.collection.length === 0) {
      this.status = STATUS.AUDIO.STOPPED;
      this.emit(EVENT.AUDIO.STATUS, this.status);
      return;
    }
    if (this.playlist.index >= this.playlist.collection.length - 1) {
      this.playlist.index = 0;
    } else {
      this.playlist.index += 1;
    }
    this.newSong();
  }

  previous() {
    if (this.playlist.collection.length === 0) return;
    if (this.playlist.index <= 0) {
      this.playlist.index = this.playlist.collection.length - 1;
    } else {
      this.playlist.index -= 1;
    }
    this.newSong();
  }

  goTo(index) {
    const { collection } = this.playlist;

    if (collection.length === 0) return;
    if (index > collection.length - 1 || index < 0) return;
    this.playlist.index = index;
    this.newSong();
  }

  // Song
  newSong(song) {
    // Makes sure that there's never multiple Howler instances
    if (this.current) this.current.unload();

    const {
      file,
      metadata
    } = song || this.playlist.collection[this.playlist.index];

    this.current = new Howl({
      src: path.join('file://', path.resolve(file)),
      html5: true,
      volume: this.volume,
      autoplay: this.autoplay,
      onload: () => {
        this.emit(EVENT.AUDIO.DURATION, this.current.duration());
        this.emit(EVENT.AUDIO.CURRENT, song || this.playlist.collection[this.playlist.index]);
        this.status = this.autoplay ? STATUS.AUDIO.PLAYING : STATUS.AUDIO.PAUSED;
        this.emit(EVENT.AUDIO.STATUS, this.status);
      },
      onplay: () => {
        requestAnimationFrame(this.step.bind(this));
        this.emit(EVENT.AUDIO.RPC, metadata, {
          smallImageKey: STATUS.AUDIO.PLAYING,
          startTimestamp: Date.now(),
          endTimestamp:
            Date.now() +
            Math.round((this.current.duration() - this.current.seek()) * 1000)
        });
      },
      onpause: () => {
        this.emit(EVENT.AUDIO.RPC, metadata, { smallImageKey: STATUS.AUDIO.PAUSED });
      },
      onend: () => this.autoplay && this.next()
    });
  }
}

export default Audio;
