import PropTypes from 'prop-types';
import React from 'react';
import httpClient from '../httpClient';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Swal from "sweetalert2"
import validator from 'validator'
class AuthForm extends React.Component {


  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }



  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Iniciar Sesión';
    }

    if (!buttonText && this.isSignup) {
      return 'Registrar Nuevo Usuario';
    }

    return buttonText;
  }
  modalLogin = () => {
    Swal.fire({
      title: "Error",
      text: 'Email o contraseña incorrectos',
      showDenyButton: false,
      icon: 'error',
      confirmButtonText: "volver",
      confirmButtonColor: "grey",
    })
  };


  modalPassNotEqual = () => {
    Swal.fire({
      title: "Error",
      text: 'Las contraseñas no coinciden',
      showDenyButton: false,
      icon: 'error',
      confirmButtonText: "volver",
      confirmButtonColor: "grey",
    })
  };
  modalSignUp = () => {
    Swal.fire({
      title: "Error",
      text: 'Ha ocurrido un error al registrarse',
      showDenyButton: false,
      icon: 'error',
      confirmButtonText: "volver",
      confirmButtonColor: "grey",
    })
  };
  modalEmailVacio = () => {
    Swal.fire({
      title: "Error",
      text: 'Introduzca un email válido',
      showDenyButton: false,
      icon: 'error',
      confirmButtonText: "volver",
      confirmButtonColor: "grey",
    })
  };
  modalEmailRegistrado = () => {
    Swal.fire({
      title: "Error",
      text: 'El email introducido ya está en uso',
      showDenyButton: false,
      icon: 'error',
      confirmButtonText: "volver",
      confirmButtonColor: "grey",
    })
  };

  modalEmailNoValido = () => {
    Swal.fire({
      title: "Error",
      text: 'El email introducido no es válido',
      showDenyButton: false,
      icon: 'error',
      confirmButtonText: "volver",
      confirmButtonColor: "grey",
    })
  };

  render() {
    var email = ""
    var password = ""
    const {
      Emailabel,
      EmailInputProps,
      passwordLabel,
      passwordInputProps,
      children,
    } = this.props;



    const LogSignUser = async () => {

      if (this.renderButtonText() === 'Iniciar Sesión') {
        email = document.getElementById('email').value
        password = document.getElementById('password').value

        try {
          await httpClient.post("//localhost:5000/login", {
            email,
            password,
          })

          window.location.href = "/home"
        } catch (error) {
          if (error.response.status === 401) {
            this.modalLogin();
          }

        }
      } else {
        email = document.getElementById('email').value
        var fallo = false
        try {
          if (email === "") {
            this.modalEmailVacio();
            fallo = true
          }
          if (!validator.isEmail(email)) {
            this.modalEmailNoValido()
            fallo = true;

          }
          if (fallo === false) {
            await httpClient.post("//localhost:5000/register", {
              email,
              password
            })

            window.location.href = "/home"
          }

        } catch (error) {
          if (error.response.status === 401) {
            this.modalSignUp()
          }

          if (error.response.status === 409) {
            this.modalEmailRegistrado()

          }
        }
      }
    }

    return (
      <>
        {!this.isSignup && (
          <div><h3>Iniciar Sesión</h3></div>

        )} {this.isSignup &&(
          <div><h3>Registrar Nuevo Usuario</h3></div>

        )}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for={Emailabel}>{Emailabel}</Label>
            <Input id="email" {...EmailInputProps} />
          </FormGroup>

          {!this.isSignup && (
            <FormGroup>
              <Label for={passwordLabel}>{passwordLabel}</Label>
              <Input id="password" {...passwordInputProps} />
            </FormGroup>
          )}
          <hr />
          <Button
            size="lg"
            className="bg-gradient-theme-left border-0"
            block
            onClick={LogSignUser}>
            {this.renderButtonText()}
          </Button>
          {children}
        </Form></>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';


AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  Emailabel: PropTypes.string,
  EmailInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  Emailabel: 'Email',
  EmailInputProps: {
    type: 'email',
    placeholder: 'ejemplo@gmail.com',
  },
  passwordLabel: 'Contraseña',
  passwordInputProps: {
    type: 'password',
    placeholder: 'contraseña',
  },
  confirmPasswordLabel: 'Confirmar contraseña',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'Confirmar contraseña',
  },
  onLogoClick: () => { },
};

export default AuthForm;
