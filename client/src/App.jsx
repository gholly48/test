import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
//import About from './pages/About'
import Header from './components/Header'

export default function App() {

  return (
     <BrowserRouter>
     <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Sign-up' element={<Signup />}></Route>
        <Route path='/Sign-in' element={<Signin />}></Route>
      </Routes>
     </BrowserRouter>
  )
}

 