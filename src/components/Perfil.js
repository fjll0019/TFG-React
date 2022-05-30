import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import httpClient from '../httpClient';
import Swal from "sweetalert2"
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';


const tableTypes = ['striped'];

class Perfil extends React.Component {

    state = {
        selectedFile: null,
        options: [
            { text: 'doNothing', value: 'doNothing' },
            { text: 'openModal', value: 'openModal' }
        ],
        open: true,
        lista: [],

    };

    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });

    };
    async DeleteData(filename) {
        try {
            let email = this.props.email

            await httpClient.post("//localhost:5000/deleteData", {
                filename,
                email
            })
            window.location.reload(true)

        } catch (error) {

            alert("No ha sido posible eliminar el fichero")
        }
    }
    modalBorrar = (fichero) => {
        Swal.fire({
            title: "Vas a eliminar un fichero de datos ¿Estás seguro?",
            showDenyButton: true,
            denyButtonText: "Cancelar",
            denyButtonColor: "grey",
            confirmButtonText: "Eliminar",
            confirmButtonColor: "red",
        }).then((res) => {
            if (res.isConfirmed) {
                this.DeleteData(fichero);
            }
        });
    };

    modalNoData = () => {
        Swal.fire({
            title: "Error",
            text: 'Necesita seleccionar un archivo.',
            showDenyButton: false,
            icon: 'info',
            confirmButtonText: "volver",
            confirmButtonColor: "grey",

        })
    };

    modalRepetido = () => {
        Swal.fire({
            title: "Error",
            text: 'El archivo seleccionado ya está añadido',
            showDenyButton: false,
            icon: 'error',
            confirmButtonText: "volver",
            confirmButtonColor: "grey",

        })
    };

    modalFallo = () => {
        Swal.fire({
            title: "Error",
            text: 'El formato del archivo no es válido',
            showDenyButton: false,
            icon: 'error',
            confirmButtonText: "volver",
            confirmButtonColor: "grey",

        })
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
            text: 'Las nuevas contraseñas no coinciden o no están rellenos los campos ',
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
    modalEliminarCuenta = () => {
        Swal.fire({
            title: "Vas a eliminar tu cuenta ¿Estás seguro?",
            showDenyButton: true,
            denyButtonText: "Cancelar",
            denyButtonColor: "grey",
            confirmButtonText: "Eliminar",
            confirmButtonColor: "red",
        }).then((res) => {
            if (res.isConfirmed) {
                this.DeleteUser();
            }
        });
    };

    DeleteUser = async () => {
        try {

            await httpClient.post("//localhost:5000/delete")

            window.location.href = "/"
        } catch (error) {
            alert("No ha sido posible eliminar la cuenta")
        }
    }

    render() {
        let datos = []
        datos = this.props.data;
        var email = ""
        var nombre = ""
        var password = ""
        var confPassword = ""
        const {
            Emailabel,
            EmailInputProps,
            NombreLabel,
            NombreInputProps,
            PassLabel,
            PassInputProps,
            ConfPassLabel,
            ConfPassInputProps,

        } = this.props;

        const onFileUpload = async () => {
            const formData = new FormData();
            try {
                if (this.state.selectedFile === null) {
                    this.modalNoData();
                } else {
                    formData.append(
                        "file",
                        this.state.selectedFile,
                        this.state.selectedFile.name
                    );
                    await httpClient.post("//localhost:5000/uploadData", formData);

                    window.location.reload(true)
                    //window.location.href = "/"
                }
            } catch (error) {

                if (error.response.status === 401) {
                    alert("Error, Invalid Credentials")

                }
                if (error.response.status === 500) {
                    this.modalFallo();

                }
                if (error.response.status === 409) {
                    this.modalRepetido();

                }
            }
        };

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
                if (error.response.status === 409) {
                    this.modalFallo();

                }
                if (error.response.status === 409) {
                    this.modalEmailRegistrado();
                }
                if (error.response.status === 401)
                    alert("Invalid Credentials")
            }
        }
        const ChangePassword = async () => {
            password = document.getElementById('pass').value
            confPassword = document.getElementById('confPass').value
            console.log(password)
            if (password === confPassword && password !== "") {
                try {
                    await httpClient.post("//localhost:5000/password", {
                        password
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
            <><Row
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Col lg={4}>
                    <Form>
                        <FormGroup>
                            <Label for={NombreLabel}>{NombreLabel}</Label>
                            <Input id="nombre" placeholder={this.props.nombre} {...NombreInputProps} />
                        </FormGroup>
                        <FormGroup>
                            <Label for={Emailabel}>{Emailabel}</Label>
                            <Input id="email" placeholder={this.props.email} {...EmailInputProps} />
                        </FormGroup>
                        <hr />
                        <Button
                            size="sm"
                            className="bg-gradient-theme-left border-0 col-6"
                            block
                            onClick={Guardar}>
                            Cambiar Nombre y/o email
                        </Button>
                    </Form>
                </Col>
                <Col lg={1}></Col>
                <Col lg={4}>
                    <FormGroup>
                        <Label for={PassLabel}>{PassLabel}</Label>
                        <Input id="pass" placeholder="Nueva Contraseña" {...PassInputProps} />
                    </FormGroup>
                    <FormGroup>
                        <Label for={ConfPassLabel}>{ConfPassLabel}</Label>
                        <Input id="confPass" placeholder="Confirmar Contraseña" {...ConfPassInputProps} />
                    </FormGroup>
                    <hr />
                    <Button
                        size="sm"
                        className="bg-gradient-theme-left border-0 col-6"
                        block
                        onClick={ChangePassword}>
                        Cambiar Contraseña
                    </Button>
                </Col>
            </Row>
                <Row
                    className="mx-auto my-3"
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Col>
                        {tableTypes.map((tableType, index) => (
                            <Row key={index}>
                                <Col lg={12}>
                                    <Card className="mb-3">
                                        <CardHeader>Datos
                                            <Row className="mx-auto my-2"
                                                style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>

                                                <Col>
                                                    <input className="" id="inputFile" type="file" onChange={this.onFileChange} />
                                                </Col>
                                                <Col>
                                                    <Button
                                                        size="sm"
                                                        className="bg-gradient-theme-left border-0"
                                                        block
                                                        onClick={onFileUpload}>
                                                        Subir fichero
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col>
                                                    <Card body>
                                                        <div className="table-responsive">
                                                            <Table {...{ [tableType || 'default']: true }}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Nombre</th>
                                                                        <th>Eliminar</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {datos && datos.map((fichero, i) => <tr key={fichero}>
                                                                        <th scope="row">{i}</th>
                                                                        <td>{fichero}</td>
                                                                        <td>
                                                                            <button onClick={() => this.modalBorrar(fichero)} className="btn btn-primary active"><i className="fas fa-trash-alt"></i></button>

                                                                        </td>
                                                                    </tr>

                                                                    )}

                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        ))}
                    </Col>
                </Row>
                <Row
                    className="mx-auto my-2"
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Col lg={12}>
                        <button className="btn btn-primary active" onClick={this.modalEliminarCuenta}><i className="fas fa-trash-alt"></i> Eliminar cuenta</button>
                    </Col></Row>
            </>

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
    PassLabel: PropTypes.string,
    PassInputProps: PropTypes.object,
    ConfPassLabel: PropTypes.string,
    ConfPassInputProps: PropTypes.object,
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
