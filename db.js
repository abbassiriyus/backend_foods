// const { Pool, Client } = require("pg")
const mysql = require('mysql');

    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'XhAkPq%1',
    database: 'trendokz_foods'
    });
// const pool = new Client({
//     user: "postgres",
//     host: "containers-us-west-143.railway.app",
//     database: "railway",
//     password: "GoLZRn8nFh9YgD8osXoS",
//     port: 5619
// })
// const pool = new Client({
//     user: "trendokz",
//     host: "185.15.37.197",
//     database: "trendokz_foods",
//     password: "Dilshodbek404",
// })
// const connectionString = 'postgres://default:iXIu4pgzZj3l@ep-muddy-hat-a4w2oo3c.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require';

// const pool = new Pool({
//   connectionString: connectionString
// });
connection.connect(err => {
    if(err) {
        console.log("Connect Error");
    } else {
        console.log("Connect To PostgreSql");
    }
})

module.exports = connection