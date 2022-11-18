import React, { Fragment, useEffect, useState } from "react";

// j'importe editTodo dont je vais avoir besoin pour mon bouton edit
// on l'insert dans notre boutton, plus bas
import EditTodo from "./EditTodo";


const ListTodos = () => {

    const [todos, setTodos] = useState([])

    //la méthode pour supprimer une todo DELETE
    const deleteTodo = async id => {
        try {
            // 2 params : spécifique et la méthode, pas besoin d'etre plus spécifique dans la méthode car POST
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
            method: "DELETE"
        })

        console.log(deleteTodo);
        // maintenant, pour que la ligne supprimé disparaisse à l'affichage, on fait un filter avec une condition
        setTodos(todos.filter(todo => todo.todo_id !== id))

        } catch (err) {
            console.error(err.message);
        }
    }

    //la méthode pour afficher toute la liste des todos GET (all)
    const getTodos = async () => {
            try {
    
                const response = await fetch("http://localhost:5000/todos")
                const jsonData = await response.json()

                setTodos(jsonData);

            } catch (err) {
                console.error(err.message);
            }
        }

    useEffect(() => {
        getTodos();
    }, [])

    console.log(todos);

    return (
        <Fragment>
            {/* la ligne qui suit sert à mettre une ligne vide, en guise d'espacement */}
            {" "}
            <table class="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* On va maper : */}
                     {todos.map(todo => (
                     <tr key={todo.todo_id}>
                         <td>{todo.description}</td>
                         <td><EditTodo todo={todo} /></td>
                         <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                     </tr>
                     ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos;