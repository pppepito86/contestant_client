import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
        <strong>Copyright &copy; 2018 <a href="mailto:pppepito86@gmail.com">Petar Petrov</a>, <a href="mailto:shalamanov.marin@gmail.com">Marin Shalamanov</a>.</strong> 
        All rights reserved.
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
