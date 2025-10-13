import React, { useState, useEffect } from 'react';
import ToDoEdit from './ToDoEdit';

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);
    const [newTodo, setNewTodo] = useState({ title: '', description: '', done: false });

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/todos/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://127.0.0.1:8000/todos/${id}`, { method: 'DELETE' });
            fetchTodos();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const handleEdit = (todo) => {
        setEditingTodo(todo);
    };

    const handleUpdate = () => {
        setEditingTodo(null);
        fetchTodos();
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        console.log("Creating new todo with data:", newTodo); // Log data being sent
        try {
            const response = await fetch('http://127.0.0.1:8000/todos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo),
            });

            console.log("Response status:", response.status); // Log response status
            const responseData = await response.json();
            console.log("Response data:", responseData); // Log response data

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            setNewTodo({ title: '', description: '', done: false });
            fetchTodos();
        } catch (error) {
            console.error("Error creating todo:", error); // Log any error
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTodo(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div>
            <h2>To-Do List</h2>
            {editingTodo ? (
                <ToDoEdit todo={editingTodo} onUpdate={handleUpdate} />
            ) : (
                <>
                    <form onSubmit={handleCreate}>
                        <input
                            type="text"
                            name="title"
                            value={newTodo.title}
                            onChange={handleInputChange}
                            placeholder="Title"
                            required
                        />
                        <textarea
                            name="description"
                            value={newTodo.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                            required
                        />
                        <button type="submit" className="btn-submit">Add To-Do</button>
                    </form>
                    <ul className="todo-list">
                        {todos.map(todo => (
                            <li key={todo.id} className="todo-item">
                                <div className="todo-item-details">
                                    <h3>{todo.title}</h3>
                                    <p>{todo.description}</p>
                                </div>
                                <div className="todo-item-actions">
                                    <button onClick={() => handleEdit(todo)} className="btn-edit">Edit</button>
                                    <button onClick={() => handleDelete(todo.id)} className="btn-delete">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default ToDoList;
