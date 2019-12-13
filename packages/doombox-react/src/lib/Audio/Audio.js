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
    this.playlist = [];
    this.playlistIndex = 0;

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
    if (this.playlist.length === 0) return;
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
  setPlaylist(playlist) {
    this.playlist = playlist;
    this.emit(EVENT.AUDIO.PLAYLIST, this.playlist);
  }

  next() {
    if (this.playlist.length === 0) return;
    if (this.playlistIndex >= this.playlist.length - 1) {
      this.playlistIndex = 0;
    } else {
      this.playlistIndex += 1;
    }
    this.newSong();
  }

  previous() {
    if (this.playlist.length === 0) return;
    if (this.playlistIndex <= 0) {
      this.playlistIndex = this.playlist.length - 1;
    } else {
      this.playlistIndex -= 1;
    }
    this.newSong();
  }

  shuffle() {
    if (this.playlist.length === 0) return;
    this.playlist = shuffleArray(this.playlist);
    this.emit(EVENT.AUDIO.PLAYLIST, this.playlist);
    this.playlistIndex = 0;
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

    return ({
      partySize: this.playlistIndex + 1,
      partyMax: this.playlist.length,
      largeImageKey: validateKey(),
      state: `by ${metadata.artist}`,
      details: metadata.title,
      ...properties
    });
  }

  // Song
  newSong() {
    // Makes sure that there's never multiple Howler instances
    if (this.current) this.current.unload();

    const {
      file,
      metadata
    } = this.playlist[this.playlistIndex];

    this.current = new Howl({
      src: path.join('file://', path.resolve(file)),
      html5: true,
      volume: this.volume,
      autoplay: this.autoplay,
      onload: () => {
        this.emit(EVENT.AUDIO.DURATION, this.current.duration());
        this.emit(EVENT.AUDIO.CURRENT, this.playlist[this.playlistIndex]);
        this.emit(EVENT.AUDIO.RPC, this.newRpcMessage(metadata, {
          smallImageKey: this.autoplay ? STATUS.AUDIO.PLAYING : STATUS.AUDIO.PAUSED,
          startTimestamp: Date.now(),
          endTimestamp: Date.now() + Math.round(this.current.duration() * 1000)
        }));
        this.status = this.autoplay ? STATUS.AUDIO.PLAYING : STATUS.AUDIO.PAUSED;
        this.emit(EVENT.AUDIO.STATUS, this.status);
      },
      onplay: () => {
        requestAnimationFrame(this.step.bind(this));
        this.emit(EVENT.AUDIO.RPC, this.newRpcMessage(metadata, {
          smallImageKey: STATUS.AUDIO.PAUSED,
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
