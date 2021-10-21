import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import Login from './auth/Login'
import { AllContext } from './hooks/AllContext'
import Nav from './layout/Nav'
import Admin from './pages/Admin'
import Home from './pages/Home'

const App = () => {
  const [auth,setAuth] = useState(false)
  const [poster,setPoster] = useState([])
  const [userid, setUserid] = useState(0)
  const getPoster = async() => {
    try {
        let res = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setPoster(res.data)
    } catch (error) {
        console.log(error);
    }
  }

  const getCookies = async() => {
    try {
      const getAuth = await Cookies.get('auth')
      if(getAuth !== null){
        setAuth(getAuth)
      }

      const getId = await Cookies.get('userid')
      if(getId !== null){
        setUserid(getId)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
      getPoster()
      getCookies()
  },[])

  return (
    <AllContext.Provider value={{
      auth: auth,
      setAuth: setAuth,
      poster: poster,
      userid: userid,
      setUserid: setUserid
    }}>
      <BrowserRouter>
        <Nav/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/admin" component={Admin}/>
        </Switch>
      </BrowserRouter>
    </AllContext.Provider>
  )
}

export default App
