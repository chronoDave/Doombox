import { Howler, Howl } from 'howler';
import EventEmitter from 'events';

// Const
import { AUDIO } from '../../const';

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
  }

  sanitize(index) {
    const { playlist } = this;

    if (index < 0) return playlist.length - 1;
    if (index > playlist.length - 1) return 0;
    return index;
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

  /**
   * Skip to next or previous
   * @param {String} direction 'next' or 'prev'
   */
  skip(direction) {
    const { index } = this;

    switch (direction) {
      case 'next':
        if (index >= this.playlist.length - 1) return this.play(0);
        return this.play(index + 1);
      case 'prev':
        if (index <= 0) return this.play(this.playlist.length - 1);
        return this.play(index - 1);
      default:
        throw new Error('Invalid direction');
    }
  }

  skipTo(index) {
    this.play(this.sanitize(index));
  }

  play(index = this.index) {
    const emitPosition = () => {
      const position = this.song.seek() || 0;
      this.emit('position', position);
    };

    if (this.state === AUDIO.PAUSED) {
      this.song.play();
      this.state = AUDIO.PLAYING;
      this.emit('state', this.state);
    } else {
      if (this.song) this.song.unload();
      if (this.state !== AUDIO.PLAYING) this.state = AUDIO.PLAYING;
      this.emit('current', this.playlist[index]);

      this.song = new Howl({
        src: this.playlist[index].path,
        html5: true,
        autoplay: true,
        onload: () => {
          this.index = index;
        },
        onend: () => {
          clearInterval(emitPosition);
          this.skip('next');
        },
        onplay: () => {
          setInterval(emitPosition, 500);
          this.emit('state', this.state);
        }
      });
    }
  }

  pause() {
    this.song.pause();
    this.state = AUDIO.PAUSED;
    this.emit('state', this.state);
  }

  stop() {
    if (this.song) this.song.unload();
    this.playlist = [];
    this.state = AUDIO.STOPPED;
    this.emit('state', this.state);
  }
}
