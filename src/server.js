const Hapi = require('@hapi/hapi');

// menambahkan plugins songs dan service
const songs = require('./api/songs');
const SongsSevice = require('./services/inMemory/SongsService');

const init = async () => {
  // instansiasi SongsService
  const songsService = new SongsSevice();

  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
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
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
