import logo200Image from 'assets/img/logo/icono.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import $ from 'jquery'
import httpClient from '../httpClient';




class Perfil extends React.Component {

    handleSubmit = event => {
        event.preventDefault();
    };


    async checkLoginStatus() {
        try {
            const resp = await httpClient.get("//localhost:5000/@me")
            console.log(resp.data["nombre"])

            console.log(resp.data["data"]);
            console.log(resp.data);

            $('#nombre').attr("placeholder", resp.data["nombre"]);
            $('#email').attr("placeholder", resp.data["email"]);

            //window.location.href = "/"
        } catch (error) {

        }
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    state = {

        // Initially, no file is selected
        selectedFile: null
    };

    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });

    };

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
            try {
                await httpClient.post("//localhost:5000/perfil", {
                    nombre,
                    email,
                })

                window.location.href = "/home"
            } catch (error) {
                if (error.response.status === 401)
                    alert("Invalid Credentials")
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

    },
    NombreLabel: 'Nombre',
    NombreInputProps: {

        type: 'name',

    },

};

export default Perfil;
