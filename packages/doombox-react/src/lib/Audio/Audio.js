import { Howler, Howl } from 'howler';
import EventEmitter from 'events';
import path from 'path';

// Utils
import { shuffleArray } from '../../utils';
import {
  AUDIO_STATUS,
  AUDIO_EVENTS
} from '../../utils/const';

class Audio extends EventEmitter {
  constructor(options = {}) {
    super(options);

    const {
      volume,
      playlist,
      autoplay
    } = options;

    // Player
    this.volume = volume;
    this.status = AUDIO_STATUS.STOPPED;
    this.autoplay = autoplay;
    this.muted = false;

    // Song
    this.song = null;

    // Playlist
    this.playlist = playlist;
    this.playlistIndex = 0;
  }

  setVolume(volume) {
    this.volume = volume;

    if (this.song) this.song.volume(this.volume);

    this.emit(AUDIO_EVENTS.VOLUME, this.volume);
  }

  increaseVolume() {
    if (this.volume < 1) {
      this.volume = this.volume + 0.01;
      if (this.song) this.song.volume(this.volume);
      this.emit(AUDIO_EVENTS.VOLUME, this.volume);
    }
  }

  decreaseVolume() {
    if (this.volume > 0) {
      this.volume = this.volume - 0.01;
      if (this.song) this.song.volume(this.volume);
      this.emit(AUDIO_EVENTS.VOLUME, this.volume);
    }
  }

  mute() {
    this.muted = !this.muted;

    if (this.song) this.song.mute(this.muted);

    this.emit(AUDIO_EVENTS.MUTED, this.muted);
  }

  createPlaylist(playlist) {
    this.playlist = playlist;
    this.emit(AUDIO_EVENTS.PLAYLIST, this.playlist);
  }

  createSong() {
    if (this.song) this.song.unload();

    const metadata = this.playlist[this.playlistIndex];

    this.song = new Howl({
      src: path.join('file://', path.resolve(metadata.file)),
      html5: true,
      volume: this.volume,
      autoplay: true,
      onload: () => {
        this.emit(AUDIO_EVENTS.DURATION, this.song.duration());
      },
      onend: () => this.autoplay && this.next(),
      onplay: () => requestAnimationFrame(this.step.bind(this))
    });

    this.status = AUDIO_STATUS.PLAYING;
    this.emit(AUDIO_EVENTS.STATUS, this.status);
  }

  step() {
    if (this.song && this.song.state !== 'unloaded') {
      const position = this.song.seek();

      if (typeof position === 'number') this.emit(AUDIO_EVENTS.POSITION, position);
      if (this.song.playing()) requestAnimationFrame(this.step.bind(this));
    }
  }

  seek(position) {
    if (!this.song) return;

    this.song.seek(position);
    this.emit(AUDIO_EVENTS.POSITION, position);
  }

  requestFrame() {
    if (this.song) requestAnimationFrame(this.step.bind(this));
  }

  play() {
    if (this.playlist.length === 0) return;

    if (this.song && this.status === AUDIO_STATUS.PAUSED) {
      this.song.play();
      this.status = AUDIO_STATUS.PLAYING;
      this.emit(AUDIO_EVENTS.STATUS, this.status);
    } else {
      this.createSong();
    }
  }

  pause() {
    if (!this.song) return;

    this.song.pause();
    this.status = AUDIO_STATUS.PAUSED;
    this.emit(AUDIO_EVENTS.STATUS, this.status);
  }

  stop() {
    Howler.unload();

    this.song = null;
    this.status = AUDIO_STATUS.STOPPED;

    this.emit(AUDIO_EVENTS.DURATION, 0);
    this.emit(AUDIO_EVENTS.POSITION, 0);
    this.emit(AUDIO_EVENTS.STATUS, this.status);
  }

  next() {
    if (this.playlistIndex >= this.playlist.length - 1) {
      this.playlistIndex = 0;
    } else {
      this.playlistIndex = this.playlistIndex + 1;
    }

    this.createSong();
  }

  previous() {
    if (this.playlistIndex <= 0) {
      this.playlistIndex = this.playlist.length - 1;
    } else {
      this.playlistIndex = this.playlistIndex - 1;
    }

    this.createSong();
  }

  shuffle() {
    this.playlist = shuffleArray(this.playlist);
    this.emit(AUDIO_EVENTS.PLAYLIST, this.playlist);
  }
}

export default Audio;
