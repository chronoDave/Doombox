import { Howler, Howl } from 'howler';
import EventEmitter from 'events';
import path from 'path';

// Utils
import { shuffleArray } from '../../utils';
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
      name: 'Default Playlist',
      src: null,
      collection: [],
      index: 0
    };

    // Discord
    this.rpc = {
      imageKey: null
    };

    // MediaSession
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => this.play());
      navigator.mediaSession.setActionHandler('pause', () => this.pause());
      navigator.mediaSession.setActionHandler('stop', () => this.stop());
      navigator.mediaSession.setActionHandler('previoustrack', () => this.previous());
      navigator.mediaSession.setActionHandler('nexttrack', () => this.next());
    }
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
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
      }
    } else {
      this.current.pause();
      this.status = STATUS.AUDIO.PAUSED;
      this.emit(EVENT.AUDIO.STATUS, this.status);
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
    }
  }

  stop() {
    Howler.unload();
    this.current = null;
    this.status = STATUS.AUDIO.STOPPED;
    this.emit(EVENT.AUDIO.DURATION, 0);
    this.emit(EVENT.AUDIO.POSITION, 0);
    this.emit(EVENT.AUDIO.STATUS, this.status);
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'none';
    }
  }

  // Playlist
  /**
   * @param {Object[]} collection - Array of song objects
   * @param {String} name - Playlist name
   * @param {String=} src - Playlist image source
   */
  setPlaylist(name, collection, src) {
    this.playlist = {
      name,
      collection,
      src,
      index: 0
    };
    this.emit(EVENT.AUDIO.PLAYLIST, this.playlist);
  }

  addPlaylist(collection) {
    this.playlist = {
      ...this.playlist,
      collection: {
        ...this.playlist.collection,
        ...collection
      }
    };
    this.emit(EVENT.AUDIO.PLAYLIST, this.playlist);
  }

  next() {
    if (this.playlist.collection.length === 0) return;
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

  shuffle() {
    if (this.playlist.collection.length === 0) return;
    this.playlist.collection = shuffleArray(this.playlist.collection);
    this.emit(EVENT.AUDIO.PLAYLIST, this.playlist);
    this.playlist.index = 0;
    this.newSong();
  }

  // RPC
  newRpcMessage(metadata, properties = {}) {
    const validateKey = () => {
      if (!this.rpc.imageKey) return 'icon';
      if (metadata[this.rpc.imageKey]) {
        if (Array.isArray(metadata[this.rpc.imageKey])) return metadata[this.rpc.imageKey][0];
        if (typeof metadata[this.rpc.imageKey] === 'object') return 'icon';
        return metadata[this.rpc.imageKey];
      }
      return 'icon';
    };

    let party = {};
    if (this.playlist.index + 1 < this.playlist.collection.length) {
      party = {
        partySize: this.playlist.index + 1,
        partyMax: this.playlist.collection.length,
      };
    }

    return ({
      largeImageKey: validateKey(),
      largeImageText: metadata.albumartist,
      state: metadata.album,
      details: `${metadata.artist} - ${metadata.title}`,
      ...party,
      ...properties
    });
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
        this.emit(EVENT.AUDIO.RPC, this.newRpcMessage(metadata, {
          smallImageKey: this.autoplay ? STATUS.AUDIO.PLAYING : STATUS.AUDIO.PAUSED,
          startTimestamp: Date.now(),
          endTimestamp: Date.now() + Math.round(this.current.duration() * 1000)
        }));
        this.status = this.autoplay ? STATUS.AUDIO.PLAYING : STATUS.AUDIO.PAUSED;
        this.emit(EVENT.AUDIO.STATUS, this.status);
        if ('mediaSession' in navigator) {
          // eslint-disable-next-line no-undef
          navigator.mediaSession.metadata = new MediaMetadata({
            artist: metadata.artist,
            album: metadata.album,
            title: metadata.title
          });
          navigator.mediaSession.playbackState = 'playing';
        }
      },
      onplay: () => {
        requestAnimationFrame(this.step.bind(this));
        this.emit(EVENT.AUDIO.RPC, this.newRpcMessage(metadata, {
          smallImageKey: STATUS.AUDIO.PLAYING,
          startTimestamp: Date.now(),
          endTimestamp: Date.now() + Math.round(
            (this.current.duration() - this.current.seek()) * 1000
          )
        }));
      },
      onpause: () => {
        this.emit(EVENT.AUDIO.RPC, this.newRpcMessage(metadata, {
          smallImageKey: STATUS.AUDIO.PAUSED
        }));
      },
      onend: () => this.autoplay && this.next(),
      onloaderror: () => this.next(),
      onplayerror: () => this.next()
    });
  }
}

export default Audio;
