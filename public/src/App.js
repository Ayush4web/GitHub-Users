import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Error } from './pages/Error'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='*' exact element={<Error></Error>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
