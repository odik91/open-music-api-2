const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.addSongsHandler,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getSongshandler,
  },
  {
    method: 'GET',
    path: '/songs/{songId}',
    handler: handler.getSongByIdHandler,
  },
  {
    method: 'PUT',
    path: '/songs/{songId}',
    handler: handler.putNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/songs/{songId}',
    handler: handler.deleteSongByIdHandler,
  },
];

module.exports = routes;
