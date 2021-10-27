import logo200Image from 'assets/img/logo/icono.png';
import PropTypes from 'prop-types';
import React from 'react';
import Avatar from './Avatar';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import $ from 'jquery'
import httpClient from '../httpClient';
import userImage from 'assets/img/users/mikey.jpg';


class Perfil extends React.Component {

    handleSubmit = event => {
        event.preventDefault();
    };

    async checkLoginStatus() {


        try {
            const resp = await httpClient.get("//localhost:5000/@me")
            console.log(resp.data)
            console.log(resp.data["nombre"])

            $('#nombre').attr("placeholder",resp.data["nombre"]);
            $('#email').attr("placeholder",resp.data["email"]);
            

            //window.location.href = "/"
        } catch (error) {


        }
    }

    componentDidMount() {
        this.checkLoginStatus();

    }
   

    render() {
        
        var password = ""
        var confPassword = ""

        const {
            showLogo,
            PassLabel,
            PassInputProps,
            ConfPassLabel,
            ConfPassInputProps,
            children,
            onLogoClick,

        } = this.props;

        const ChangePassword = async () => {
            password = document.getElementById('pass').value
            confPassword = document.getElementById('confPass').value
            //console.log("email: " + email + " , " + "password:" + password)

            try {
                const resp = await httpClient.post("//localhost:5000/password", {
                    password})
                console.log(resp.data)
                window.location.href = "/"
            } catch (error) {
                if (error === 401)
                    alert("Invalid Credentials")
                    if (error === 400)
                    alert("La contraseña a la que se quiere cambiar es la misma que la anterior")
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
                    <Label for={PassLabel}>{PassLabel}</Label>
                    <Input id="pass" {...PassInputProps} />
                </FormGroup>
                <FormGroup>
                    <Label for={ConfPassLabel}>{ConfPassLabel}</Label>
                    <Input id="confPass" {...ConfPassInputProps}  />
                </FormGroup>

                <hr />
                <Button
                    size="lg"
                    className="bg-gradient-theme-left border-0"
                    block
                    onClick={ChangePassword}>
                    Cambiar Contraseña
                </Button>

                {children}
            </Form>
        );
    }
}


Perfil.propTypes = {
    showLogo: PropTypes.bool,
    PassLabel: PropTypes.string,
    PassInputProps: PropTypes.object,
    ConfPassLabel: PropTypes.string,
    ConfPassInputProps: PropTypes.object,
    onLogoClick: PropTypes.func,
};

Perfil.defaultProps = {
    showLogo: true,
    PassLabel: 'Introduzca la nueva contraseña',
    PassInputProps: {
        type: 'password',     
    },
    ConfPassLabel: 'Confirmar contraseña',
    ConfPassInputProps: {
        type: 'password',
    },
   
};

export default Perfil;
