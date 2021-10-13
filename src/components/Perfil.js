import logo200Image from 'assets/img/logo/icono.png';
import PropTypes from 'prop-types';
import React from 'react';
import Avatar from '../components/Avatar';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import userImage from 'assets/img/users/mikey.jpg';
import httpClient from '../httpClient';

class Perfil extends React.Component {

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
    async checkLoginStatus() {


        try {
            const resp = await httpClient.get("//localhost:5000/@me")
            console.log(resp.data)
            
            this.DefaultName=resp.data["nombre"]
            this.DefaultEmail= resp.data["email"]
            console.log("after json: Email: " +this.DefaultEmail + " nombre: "+ this.DefaultName)


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
        var jwt =""
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
            jwt = sessionStorage.getItem("jwt")
            //console.log("email: " + email + " , " + "password:" + password)

            try {
                const resp = await httpClient.post("//localhost:5000/perfil", {
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
                <div className="text-center pb-4">
                    <Avatar
                        size="100px"
                        src={userImage}
                        className="can-click"
                    />
                </div>
                <FormGroup>
                    <Label for={NombreLabel}>{NombreLabel}</Label>
                    <Input id="nombre" {...NombreInputProps} />
                </FormGroup>
                <FormGroup>
                    <Label for={Emailabel}>{Emailabel}</Label>
                    <Input id="email" {...EmailInputProps} />
                </FormGroup>

                <hr />
                <Button
                    size="lg"
                    className="bg-gradient-theme-left border-0"
                    block
                    onClick={Guardar}>
                    Guardar
                </Button>

                {children}
            </Form>
        );
    }
}


Perfil.propTypes = {
    showLogo: PropTypes.bool,
    Emailabel: PropTypes.string,
    EmailInputProps: PropTypes.object,
    NombreLabel: PropTypes.string,
    DefaultName: PropTypes.string,
    DefaultEmail: PropTypes.string,
    NombreInputProps: PropTypes.object,
    onLogoClick: PropTypes.func,
};

Perfil.defaultProps = {
    showLogo: true,
    Emailabel: 'Email',
    EmailInputProps: {
        type: 'email',
        placeholder: this.DefaultEmail,
    },
    NombreLabel: 'Nombre',
    NombreInputProps: {
        type: 'name',
        placeholder: this.DefaultName,
    },
    onLogoClick: () => { },
};

export default Perfil;
