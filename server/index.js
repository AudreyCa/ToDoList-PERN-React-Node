const express = require('express')
const app = express();
// const port = 5000;
const cors = require("cors");
// lier au Pool dans le fichier db.js :
const pool = require("./db");

// middleware :
app.use(cors());
// to get data from the client side :
app.use(express.json)


// ----------------ROUTES--------------------------
// create a todo :
// post car on ajoute de la data
// async pour lui laisser le temps de recup les données.
app.post('/todos', async(req, res) => {
    try {
        // on vérifie grâce à postman
        console.log(req.body);
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1)", 
        [description] // $1 est lié à "description" entre crochets
        );

        // // reponse en json
        res.json(newTodo);
    } catch (err) {
        console.log(err.message);
    }
})

// get all todos :


// get a todo :


// update a todo :


// delete a todo :





// Toujours à la fin
app.listen(5000, () =>
    console.log(`Example app listening on port 5000!`))