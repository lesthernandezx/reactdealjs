import './App.css';
import Login from './pages/login'

import {AuthProvider} from './AuthContext'
import {useState, useEffect} from 'react'
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Profile from "./Profile";


function App() {
  
  const [timeActive, setTimeActive] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
     })
  }, [])

  return (
    <div className="App">
      <Router>
        <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          }/>
          <Route path="/login" element={
            !currentUser?.emailVerified 
            ? <Login/>
            : <Navigate to='/' replace/>
          } />
        </Routes>
       </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
