const ClientError = require('../../exceptions/ClientError');

/* eslint-disable no-underscore-dangle */
class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  postSongHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const {
        title = 'untitled',
        year,
        performer,
        genre,
        duration,
      } = request.payload;

      const songId = this._service.addSong({
        title,
        year,
        performer,
        genre,
        duration,
      });

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan',
        data: {
          songId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(400);
        return response;
      }

      // Server Error!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  getSongsHandler() {
    const songs = this._service.getSongs();
    return {
      status: 'success',
      data: {
        songs: songs.map((item) => ({ id: item.id, title: item.title, performer: item.performer })),
      },
    };
  }

  getSongByIdHandler(request, h) {
    try {
      const { songId } = request.params;
      const song = this._service.getSongById(songId);
      return {
        status: 'success',
        data: {
          song: {
            id: song.id,
            title: song.title,
            year: parseInt(song.year, 10),
            performer: song.performer,
            genre: song.genre,
            duration: parseInt(song.duration, 10),
            insertedAt: song.insertedAt,
            updatedAt: song.updatedAt,
          },
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  putSongByIdHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const { songId } = request.params;
      this._service.editSongById(songId, request.payload);
      return {
        status: 'success',
        message: 'Lagu berhasil diperbarui',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  deleteSongByIdHandler(request, h) {
    try {
      const { songId } = request.params;
      this._service.deleteSongById(songId);
      return {
        status: 'success',
        message: 'Lagu berhasil dihapus',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: 'Lagu gagal dihapus. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = SongsHandler;
