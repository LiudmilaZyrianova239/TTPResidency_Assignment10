const pg = require("pg");
// configure the path to the database that you wish to interact with
const postgresUrl= 'postgres://localhost/iniput'
// create a new client 
const client = new pg.Client({
    user: "postgres",
    host: 'localhost',
    database: 'input_app',
    password: '',  //  ENTER YOUR PASSWORD!!!
    port: 5432
})
// connect your client to your database
client.connect();

client.query('select * from input', (err, data) => {
    if (err) console.error(err);
    //console.log(data);
    
})
// export the client to use elsewhere in your express app for working with queries.
module.exports = client;

