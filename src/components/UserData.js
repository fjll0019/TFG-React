import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row, Table } from 'reactstrap';
import httpClient from '../httpClient';
import Swal from "sweetalert2"

const tableTypes = ['striped'];

class UserData extends React.Component {
    state = {
        options: [
            { text: 'doNothing', value: 'doNothing' },
            { text: 'openModal', value: 'openModal' }
        ],
        open: true,
        lista: [],

    };

    handleSubmit = event => {
        event.preventDefault();
    };

    async getDataUser() {
        const datos = this.props.datos;
        var ficheros = []
        ficheros = datos

        return ficheros

    }
    componentDidMount() {
        this._asyncRequest = this.getDataUser().then(
            lista => {
                this._asyncRequest = null;
                this.setState({ lista });
            }
        );
    }

    async modalBorrar(fichero, email) {
        Swal.fire({
            title: "Vas a eliminar un fichero de datos ¿Estás seguro?",
            showDenyButton: true,
            denyButtonText: "Cancelar",
            denyButtonColor: "grey",
            confirmButtonText: "Eliminar",
            confirmButtonColor: "red",
        }).then((res) => {
            if (res.isConfirmed) {
                this.DeleteData(fichero, email);
                setTimeout(function () {
                    window.location.reload();
                }, 500);
            }
        });
    };
    async DeleteData(filename, email) {
        try {
            await httpClient.post("//localhost:5000/deleteDataUser", {
                filename,
                email
            })


        } catch (error) {

            alert("No ha sido posible eliminar el fichero")
        }
    }


    render() {
        if (this.state.lista) {
            let ficheros = []
            ficheros = this.state.lista;

            return (
                <Row
                    style={{
                        height: '45vh',
                        weight: '50vh',

                    }}>
                    <Col md={3} lg={12}>

                        {tableTypes.map((tableType, index) => (
                            <Row key={index}>
                                <Col>

                                    <Row>
                                        <Col>
                                            <div className="table-responsive">
                                                <Table {...{ [tableType || 'default']: true }}>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Nombre del fichero</th>
                                                            <th>Eliminar</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            ficheros && ficheros.map((fichero, i) =>
                                                                <tr key={i}>
                                                                    <th scope="row">{i}</th>
                                                                    <td>{fichero}</td>

                                                                    <td><button onClick={() => this.modalBorrar(fichero, this.props.email)} className="btn btn-primary active"><i className="fas fa-trash-alt"></i></button></td>

                                                                </tr>

                                                            )
                                                        }
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </Col>


                                    </Row>

                                </Col>
                            </Row>
                        ))}

                    </Col>
                </Row>
            );
        } else {
            return (
                <>
                    <div>
                        <h3> Cargando Lista de ficheros...</h3>
                    </div>
                </>
            )
        }
    }
}


UserData.propTypes = {

    email: PropTypes.string,
    name: PropTypes.string,
};

UserData.defaultProps = {
    email: "",
    name: "",
};

export default UserData;
