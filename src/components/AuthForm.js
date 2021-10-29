import logo200Image from 'assets/img/logo/icono.png';
import PropTypes from 'prop-types';
import React from 'react';
import httpClient from '../httpClient';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

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
      return 'Registrarte';
    }

    return buttonText;
  }

  render() {
    var email = ""
    var password = ""
    const {
      showLogo,
      Emailabel,
      EmailInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      onLogoClick,
    } = this.props;

    const LogSignUser = async () => {

      if (this.renderButtonText() === 'Iniciar Sesión') {
        email = document.getElementById('email').value
        password = document.getElementById('password').value
        //console.log("email: " + email + " , " + "password:" + password)

        try {
          const resp = await httpClient.post("//localhost:5000/login", {
            email,
            password,
          })

          sessionStorage.setItem("jwt", JSON.stringify(resp.data))
          sessionStorage.setItem("avatar", resp.data["avatar"])
          window.location.href = "/"
        } catch (error) {
          if (error === 401)
            console.log("Invalid Credentials")
          alert("Invalid Credentials")
        }
      } else {
        email = document.getElementById('email').value
        password = document.getElementById('password').value
        var conPassword = document.getElementById('conPassword').value
        try {
          if (password !== conPassword) {
            return alert("Las contraseñas no coinciden")
          }
          var isChecked = document.getElementById('checkbox').checked
          if (isChecked === false) {
            return alert("No ha aceptado los terminos de uso")

          }

          const resp = await httpClient.post("//localhost:5000/register", {
            email,
            password
          })
          sessionStorage.setItem("jwt", JSON.stringify(resp.data))
          console.log(sessionStorage.getItem("avatar"))

          sessionStorage.setItem("nombre", resp.data["avatar"])

          window.location.href = "/"
        } catch (error) {
          if (error === 401)
            alert("Invalid Credentials")

        }


      }


    }

    return (
      <Form onSubmit={this.handleSubmit}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}

        <FormGroup>
          <Label for={Emailabel}>{Emailabel}</Label>
          <Input id="email" {...EmailInputProps} />
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input id="password" {...passwordInputProps} />
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input id="conPassword" {...confirmPasswordInputProps} />
          </FormGroup>
        )}
        <FormGroup check>
          <Label check>
            <Input id="checkbox" type="checkbox" />{' '}
            {this.isSignup ? 'Acepto los terminos y políticas' : 'Recuerdame'}
          </Label>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={LogSignUser}>
          {this.renderButtonText()}
        </Button>

        <div className="text-center pt-1">
          <h6>o</h6>
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Iniciar Sesión
              </a>
            ) : (
              <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                Registarte
              </a>
            )}
          </h6>
        </div>

        {children}
      </Form>
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
