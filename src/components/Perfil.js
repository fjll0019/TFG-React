import logo200Image from 'assets/img/logo/icono.png';
import PropTypes from 'prop-types';
import React from 'react';
import Avatar from '../components/Avatar';
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
            console.log(resp.data)
            console.log(resp.data["nombre"])
            if(resp.data["nombre"]!=null){
                sessionStorage.setItem("nombre", resp.data["nombre"])

            }
            $('#nombre').attr("placeholder",resp.data["nombre"]);
            $('#email').attr("placeholder",resp.data["email"]);
            console.log(sessionStorage.getItem("nombre"))
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
            //console.log("email: " + email + " , " + "password:" + password)

            try {
                const resp = await httpClient.post("//localhost:5000/perfil", {
                    nombre,
                    email,

                })
                
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
                        img={sessionStorage.getItem("nombre")}
                        className="can-click"
                    />
                </div>
                <FormGroup>
                    <Label for={NombreLabel}>{NombreLabel}</Label>
                    <Input id="nombre" {...NombreInputProps} />
                </FormGroup>
                <FormGroup>
                    <Label for={Emailabel}>{Emailabel}</Label>
                    <Input id="email" {...EmailInputProps}  />
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
