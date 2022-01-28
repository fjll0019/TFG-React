import logo200Image from 'assets/img/logo/icono.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';

import {
  MdAccountCircle,
  MdDashboard,
 // MdInsertChart,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};


const navItems = [
  { to: '/home', name: 'dashboard', exact: true, Icon: MdDashboard },
  //{ to: '/charts', name: 'charts', exact: false, Icon: MdInsertChart },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">
                EnerHome
              </span>
            </SourceLink>
          </Navbar>

          <Nav vertical>
            {
              sessionStorage.getItem("rol") === "ADMIN" && (
                <NavItem key="Register" className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-Register}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to='/signup'
                    activeClassName="active"
                    exact={false}
                  >
                    <MdAccountCircle className={bem.e('nav-item-icon')} />
                    <span className="">Nuevo Usuario</span>
                  </BSNavLink>
                </NavItem >
              )}
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
