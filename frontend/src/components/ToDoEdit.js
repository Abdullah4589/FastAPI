import React, { useState, useEffect } from 'react';

const ToDoEdit = ({ todo, onUpdate }) => {
    const [formData, setFormData] = useState({ title: '', description: '' });

    useEffect(() => {
        if (todo) {
            setFormData({ title: todo.title, description: todo.description });
        }
    }, [todo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://127.0.0.1:8000/todos/${todo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            onUpdate();
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit To-Do</h2>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
            />
            <button type="submit" className="btn-update">Update</button>
        </form>
    );
};

export default ToDoEdit;
