import React from 'react';
import ToDoList from './components/ToDoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do App</h1>
      </header>
      <main>
        <ToDoList />
      </main>
    </div>
  );
}

export default App;
