import logo200Image from 'assets/img/logo/icono.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import httpClient from '../httpClient';
import Swal from "sweetalert2"


class Perfil extends React.Component {

    handleSubmit = event => {
        event.preventDefault();
    };


    modalBadPassword = () => {
        Swal.fire({
            title: "Error",
            text: 'La contraseña actual no es correcta',
            showDenyButton: false,
            icon: 'error',
            confirmButtonText: "volver",
            confirmButtonColor: "grey",
        })
    };

    modalBadNewPassword = () => {
        Swal.fire({
            title: "Error",
            text: 'Las nuevas contraseñas no coinciden ',
            showDenyButton: false,
            icon: 'error',
            confirmButtonText: "volver",
            confirmButtonColor: "grey",
        })
    };

    modalSamePassword = () => {
        Swal.fire({
            title: "Error",
            text: 'La nueva contraseña no puede ser la misma que la contraseña actual ',
            showDenyButton: false,
            icon: 'error',
            confirmButtonText: "volver",
            confirmButtonColor: "grey",
        })
    };



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
                    await httpClient.post("//localhost:5000/password", {
                        password,
                        lastPass
                    })
                    window.location.href = "/home"
                } catch (error) {
                    if (error.response.status === 400) {
                        this.modalSamePassword();
                    }
                    if (error.response.status === 403) {
                        this.modalBadPassword();
                    }
                }
            } else {
                this.modalBadNewPassword();
            }
        }


        return (
            <Form onSubmit={this.handleSubmit}>
                <a href="/config"> <i className="fas fa-arrow-left"></i></a>
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
