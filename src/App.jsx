import './App.css';
import Login from './pages/login'

import {AuthProvider} from './AuthContext'
import {useState, useEffect} from 'react'
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'


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
       <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
          <Login></Login>
       </AuthProvider>
     
    </div>
  );
}

export default App;
