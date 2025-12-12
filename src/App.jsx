import { Routes, Route } from 'react-router-dom'
import './App.css';
import Sidebar from './components/Sidebar';
import HomePage  from './pages/HomePage'
import TasksPage from './pages/TasksPage'
import NotesPage from './pages/NotesPage'



function App() {

  return (
    <>
    <div className="app-layout"> 
      <Sidebar />
      <main className="main-content"> 
        <Routes>
          <Route index element={ <HomePage />} />
          <Route path="tasks" element={<TasksPage/>} />
          <Route path="notes" element={<NotesPage/>} />
          {/* <Route path="*" element={<PageNotFound/>} /> */}
        </Routes>
      </main>
    </div>
    </>
  )
}

export default App
