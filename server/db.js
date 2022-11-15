const Pool = require("pg").Pool;
// pg library

const pool = new Pool({
    // inside : 
    user: "postgres",
    password: "Digifab74",
    host: "localhost",
    port: 5432,
    database: "perntodo"
})

// on exporte
module.exports = pool; // puis on retourne dans index.js pour lier à Pool
