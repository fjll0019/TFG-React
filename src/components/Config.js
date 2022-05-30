import logo200Image from 'assets/img/logo/icono.png';
import PropTypes from 'prop-types';
import React from 'react';
import httpClient from '../httpClient';
import bn from 'utils/bemnames';
import Swal from "sweetalert2"
import { Card } from 'reactstrap';

import {
  Nav,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import {
  MdAccountCircle,
  MdPeople,
  MdInsertDriveFile
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import CardBody from 'reactstrap/lib/CardBody';
const navItems = [
  { to: '/perfil', name: 'Perfil', exact: false, Icon: MdAccountCircle },
  { to: '/password', name: 'Cambiar Contraseña', exact: true, Icon: MdPeople },
  { to: '/addData', name: 'Datos', exact: false, Icon: MdInsertDriveFile },

];
class Config extends React.Component {

  modalBorrar = () => {
    Swal.fire({
      title: "Vas a eliminar tu cuenta ¿Estás seguro?",
      showDenyButton: true,
      denyButtonText: "Cancelar",
      denyButtonColor: "grey",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
    }).then((res) => {
      if (res.isConfirmed) {
        this.DeleteUser();
      }
    });
  };
  handleSubmit = event => {
    event.preventDefault();
  };
  DeleteUser = async () => {
    try {

      await httpClient.post("//localhost:5000/delete")
      window.location.href = "/"
    } catch (error) {
      alert("No ha sido posible eliminar la cuenta")
    }
  }



  render() {

    const {
      onLogoClick,
    } = this.props;


    const bem = bn.create('sidebar');
    return (

      <Card >
        <CardBody>
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
             {
              this.props.rol=== "ADMIN" && (
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
            <button className="btn btn-primary active" onClick={this.modalBorrar}><i className="fas fa-trash-alt"></i> Eliminar cuenta</button>
          </Nav>
        </CardBody>
      </Card>
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
