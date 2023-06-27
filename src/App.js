import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import Authenticate from './Authenticate'
import Register from './Register'

function App() {

  return (
    <div className='App'>
            <Routes>
                <Route path='/auth' element={<Authenticate />}></Route>
                <Route path='/register' element={<Register />}></Route>
            </Routes>
    </div>
  )
}

export default App
