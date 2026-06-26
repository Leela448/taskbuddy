import React, { useEffect, useState } from 'react'
import Taskform from './Components/Taskform'
import Tasklist from './Components/Tasklist'
import ProgressTracker from './Components/ProgressTracker'
import './index.css'

export default function App() {
  // 1. Load tasks from localStorage on first render
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks? JSON.parse(savedTasks) : [];
  });

  // 2. Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); // <- This [tasks] is important

  const addTask = (task) => {
  setTasks(prev => [...prev, task]);
}

  const updateTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed =!newTasks[index].completed;
    setTasks(newTasks);
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i!== index));
  }

  return (
    <div>
      <header>
        <h1>TaskMan</h1>
        <p><i>Your friendly Task Manager</i></p>
      </header>
      <Taskform addTask={addTask}/>
      <Tasklist tasks={tasks} updateTask={updateTask} deleteTask={deleteTask}/>
      <ProgressTracker tasks={tasks} />
    </div>
  )
}