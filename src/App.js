import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import { List, Container } from 'semantic-ui-react';
import './App.css';
import {AuthProvider} from './context/auth'
import AuthRoute from './utils/AuthRoute'
import MenuBar from './components/MenuBar'

import Email from './pages/Emails'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'

    
function App() {
  return (
    
  
      
    
    <AuthProvider>
     
    <Router>
    
    <Container>
    
    <MenuBar/>
    
    <hr/>
    <Switch>
      <Route exact path ='/' component={Home}/>
      <AuthRoute exact path ='/emails' component={Email}/>
      <AuthRoute exact path ='/login' component={Login}/>
      <AuthRoute exact path ='/register' component={Register}/>
      <Route exact path="/posts/:postId" component={SinglePost}/>
      </Switch>
      </Container>
    </Router>
    </AuthProvider>
     );
}

export default App;
//{background-image: url('https://images.unsplash.com/photo-1446080501695-8e929f879f2b?fit=crop&fm=jpg&h=725&ixjsv=2.0.0&ixlib=rb-0.3.5&q=80&w=1225');;}