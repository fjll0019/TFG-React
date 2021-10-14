import logo200Image from 'assets/img/logo/icono.png';
import PropTypes from 'prop-types';
import React from 'react';
import httpClient from '../httpClient';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
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
import { NavLink } from 'react-router-dom';
const navItems = [
  { to: '/login', name: 'login / signup', exact: false, Icon: MdAccountCircle },
  { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
  { to: '/charts', name: 'charts', exact: false, Icon: MdInsertChart },
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

    var email = ""
    var nombre = ""

    const {
      showLogo,
      Emailabel,
      EmailInputProps,
      NombreLabel,
      NombreInputProps,
      children,
      onLogoClick,

    } = this.props;

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
    const sidebarBackground = {
      backgroundImage: `url("${sidebarBgImage}")`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    };
    const bem = bn.create('sidebar');
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground}>
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
        </div>
      </aside >
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
