import PropTypes from 'prop-types';
import React from 'react';
import logo200Image from 'assets/img/logo/icono.png';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Button, Form, } from 'reactstrap';
import $ from 'jquery'
import httpClient from '../httpClient';
import {

  MdDelete,

} from 'react-icons/md';

import bn from 'utils/bemnames';


const navItems = [
  { to: '/deleteData', name: '', exact: false, Icon: MdDelete }
];
const tableTypes = ['striped'];

class AddData extends React.Component {

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


    const onFileUpload = async () => {
      const formData = new FormData();
      try {
        if (this.state.selectedFile === null) {
          alert("Error, No se ha seleccionado ningun fichero de datos")
        } else {
          formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
          );
          const resp = await httpClient.post("//localhost:5000/uploadData", formData);
          console.log(resp.data["data"])
          sessionStorage.setItem("data", resp.data["data"])
          window.location.reload(true)

          //window.location.href = "/"
        }
      } catch (error) {

        if (error.response.status === 401) {
          alert("Error, Invalid Credentials")

        }
        if (error.response.status === 500) {
          alert("Error, Fallo al subir el archivo")

        }
        if (error.response.status === 409) {
          alert("Error, el archivo está repetido")

        }
      }


    };
    const DeleteData= async ({filename}) => {
      try {
          await httpClient.post("//localhost:5000/deleteData", {
          filename,
        })
        window.location.reload(true)

      } catch (error) {
          
          alert("No ha sido posible eliminar el fichero")
      }
  };


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
                Subir fichero
              </Button>
            </Card>
          </Col>


        </Row>
        {tableTypes.map((tableType, index) => (
          <Row key={index}>
            <Col>
              <Card className="mb-3">
                <CardHeader>Datos</CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <Card body>
                        <Table {...{ [tableType || 'default']: true }}>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Nombre</th>

                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>{lista}</td>
                              <td>
                                <Button
                                  size="sm"
                                  className="bg-gradient-theme-left border-0"
                                  block
                                  onClick={DeleteData}>
                                  Borrar
                                </Button>
                              </td>

                            </tr>

                            <tr>
                              <th scope="row">2</th>
                              <td>Jacob</td>
                              <td>Thornton</td>
                              <td>@fat</td>
                            </tr>
                            <tr>
                              <th scope="row">3</th>
                              <td>Larry</td>
                              <td>the Bird</td>
                              <td>@twitter</td>
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

        {children}
      </Form>
    );
  }
}


AddData.propTypes = {
  showLogo: PropTypes.bool,
  Emailabel: PropTypes.string,
  EmailInputProps: PropTypes.object,
  NombreLabel: PropTypes.string,
  DefaultName: PropTypes.string,
  DefaultEmail: PropTypes.string,
  NombreInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AddData.defaultProps = {
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

export default AddData;
