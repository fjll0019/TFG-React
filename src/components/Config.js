import logo200Image from 'assets/img/logo/icono.png';
import PropTypes from 'prop-types';
import React from 'react';
import httpClient from '../httpClient';
import $ from 'jquery'
import bn from 'utils/bemnames';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import {
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import {
  MdAccountCircle,
  MdPeople,
  MdDelete,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
const navItems = [
  { to: '/perfil', name: 'Información de la cuenta', exact: false, Icon: MdAccountCircle },
  { to: '/password', name: 'Cambiar Contraseña', exact: true, Icon: MdPeople },
  { to: '/delete', name: 'Eliminar Cuenta', exact: false, Icon: MdDelete },
];
class Config extends React.Component {



  handleSubmit = event => {
    event.preventDefault();
  };


  async checkLoginStatus() {


    try {
      const resp = await httpClient.get("//localhost:5000/@me")
      console.log(resp.data)
      console.log(resp.data["nombre"])

      $('#nombre').attr("placeholder", resp.data["nombre"]);
      $('#email').attr("placeholder", resp.data["email"]);


      //window.location.href = "/"
    } catch (error) {


    }
  }

  componentDidMount() {
    this.checkLoginStatus();

  }


  render() {
    var session_id = ""
    const {
      onLogoClick,
    } = this.props;
    var email = ""
    var nombre = ""

    const DeleteUser = async () => {
      try {
        session_id = sessionStorage.getItem("user_id")
        const resp = await httpClient.post("//localhost:5000/delete", {
          session_id
        })
        sessionStorage.removeItem("jwt")
        sessionStorage.removeItem("UserName")
        sessionStorage.removeItem("Email")
        sessionStorage.removeItem("Avatar")
        window.location.href = "/"
      } catch (error) {
        console.log("No ha sido posible eliminar la cuenta")
        alert("No ha sido posible eliminar la cuenta")
      }
    }

    const Guardar = async () => {
      nombre = document.getElementById('nombre').value
      email = document.getElementById('email').value
      //console.log("email: " + email + " , " + "password:" + password)

      try {
        const resp = await httpClient.post("//localhost:5000/config", {
          nombre,
          email,

        })
        console.log(resp.data)
        window.location.href = "/"
      } catch (error) {
        if (error === 401)
          alert("Invalid Credentials")
      }
    }

    const bem = bn.create('sidebar');
    return (

      <div className={bem.e('background')} >
        <div className="text-center pb-4">
          <img
            src={logo200Image}
            className="rounded"
            style={{ width: 60, height: 60, cursor: 'pointer' }}
            alt="logo"
            onClick={onLogoClick}
          />
        </div>
        <Nav className="text-center" vertical>
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
    );
  }
}


Config.propTypes = {
  showLogo: PropTypes.bool,
  Emailabel: PropTypes.string,
  EmailInputProps: PropTypes.object,
  NombreLabel: PropTypes.string,
  DefaultName: PropTypes.string,
  DefaultEmail: PropTypes.string,
  NombreInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

Config.defaultProps = {
  showLogo: true,
  Emailabel: 'Email',
  EmailInputProps: {

    type: 'email',

  },
  NombreLabel: 'Nombre',
  NombreInputProps: {

    type: 'name',

  },

};

export default Config;
