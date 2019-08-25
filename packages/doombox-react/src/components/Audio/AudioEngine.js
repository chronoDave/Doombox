import { Howler, Howl } from 'howler';
import EventEmitter from 'events';

// Const
import { AUDIO } from '../../constants';

// Utils
import { shuffleArray } from '../../utils';

export class AudioEngine extends EventEmitter {
  constructor() {
    super();

    this.volume = 100;
    this.song = null;
    this.playlist = [];
    this.index = 0;
    this.state = AUDIO.STOPPED;
    this.muted = false;
  }

  set(playlist) {
    this.playlist = playlist;
  }

  add(playlist) {
    this.playlist.push(playlist);
  }

  shuffle() {
    this.playlist = shuffleArray(this.playlist);
    this.play(0);
  }

  next() {
    if (this.index >= this.playlist.length - 1) return this.play(0);
    return this.play(this.index + 1);
  }

  previous() {
    if (this.index <= 0) return this.play(this.playlist.length - 1);
    return this.play(this.index - 1);
  }

  skipTo(index) {
    this.play(index);
  }

  play(index = this.index) {
    if (this.state === AUDIO.PAUSED) {
      this.song.play();
      this.state = AUDIO.PLAYING;
      this.emit('state', this.state);
    } else {
      if (this.song) this.song.unload();
      if (this.state !== AUDIO.PLAYING) this.state = AUDIO.PLAYING;

      this.song = new Howl({
        src: `file://${this.playlist[index].path}`,
        html5: true,
        volume: this.volume / 100,
        autoplay: true,
        onload: () => {
          this.index = index;
          this.emit('duration', this.song.duration());
        },
        onloaderror: () => {
          this.next();
        },
        onplayerror: () => {
          this.next();
        },
        onend: () => {
          this.next();
        },
        onplay: () => {
          this.emit('state', this.state);
          this.emit('current', this.playlist[index]);

          requestAnimationFrame(this.step.bind(this));
        }
      });
    }
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
    if (this.song) {
      const position = this.song.seek() || 0;
      this.emit('position', position);
      if (this.song.playing()) requestAnimationFrame(this.step.bind(this));
    }
  }

  pause() {
    if (this.song) {
      this.song.pause();
      this.state = AUDIO.PAUSED;
      this.emit('state', this.state);
    }
  }

  stop() {
    Howler.unload();
    this.song = null;
    this.playlist = [];
    this.state = AUDIO.STOPPED;
    this.emit('state', this.state);
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
