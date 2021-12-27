import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row, Table } from 'reactstrap';
import httpClient from '../httpClient';

import {

    MdDelete,

} from 'react-icons/md';

import bn from 'utils/bemnames';


const navItems = [
    { to: '/deleteData', name: '', exact: false, Icon: MdDelete }
];
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
        const {
            datos,

        } = this.props;
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



    render() {
        console.log(this.state.lista)
        if (this.state.lista) {
            const bem = bn.create();
            let ficheros = []
            ficheros = this.state.lista;


            const DeleteData = async ({ filename }) => {
                try {
                    let email = sessionStorage.getItem("email")
                    await httpClient.post("//localhost:5000/deleteData", {
                        filename,
                        email
                    })
                    window.location.reload(true)

                } catch (error) {

                    alert("No ha sido posible eliminar el fichero")
                }
            };


            return (

                <Row
                    style={{
                        height: '15vh',
                        weight: '50vh',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Col md={3} lg={12}>

                        {tableTypes.map((tableType, index) => (
                            <Row key={index}>
                                <Col>

                                    <Row>
                                        <Col>

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

                                                                <td><a href='home' ><i className="fas fa-trash-alt"></i></a></td>

                                                            </tr>

                                                        )
                                                    }
                                                </tbody>
                                            </Table>

                                        </Col>


                                    </Row>

                                </Col>
                            </Row>
                        ))}

                    </Col>
                </Row>
            );
        } else {
            console.log(this.state.lista)
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
