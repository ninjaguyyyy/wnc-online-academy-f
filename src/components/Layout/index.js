import React from 'react';
import NavbarLayout from './NavbarLayout';
import './index.css';
import Footer from './Footer';

function Layout(props) {
  return (
    <div>
      <NavbarLayout />
      <div style={{ marginTop: '100px', padding: '0 20px 0 20px' }}>
        <div className="body">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
}
export default Layout;
