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

    // Player
    this.volume = 1;
    this.status = STATUS.AUDIO.STOPPED;
    this.autoplay = true;
    this.muted = false;

    // Song
    this.song = null;

    // Playlist
    this.playlist = [];
    this.playlistIndex = 0;

    // Discord
    this.rpc = {
      imageKey: null
    };
  }

  setVolume(volume) {
    this.volume = volume;

    if (this.song) this.song.volume(this.volume);

    this.emit(EVENT.AUDIO.VOLUME, this.volume);
  }

  setAutoplay(autoplay) {
    this.autoplay = autoplay;

    this.emit(EVENT.AUDIO.AUTOPLAY, this.autoplay);
  }

  setPlaylist(playlist) {
    this.playlist = playlist;

    this.emit(EVENT.AUDIO.PLAYLIST, this.playlist);
  }

  increaseVolume() {
    if (this.volume < 1) {
      this.volume += 0.01;
      if (this.song) this.song.volume(this.volume);
      this.emit(EVENT.AUDIO.VOLUME, this.volume);
    }
  }

  decreaseVolume() {
    if (this.volume > 0) {
      this.volume -= 0.01;
      if (this.song) this.song.volume(this.volume);
      this.emit(EVENT.AUDIO.VOLUME, this.volume);
    }
  }

  mute() {
    this.muted = !this.muted;

    if (this.song) this.song.mute(this.muted);

    this.emit(EVENT.AUDIO.MUTED, this.muted);
  }

  createPlaylist(playlist) {
    this.playlist = playlist;
    this.emit(EVENT.AUDIO.PLAYLIST, this.playlist);
  }

  createSong() {
    if (this.song) this.song.unload();

    const metadata = this.playlist[this.playlistIndex];

    const getImageKey = () => {
      if (!this.rpc.imageKey) return 'icon';
      if (metadata.metadata[this.rpc.imageKey]) {
        if (Array.isArray(metadata.metadata[this.rpc.imageKey])) {
          return metadata.metadata[this.rpc.imageKey][0];
        }
        if (typeof metadata.metadata[this.rpc.imageKey] === 'object') {
          return 'icon';
        }
        return metadata.metadata[this.rpc.imageKey];
      }
      return 'icon';
    };

    const defaultRpcPayload = {
      partySize: this.playlistIndex + 1,
      partyMax: this.playlist.length,
      largeImageKey: getImageKey(),
      state: `by ${metadata.metadata.artist}`,
      details: metadata.metadata.title
    };

    this.song = new Howl({
      src: path.join('file://', path.resolve(metadata.file)),
      html5: true,
      volume: this.volume,
      autoplay: true,
      onload: () => {
        this.emit(EVENT.AUDIO.DURATION, this.song.duration());
        this.emit(EVENT.AUDIO.METADATA, metadata);
        this.emit(EVENT.AUDIO.RPC, {
          ...defaultRpcPayload,
          smallImageKey: 'play',
          largeImageKey: getImageKey(),
          startTimestamp: Date.now(),
          endTimestamp: Date.now() + Math.round(this.song.duration() * 1000)
        });
      },
      onloaderror: () => this.next(),
      onplayerror: () => this.next(),
      onend: () => this.autoplay && this.next(),
      onplay: () => {
        requestAnimationFrame(this.step.bind(this));
        this.emit(EVENT.AUDIO.RPC, {
          ...defaultRpcPayload,
          smallImageKey: 'play',
          largeImageKey: getImageKey(),
          startTimestamp: Date.now(),
          endTimestamp: Date.now() + Math.round((this.song.duration() - this.song.seek()) * 1000)
        });
      },
      onpause: () => {
        this.emit(EVENT.AUDIO.RPC, {
          ...defaultRpcPayload,
          smallImageKey: 'pause',
          largeImageKey: getImageKey(),
        });
      }
    });

    this.status = STATUS.AUDIO.PLAYING;
    this.emit(EVENT.AUDIO.STATUS, this.status);
  }

  step() {
    if (this.song && this.song.state !== 'unloaded') {
      const position = this.song.seek();

      if (typeof position === 'number') this.emit(EVENT.AUDIO.POSITION, position);
      if (this.song.playing()) requestAnimationFrame(this.step.bind(this));
    }
  }

  seek(position) {
    if (!this.song) return;

    this.song.seek(position);
    this.emit(EVENT.AUDIO.POSITION, position);
  }

  requestFrame() {
    if (this.song) requestAnimationFrame(this.step.bind(this));
  }

  play() {
    if (this.playlist.length === 0) return;

    if (this.song && this.status === STATUS.AUDIO.PAUSED) {
      this.song.play();
      this.status = STATUS.AUDIO.PLAYING;
      this.emit(EVENT.AUDIO.STATUS, this.status);
      this.emit(EVENT.AUDIO.METADATA, this.playlist[this.playlistIndex]);
    } else {
      this.createSong();
    }
  }

  pause() {
    if (!this.song) return;

    this.song.pause();
    this.status = STATUS.AUDIO.PAUSED;
    this.emit(EVENT.AUDIO.STATUS, this.status);
  }

  stop() {
    Howler.unload();

    this.song = null;
    this.status = STATUS.AUDIO.STOPPED;

    this.emit(EVENT.AUDIO.DURATION, 0);
    this.emit(EVENT.AUDIO.POSITION, 0);
    this.emit(EVENT.AUDIO.STATUS, this.status);
  }

  next() {
    if (this.playlistIndex >= this.playlist.length - 1) {
      this.playlistIndex = 0;
    } else {
      this.playlistIndex += 1;
    }

    this.createSong();
  }

  previous() {
    if (this.playlistIndex <= 0) {
      this.playlistIndex = this.playlist.length - 1;
    } else {
      this.playlistIndex -= 1;
    }

    this.createSong();
  }

  shuffle() {
    if (this.playlist.length <= 0) return;
    this.playlist = shuffleArray(this.playlist);
    this.playlistIndex = 0;
    this.createSong();
    this.emit(EVENT.AUDIO.PLAYLIST, this.playlist);
  }
}

export default Audio;
