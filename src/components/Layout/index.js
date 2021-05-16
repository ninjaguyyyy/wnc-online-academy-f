import React from 'react'
import NavbarLayout from './NavbarLayout'
import SearchMenu from './SearchMenu'
import './index.css'
function Layout(props) {
  return (
    <div>
      <div>
        <NavbarLayout />
        <div style={{ marginTop: '100px' , padding: '0 20px 0 20px'}}>
          <div className='body'>
            <SearchMenu />
            {props.children}
          </div>
        </div>
      </div> 
    </div>
  )
}
export default Layout
