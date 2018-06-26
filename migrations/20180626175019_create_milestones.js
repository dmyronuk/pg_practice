// The milestones table should have the following fields:
//     description (string)
//     date_achieved (date)

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('milestones', function(table){
      table.increments('id').primary();
      table.string('description');
      table.time("date_achieved");
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones')
  ])
};
