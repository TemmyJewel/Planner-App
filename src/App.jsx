import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import './App.css';
import { taskCategoriesList } from './Data/TaskCategories.js';
import { noteCategoriesList } from './Data/NoteCategories.js';
import Sidebar from './components/Sidebar';
import HomePage  from './pages/HomePage'
import TasksPage from './pages/TasksPage'
import NotesPage from './pages/NotesPage'
import TaskCategoryPage from './pages/TaskCategoryPage';
import NoteCategoryPage from './pages/NoteCategoryPage';



function App() {
  const savedTaskCategories = localStorage.getItem("taskCategories");
  const savedNoteCategories = localStorage.getItem("noteCategories");
  const [taskCategories, setTaskCategories] = useState(
    savedTaskCategories ? JSON.parse(savedTaskCategories) : taskCategoriesList
  );

  const [noteCategories, setNoteCategories] = useState(
    savedNoteCategories ? JSON.parse(savedNoteCategories) : noteCategoriesList
  );

  useEffect(() => {
    localStorage.setItem("taskCategories", JSON.stringify(taskCategories));
  }, [taskCategories]);

  useEffect(() => {
    localStorage.setItem("noteCategories", JSON.stringify(noteCategories));
  }, [noteCategories]);
  
  return (
    <>
    <div className="app-layout"> 
      <Sidebar />
      <main className="main-content"> 
        <Routes>
          <Route index element={ <HomePage taskCategories={taskCategories} noteCategories = {noteCategories}/>} />
          <Route path="tasks" 
                  element={<TasksPage 
                            taskCategories = {taskCategories}
                            setTaskCategories = {setTaskCategories}/>
                          } />
          <Route path="notes" 
                  element={<NotesPage
                            noteCategories = {noteCategories}
                            setNoteCategories = {setNoteCategories}/>
                          } />
          <Route 
            path="tasks/category/:categoryId" 
            element={<TaskCategoryPage taskCategories={taskCategories} setTaskCategories={setTaskCategories} />} 
          />
          <Route 
            path="notes/category/:categoryId" 
            element={<NoteCategoryPage noteCategories={noteCategories} setNoteCategories={setNoteCategories} />} 
          />
          {/* <Route path="*" element={<PageNotFound/>} /> */}
        </Routes>
      </main>
    </div>
    </>
  )
}

export default App
