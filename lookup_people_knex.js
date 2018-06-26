const knex = require("./db/db.create-knex-client.js")
let cliArg = process.argv[2];

// node lookup_people.js Paul
// Searching ...
// Found 2 person(s) by the name 'Paul':
// - 1: Paul Rudd, born '1969-04-06'
// - 2: Paul Giamatti, born '1967-06-06'

//format y-m-d
let formatDate = (dateObj) => {
  let yr = dateObj.getFullYear();
  let mo = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  if(mo < 10) mo = '0' + mo;
  if(day < 10) day = '0' + day;
  return `${yr}-${mo}-${day}`;
};

let printResult = (result) => {
  console.log(`Found ${result.length} person(s) by the name '${cliArg}':`);
  Object.keys(result).forEach((key, i) => {
    curRow = result[key];
    // let d = new Date(elem.birthdate);
    let dateStr = formatDate(curRow.birthdate);
    console.log(`- ${i + 1}: ${curRow.first_name} ${curRow.last_name}, born '${dateStr}'`);
  })
};

knex.select("*")
.from("famous_people")
.where("first_name", "like", "%" + cliArg + "%")
.orWhere("last_name", "like", "%" + cliArg + "%")
.timeout(1000)
.asCallback((err, result) =>{
  if(err){
    return console.error("Connection Error", err);
  }
  console.log("Searching ...");
  printResult(result);
}).finally(() => {
  knex.destroy();
});



