import Cookies from 'js-cookie'
import './style.css'
import React, { useEffect, useState } from 'react'
import { BrowserRouter,Route, Switch } from 'react-router-dom'
import Login from './auth/Login'
import { AllContext } from './hooks/AllContext'
import Nav from './layout/Nav'
import AdminPage from './pages/AdminPage'
import Home from './pages/Home'

const App = () => {
  const [auth,setAuth] = useState(false)
  const [userid, setUserid] = useState(0)
  const [load, setLoad] = useState(true)
  const [poster,setPoster] = useState([])
  

  useEffect(()=>{
    const getCookies = async() => {
      try {
        const getAuth = await Cookies.get('auth')
        if(getAuth !== null){
          setAuth(getAuth)
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCookies();
  },[])

  return (
    <AllContext.Provider value={{
      auth: auth,
      setAuth: setAuth,
      userid: userid,
      setUserid: setUserid,
      load: load,
      setLoad: setLoad,
      poster: poster,
      setPoster: setPoster
    }}>
      <BrowserRouter>
        <Nav/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/admin" component={AdminPage}/>
        </Switch>
      </BrowserRouter>
    </AllContext.Provider>
  )
}

export default App
