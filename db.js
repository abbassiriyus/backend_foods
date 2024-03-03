const { Pool, Client } = require("pg")

// const pool = new Client({
//     user: "postgres",
//     host: "containers-us-west-143.railway.app",
//     database: "railway",
//     password: "GoLZRn8nFh9YgD8osXoS",
//     port: 5619
// })
const pool = new Client({
    user: "31.129.97.80",
    host: "localhost",
    database: "trendokz_foods",
    password: "!Q2w3e$R6688!!",
    port: 5619
})
// const connectionString = 'postgres://default:iXIu4pgzZj3l@ep-muddy-hat-a4w2oo3c.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require';

// const pool = new Pool({
//   connectionString: connectionString
// });
pool.connect(err => {
    if(err) {
        console.log("Connect Error");
    } else {
        console.log("Connect To PostgreSql");
    }
})

module.exports = pool