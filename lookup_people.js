const client = require("./db.create-client.js")
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
}

let printResult = (result) => {
  console.log(`Found ${result.rows.length} person(s) by the name '${cliArg}':`);
  result.rows.forEach((elem, i) => {
    // let d = new Date(elem.birthdate);
    let dateStr = formatDate(elem.birthdate);
    console.log(`- ${i + 1}: ${elem.first_name} ${elem.last_name}, born '${dateStr}'`);
  })
};

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching ...");

  let queryStr = `
    SELECT *
    FROM famous_people
    WHERE first_name LIKE '%${cliArg}%'
    OR last_name LIKE '%${cliArg}%'
  `;

  client.query(queryStr, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    printResult(result);
    client.end();
  });
});
