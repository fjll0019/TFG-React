import logo200Image from 'assets/img/logo/icono.png';
import PropTypes from 'prop-types';
import React from 'react';
import httpClient from '../httpClient';
import $ from 'jquery'
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
  MdDelete,
  MdAdd
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import CardBody from 'reactstrap/lib/CardBody';
const navItems = [
  { to: '/perfil', name: 'Información de la cuenta', exact: false, Icon: MdAccountCircle },
  { to: '/password', name: 'Cambiar Contraseña', exact: true, Icon: MdPeople },
  { to: '/addData', name: 'Añadir datos', exact: false, Icon: MdAdd },

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
        sessionStorage.removeItem("jwt")
        sessionStorage.removeItem("UserName")
        sessionStorage.removeItem("Email")
        sessionStorage.removeItem("avatar")
        sessionStorage.removeItem("data")
        sessionStorage.removeItem("rol")


        window.location.href = "/"
    } catch (error) {
        console.log("No ha sido posible eliminar la cuenta")
        alert("No ha sido posible eliminar la cuenta")
    }
}

  async checkLoginStatus() {


    try {
      const resp = await httpClient.get("//localhost:5000/@me")
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
