import Avatar from 'components/Avatar';
import logo200Image from 'assets/img/logo/icono.png';
import SourceLink from 'components/SourceLink';
import { UserCard } from 'components/Card';
import httpClient from '../../httpClient';
import SearchInput from 'components/SearchInput';
import $ from 'jquery'

import React from 'react';

import {
  MdClearAll,
  MdExitToApp,
  MdPersonPin,
  MdSettingsApplications,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  NavItem,
  NavLink,
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

  async checkLoginStatus() {
    try {
      const resp = await httpClient.get("//localhost:5000/@me")
      sessionStorage.setItem("UserName", resp.data["nombre"])
      sessionStorage.setItem("avatar", resp.data["avatar"])
      console.log(sessionStorage.getItem("UserName"))
      console.log(sessionStorage.getItem("avatar"))
      sessionStorage.setItem("Email", resp.data["email"])
      $('#UserName').text(resp.data["nombre"]);

    } catch (error) {
      if (error === 401) {
        console.log("Error: 401")
      }
    }
  }
  componentDidMount() {
    this.checkLoginStatus();

  }

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
      sessionStorage.removeItem("jwt")
      sessionStorage.removeItem("UserName")
      sessionStorage.removeItem("Email")
      sessionStorage.removeItem("avatar")

    } catch (error) {

    }

    window.location.replace('/')
  }

  Configuracion = () => {

    window.location.href = "/config"
  }

  Perfil = () => {
    window.location.replace('/perfil')
  }


  render() {

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


          {!sessionStorage.getItem("jwt") ? (
            <NavItem>
              <Button outline color="link" href="/login">
                Iniciar Sesion
              </Button>

            </NavItem>
          ) : (<NavItem id="Popover2">

            <Button outline color="link" className="navbar-brand d-flex">

              <span id="UserName" className="text-dark"> {sessionStorage.getItem("UserName")}  </span>
            </Button>
          </NavItem>
          )}

          {sessionStorage.getItem("jwt") === null && (
            <NavItem>

              <Button outline color="link" href="/signup">
                Registrarse
              </Button>

            </NavItem>
          )}
          {sessionStorage.getItem("jwt") != null && (

            <NavItem>


              <NavLink id="Popover2">
                <Avatar
                  onClick={this.toggleUserCardPopover}
                  className="can-click"
                  img={sessionStorage.getItem("avatar")}
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
                    id="userCard"
                    avatar={sessionStorage.getItem("avatar")}
                    title={sessionStorage.getItem("UserName")}
                    subtitle={sessionStorage.getItem("Email")}
                    text="Welcome"
                    className="border-light"
                  >
                    <ListGroup flush>
                      <ListGroupItem tag="button" action onClick={this.Perfil} className="border-light">
                        <MdPersonPin /> Perfil
                      </ListGroupItem>
                      <ListGroupItem tag="button" action onClick={this.Configuracion} className="border-light">
                        <MdSettingsApplications /> Configuración
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
