/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');

class SongsSevice {
  constructor() {
    this._songs = [];
  }

  addSong({
    title = 'untitled',
    year,
    performer,
    genre,
    duration,
  }) {
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newSong = {
      id,
      title,
      year,
      performer,
      genre,
      duration,
      insertedAt,
      updatedAt,
    };

    this._songs.push(newSong);

    const isSuccess = this._songs.filter((song) => song.id === id).length > 0;

    if (!isSuccess) {
      throw new Error('Lagu gagal ditambahkan');
    }

    return id;
  }

  getSongs() {
    return this._songs;
  }

  getSongById(songId) {
    const song = this._songs.filter((n) => n.id === songId)[0];
    if (!song) {
      throw new Error('Lagu tidak ditemukan');
    }
    return song;
  }

  editSongById(songId, {
    title,
    year,
    performer,
    genre,
    duration,
  }) {
    const index = this._songs.findIndex((song) => song.id === songId);

    if (index === -1) {
      throw new Error('Gagal memperbarui lagu. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._songs[index] = {
      ...this._songs[index],
      title,
      year,
      performer,
      genre,
      duration,
      updatedAt,
    };
  }

  deleteSongById(songId) {
    const index = this._songs.findIndex((song) => song.id === songId);

    if (index === -1) {
      throw new Error('Lagu gagal dihapus. Id tidak ditemukan');
    }

    this._songs.splice(index, 1);
  }
}

module.exports = SongsSevice;
