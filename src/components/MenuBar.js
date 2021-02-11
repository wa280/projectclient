import React, { useContext, useState } from 'react'
import { Menu,Icon } from 'semantic-ui-react'
import{Link} from 'react-router-dom'
import {AuthContext} from '../context/auth'
import Dropdown from './Dropdown'
import Portals from './Portal'
import NewPortal from './NewPortal'
import RightPortal from './RightPortal'
import LoginPortal from './LogIn'
function MenuBar() {
const {user,logout} = useContext(AuthContext);
const pathname = window.location.pathname;
const path = pathname === '/' ? 'home' : pathname.substr(1);
const [activeItem,setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);
const menuBar =user ?(
<Menu pointing secondary size = "massive" color="teal" position='fixed'>
          <Menu.Item
            name={user.username}
            active
            as={Link}
            to="/"
          />
          <Dropdown/>
          
          
          <Portals/>
          <RightPortal/>
         
          
          
          <Menu.Menu position='right'>
          
          <Menu.Item
            name='Sign out'
            
            onClick={logout}
            as={Link}
            to="/login"
            
          />
          <Icon name='sign-out alternate' color = 'teal' />
          </Menu.Menu>
        </Menu>
):(
<Menu pointing secondary size = "massive" color="teal">
<Menu.Item
  name='home'
  active={activeItem === 'home'}
  onClick={handleItemClick}
  as={Link}
  to="/"
/>
<Icon name='home' color='teal' />
<Dropdown/>
<Menu.Menu position='right'>
<Menu.Item
  name='Sign in'
  active={activeItem === 'Sign in'}
  onClick={handleItemClick}
  as={Link}
  to="/login"
/>
<Icon name='sign-in alternate' color='teal' />
<Menu.Item
  name='Sign up'
  active={activeItem === 'Sign up'}
  onClick={handleItemClick}
  as={Link}
  to="/register"
/>
<Icon name='registered' color='teal' />
</Menu.Menu>
</Menu>)
return menuBar;
          
  }

export default MenuBar