// menggunakan .env
require('dotenv').config();

const Hapi = require('@hapi/hapi');

// menambahkan plugins songs dan service
const songs = require('./api/songs');
const SongsSevice = require('./services/inMemory/SongsService');

// mendaftarkan validasi data
const SongsValidator = require('./validator/songs');

const init = async () => {
  // instansiasi SongsService
  const songsService = new SongsSevice();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // daftarkan plugins song dengan options.service bernilai songService
  await server.register({
    plugin: songs,
    options: {
      service: songsService,
      validator: SongsValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
