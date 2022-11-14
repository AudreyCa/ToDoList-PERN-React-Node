const Pool = require("pg").Pool;
// library

const pool = new Pool({
    user: "postgres",
    password: "Digifab74",
    host: "localhost",
    port: 5432,
    database: "perntodo"
})

// on exporte
module.exports = pool; // puis on retourne dans index.js pour lier à Pool
