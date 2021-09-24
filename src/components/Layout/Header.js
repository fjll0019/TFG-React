import Avatar from 'components/Avatar';
import logo200Image from 'assets/img/logo/icono.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import { UserCard } from 'components/Card';
import Notifications from 'components/Notifications';
import SearchInput from 'components/SearchInput';
import { notificationsData } from 'demos/header';
import withBadge from 'hocs/withBadge';
import React from 'react';
import {
  MdClearAll,
  MdExitToApp,
  MdNotificationsActive,
  MdPersonPin,
  MdSettingsApplications,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import bn from 'utils/bemnames';
import {
  MdAccountCircle,
  MdDashboard,
  MdInsertChart,
} from 'react-icons/md';
import {
  NavLink as BSNavLink,
} from 'reactstrap';

const navItems = [
  { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
  { to: '/charts', name: 'charts', exact: false, Icon: MdInsertChart },
  { to: '/login', name: 'login / signup', exact: false, Icon: MdAccountCircle }
];

const bem = bn.create('header');
const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: <small>5</small>,
})(MdNotificationsActive);

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  render() {
    const { isNotificationConfirmed } = this.state;

    return (
     
      <Navbar light expand className={bem.b('bg-white')}>
        <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-dark">
                EnerHome
              </span>
            </SourceLink>
            </Navbar>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
          <SearchInput />
          
        </Nav>

        <Nav navbar className={bem.e('nav-right')}>    

          <NavItem>
            <NavLink id="Popover2">
              <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <UserCard
                  title="Jane"
                  subtitle="jane@jane.com"
                  text="Last updated 3 mins ago"
                  className="border-light"
                >
                  <ListGroup flush>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdPersonPin /> Perfil
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdSettingsApplications /> Configuración
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdExitToApp /> Cerrar Sesión
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
