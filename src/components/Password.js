import logo200Image from 'assets/img/logo/icono.png';
import PropTypes from 'prop-types';
import React from 'react';
import Avatar from './Avatar';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import $ from 'jquery'
import httpClient from '../httpClient';


class Perfil extends React.Component {

    handleSubmit = event => {
        event.preventDefault();
    };

    async checkLoginStatus() {
        try {
            $('#pass').attr("placeholder", "Nueva contraseña");
            $('#confPass').attr("placeholder", "Confirmar contraseña");
            $('#lastPass').attr("placeholder", "Contraseña Actual");

            //window.location.href = "/"
        } catch (error) {
        }
    }

    componentWillMount() {
        this.checkLoginStatus();
    }

    render() {

        var password = ""
        var confPassword = ""
        var lastPass = ""
        const {
            showLogo,
            LastPassLabel,
            LastPassInputProps,
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
            lastPass = document.getElementById('lastPass').value
            if (password === confPassword) {
                try {
                    const resp = await httpClient.post("//localhost:5000/password", {
                        password,
                        lastPass
                    })
                    console.log(resp.data)
                   // window.location.href = "/"
                } catch (error) {
                    console.log(error)
                    if (error === 401) {
                        console.log("Invalid Credentials")
                        alert("Invalid Credentials")
                    }
                    if (error === 400) {
                        console.log("Same Password")
                        alert("La contraseña a la que se quiere cambiar es la misma que la anterior")
                    }
                    if (error === 403) {
                        console.log("La contraseña actual no es correcta")
                        alert("La contraseña actual no es correcta")
                    }
                }
            } else {
                alert("Las contraseñas no coinciden")
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
                        img={sessionStorage.getItem("avatar")}
                        className="can-click"
                    />
                </div>
                <FormGroup>
                    <Label for={LastPassLabel}>{LastPassLabel}</Label>
                    <Input id="lastPass" {...LastPassInputProps} />
                </FormGroup>
                <FormGroup>
                    <Label for={PassLabel}>{PassLabel}</Label>
                    <Input id="pass" {...PassInputProps} />
                </FormGroup>
                <FormGroup>
                    <Label for={ConfPassLabel}>{ConfPassLabel}</Label>
                    <Input id="confPass" {...ConfPassInputProps} />
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
    LastPassLabel: PropTypes.string,
    LastPassInputProps: PropTypes.object,
    PassLabel: PropTypes.string,
    PassInputProps: PropTypes.object,
    ConfPassLabel: PropTypes.string,
    ConfPassInputProps: PropTypes.object,
    onLogoClick: PropTypes.func,
};

Perfil.defaultProps = {
    showLogo: true,
    LastPassLabel: 'Contraseña Actual',
    LastPassInputProps: {
        type: 'password',
    },
    PassLabel: 'Nueva contraseña',
    PassInputProps: {
        type: 'password',
    },
    ConfPassLabel: 'Confirmar contraseña',
    ConfPassInputProps: {
        type: 'password',
    },

};

export default Perfil;
