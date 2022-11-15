const express = require('express')
const app = express();
const port = 5000;
const cors = require("cors");
// lier au Pool dans le fichier db.js :
const pool = require("./db");

// middleware :
app.use(cors());
// to get data from the client side :
app.use(express.json()) // req.body


// ----------------ROUTES--------------------------
// create a todo :
// post car on ajoute de la data
// async pour lui laisser le temps de recup les données.
// sur postman : http://localhost:5000/todos avec la méthode post, en lui envoyant des données en JSON dans le body
app.post("/todos", async (req, res) => {
    // pour avoir requêtes de manières asynchrone
    try {

        console.log(req.body);

        // obtenir données qu'on veut ajouter/envoyer : ici, juste la description qu'on affichera dans le html
        const { description } = req.body;
        // pour la compréhension : on récupère l'attribut description de l'object req.body

        // on insert la description dans la table todo de la BDD perntodo
        // await!
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
            // $1 variable qui va spécifier description, lié à la librairie
            // RETURNING * (all the data) pour plus d'infos, dont l'id
            [description]
        );

        // reponse format json
        res.json(newTodo)
        console.log(newTodo);

    // try/catch pour les erreurs 
    } catch (err) {
        console.error(err.message)
    }
})

// get all todos :
// sur postman : http://localhost:5000/todos avec la méthode get
app.get('/todos', async(req,res) =>{
    try {
        
        // ici, on veut afficher TOUTE la liste de la table todo (rien de specifique)
        const allTodos = await pool.query("SELECT * FROM todo")
        // pas besoin de returning * car ça le fait déja avec le get dans ce cas

        // réponse format json
        res.json(allTodos.rows)
        console.log(allTodos.rows)

    } catch (err) {
        console.error(err.message)
    }
})

// get a todo :
// pareil que juste au dessus mais plus spécifique à un id
// sur postman : http://localhost:5000/todos/4 avec la méthode get
app.get('/todos/:id', async(req,res) =>{
    try {

        console.log(req.query);
        // spécifique à un id donc :
        const { id } = req.params
        // ici, on veut selctionné un ligne en particulier, lié à un id.
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",
        [id]
        )

        res.json(todo.rows[0])
        console.log(todo.rows[0]);

    } catch (err) {
        console.error(err.message)
    }
})

// update a todo :
// sur postman : http://localhost:5000/todos/4 avec la méthode PUT. 4 étant un exemple ici. on met l'id souhaité
// on verifie via la methode get avec le meme id pour voir si ca a bien été mis à jour
app.put('/todos/:id', async(req,res) => {
    try {
        // C'est spécifique, il nous faut l'id et la description pour retrancher les infos et les mettre à jour
        const { id } = req.params;
        const { description } = req.body;
        // ici, on update la table todo (on se positionne) puis on set pour changer la derscition qui se situe (where) à $(tel) id..
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]
        // respecter l'ordre $1(deccription),$2(id)
        )

        res.json("Todo was updated !")
        console.log("Todo was updated !");

    } catch (err) {
        console.error(err.message)
    }
})


// delete a todo :
// sur postman : http://localhost:5000/todos/4 avec la méthode DELETE. on met toujours l'id qu'on souhaite à la place de 4
app.delete('/todos/:id', async(req,res) => {
    try {

        // on n'a pas besoin de data pour delete, juste savoir l'id pour selectionner le bon
        const { id } = req.params;
    
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",
        [id]
        )

        res.json("Todo was deleted")
        console.log("Todo was deleted");

    } catch (err) {
        console.error(err.message)
    }
})



// Toujours à la fin
app.listen(port, () =>
    console.log(`App listening on port ${port}!`))