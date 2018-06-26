const settings = require("../settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: settings
});

module.exports = knex;