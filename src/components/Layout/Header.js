import logo200Image from 'assets/img/logo/icono.png';
import SourceLink from 'components/SourceLink';
import { UserCard } from 'components/Card';
import httpClient from '../../httpClient';
import React from 'react';

import {
  MdClearAll,
  MdExitToApp,
  MdPersonPin,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  NavItem,
  Popover,
  PopoverBody,
} from 'reactstrap';
import bn from 'utils/bemnames';

const bem = bn.create('header');

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
  CerrarSesion = () => {
    try {
      httpClient.get("//localhost:5000/@logout")
      window.location.replace('/')

    } catch (error) {

    }

  }

  Configuracion = () => {

    window.location.href = "/config"
  }

  Perfil = () => {
    window.location.replace('/perfil')
  }

  render() {

    return (

      <Navbar light expand className={bem.b('bg-white fixed-top')} >
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
        <Nav  className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar className={bem.e('nav-right')}>
     
           {this.props.nombre !== null &&(
          <NavItem id="Popover2">

            <Button outline color="link" className="navbar-brand d-flex">
              <span id="UserName" className="text-dark"> {this.props.nombre}  </span>
            </Button>
            
          </NavItem>
              )}

          {this.props.id != null && (

            <NavItem>
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
                    id="userCard"
                    avatar={this.props.avatar}
                    title={this.props.nombre}
                    subtitle={this.props.email}
                    text="Welcome"
                    className="border-light"
                  >
                    <ListGroup flush>
                      <ListGroupItem tag="button" action onClick={this.Perfil} className="border-light">
                        <MdPersonPin /> Perfil
                      </ListGroupItem>
                      <ListGroupItem tag="button" action onClick={this.CerrarSesion} className="border-light">
                        <MdExitToApp /> Cerrar Sesión
                      </ListGroupItem>
                    </ListGroup>
                  </UserCard>
                </PopoverBody>
              </Popover>
            </NavItem>
          )}
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
