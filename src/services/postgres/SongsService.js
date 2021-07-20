/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');

class SongsSevice {
  constructor() {
    this._pool = new Pool();
  }
}

module.exports = SongsSevice;
