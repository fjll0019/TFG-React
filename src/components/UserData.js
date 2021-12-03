import PropTypes from 'prop-types';
import React from 'react';
import logo200Image from 'assets/img/logo/icono.png';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Button, Form, } from 'reactstrap';
import $ from 'jquery'
import httpClient from '../httpClient';
import { Content } from '../components/Layout';

import {

    MdDelete,

} from 'react-icons/md';

import bn from 'utils/bemnames';


const navItems = [
    { to: '/deleteData', name: '', exact: false, Icon: MdDelete }
];
const tableTypes = ['striped'];

class UserData extends React.Component {

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
            console.log(resp.data["data"]);
            sessionStorage.setItem("data", resp.data["data"])
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

        const bem = bn.create();

        var lista = sessionStorage.getItem("data")
        const {
            showLogo,
            children,
            onLogoClick,

        } = this.props;

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
                height: '65vh',
                weight:'50vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Col md={3} lg={12}>
                <Card body>              
                {tableTypes.map((tableType, index) => (
                    <Row key={index}>
                        <Col>
                            <Card className="mb-3">
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <Card body>
                                                <Table {...{ [tableType || 'default']: true }}>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Nombre del fichero</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">1</th>
                                                            <td>{lista}</td>
                                                            <td><a href='home' ><i class="fas fa-trash-alt"></i></a></td>
                                                        </tr>

                                                    </tbody>
                                                </Table>
                                            </Card>
                                        </Col>


                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                ))}
            <Content />
                       
                       </Card>
                   </Col>
               </Row>
        );
    }
}


UserData.propTypes = {
    showLogo: PropTypes.bool,
    Emailabel: PropTypes.string,
    EmailInputProps: PropTypes.object,
    NombreLabel: PropTypes.string,
    DefaultName: PropTypes.string,
    DefaultEmail: PropTypes.string,
    NombreInputProps: PropTypes.object,
    onLogoClick: PropTypes.func,
};

UserData.defaultProps = {
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

export default UserData;
