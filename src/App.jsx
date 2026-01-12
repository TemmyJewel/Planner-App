import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import './App.css';
import { taskCategoriesList } from './Data/TaskCategories.js';
import Sidebar from './components/Sidebar';
import HomePage  from './pages/HomePage'
import TasksPage from './pages/TasksPage'
import NotesPage from './pages/NotesPage'
import TaskCategoryPage from './pages/TaskCategoryPage';



function App() {
  const savedTaskCategories = localStorage.getItem("taskCategories");
  const [taskCategories, setTaskCategories] = useState(
    savedTaskCategories ? JSON.parse(savedTaskCategories) : taskCategoriesList
  );

  useEffect(() => {
    localStorage.setItem("taskCategories", JSON.stringify(taskCategories));
  }, [taskCategories]);
  
  return (
    <>
    <div className="app-layout"> 
      <Sidebar />
      <main className="main-content"> 
        <Routes>
          <Route index element={ <HomePage taskCategories={taskCategories}/>} />
          <Route path="tasks" 
                  element={<TasksPage 
                            taskCategories = {taskCategories}
                            setTaskCategories = {setTaskCategories}/>
                          } />
          <Route path="notes" element={<NotesPage/>} />
          <Route 
            path="tasks/category/:categoryId" 
            element={<TaskCategoryPage taskCategories={taskCategories} setTaskCategories={setTaskCategories} />} 
          />
          {/* <Route path="*" element={<PageNotFound/>} /> */}
        </Routes>
      </main>
    </div>
    </>
  )
}

export default App
