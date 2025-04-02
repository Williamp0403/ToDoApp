import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { AuthProvider } from './context/AuthContext'
import { TasksProvider } from './context/TasksContext'
import { PublicRoute } from "./PublicRoute.jsx"
import { ProtectedRoute } from './ProtectedRoute'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { TasksPage } from './pages/TasksPage'
import { HomePage } from './pages/HomePage'
import { CompletedTasksPage } from './pages/CompletedTasksPage'
import { NotificationProvider } from './components/Notification'

function App() {

  return (
    <NotificationProvider>      
      <TasksProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>

              <Route element={<PublicRoute/>}>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/register' element={<RegisterPage/>} />
                <Route path='/login' element={<LoginPage/>} />
              </Route>

              <Route element={<ProtectedRoute/>}>
                <Route path='/tasks' element={<TasksPage/>}/>
                <Route path='/completed-tasks' element={<CompletedTasksPage/>}/>
              </Route>

              <Route path='*' element={<h1>404 Not Found</h1>}/>

            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TasksProvider>
    </NotificationProvider>
  )
}

export default App
