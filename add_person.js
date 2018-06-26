const knex = require("./db/db.create-knex-client.js")

// Implement an add_person.js script that takes in the first name, last name and date of a
// famous person as three command line arguments and uses Knex to perform an insert.

knex('famous_people').insert({
  first_name: process.argv[2],
  last_name: process.argv[3],
  birthdate: process.argv[4],
})
.asCallback((err, result) =>{
  if(err){
    return console.error("Connection Error", err);
  }
  console.log("Record Inserted Successfully!");
}).finally(() => {
  knex.destroy();
});