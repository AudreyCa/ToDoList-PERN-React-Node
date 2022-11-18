import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {

    const [description, setDescription] = useState(todo.description)

    // la méthode pour modifier UPDATE la tache
    const updateDescription = async (e) => {
        e.preventDefault();

        try {

            const body = { description }
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            console.log(response);
            // rafraichissement automatique pour pouvoir l'afficher
            window.location ="/"

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>

            <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
                Edit
            </button>

{/* Attention, ici on change  id="myModal" par plus personnalisé et unique, cad notre id et on change aussi le data-target du dessus avec le #!!!!*/}
            <div class="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Edit Todo</h4>
                            {/* pour mofier la valeur originelle de l'entréé dans la modale, on insert le onClick dans tous les btn close, il y en a deux sur cette modale et à la ligne 38 */}
                            <button type="button" class="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>&times;</button>
                        </div>

                        <div class="modal-body">
                        <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
                        </div>

                        <div class="modal-footer">
                            {/* on insert la fonction dans le bouton edit */}
                            <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={e => updateDescription(e)}>Edit</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditTodo;
