import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
         Go back <SourceLink>Home</SourceLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
