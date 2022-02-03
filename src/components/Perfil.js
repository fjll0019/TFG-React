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

   
    state = {

        // Initially, no file is selected
        selectedFile: null
    };

    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });

    };
    modalFallo = () => {
        Swal.fire({
          title: "Error",
          text: 'No se ha rellenado ningún cambio',
          showDenyButton: false,
          icon: 'info',
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
                if (error.response.status === 409){
                    this.modalFallo();

                }
                if (error.response.status === 409){
                    this.modalEmailRegistrado();
                }
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
