import logo200Image from 'assets/img/logo/icono.png';
import PropTypes from 'prop-types';
import React from 'react';
import Avatar from '../components/Avatar';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import $ from 'jquery'
import { Card,Col, Row } from 'reactstrap';
import httpClient from '../httpClient';




class Perfil extends React.Component {

    handleSubmit = event => {
        event.preventDefault();
    };


    async checkLoginStatus() {
        try {
            const resp = await httpClient.get("//localhost:5000/@me")
            console.log(resp.data["nombre"])
            
            console.log(resp.data["avatar"]);
            sessionStorage.setItem("avatar", resp.data["avatar"])
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


        const onFileUpload = () => {

            const formData = new FormData();

            formData.append(
                "file",
                this.state.selectedFile,
                this.state.selectedFile.name
            );

            httpClient.post("//localhost:5000/uploadfile", formData);
            window.location.reload(true);
            window.location.href = "/"

        };

        const Guardar = async () => {
            nombre = document.getElementById('nombre').value
            email = document.getElementById('email').value
            //console.log("email: " + email + " , " + "password:" + password)

            try {
                await httpClient.post("//localhost:5000/perfil", {
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
                    {
                        sessionStorage.getItem("avatar") != null && (
                            <Avatar
                                size="100px"
                                img={sessionStorage.getItem("avatar")}
                                className="can-click"
                            />
                        )

                    }
                </div>
                <Row
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                    <Col>
                        <Card>
                            <input className="form-control form-control-sm" id="inputFile" type="file" onChange={this.onFileChange} />

                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Button
                                size="sm"
                                className="bg-gradient-theme-left border-0"
                                block
                                onClick={onFileUpload}>
                                Subir
                            </Button>
                        </Card>
                    </Col>


                </Row>
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
