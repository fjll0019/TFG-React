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
  state = {
    selectedFile: null,
    options: [
        { text: 'doNothing', value: 'doNothing' },
        { text: 'openModal', value: 'openModal' }
    ],
    open: true,
    lista: [],

};

  async checkLoginStatus() {
    try {
      var data = []
      const resp = await httpClient.get("//localhost:5000/@me")
      console.log(resp.data["nombre"])
      console.log(resp.data["avatar"]);
      sessionStorage.setItem("avatar", resp.data["avatar"])
      $('#nombre').attr("placeholder", resp.data["nombre"]);
      $('#email').attr("placeholder", resp.data["email"]);
      console.log(resp.data["data"]);
      sessionStorage.setItem("data", resp.data["data"])
      data= resp.data["data"]
      return data
      //window.location.href = "/"
    } catch (error) {

    }
  }

  componentDidMount() {
    this._asyncRequest = this.checkLoginStatus().then(
      lista => {
        this._asyncRequest = null;
        this.setState({ lista });
      }
    );
  }

  // On file select (from the pop up)
  onFileChange = event => {

    // Update the state
    this.setState({ selectedFile: event.target.files[0] });

  };
  async DeleteData(filename){
    try {
      await httpClient.post("//localhost:5000/deleteData", {
        filename,
      })
      window.location.reload(true)

    } catch (error) {

      alert("No ha sido posible eliminar el fichero")
    }
  }

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

  

    if (this.state.lista) {
      let datos = []
      datos = this.state.lista;
      console.log(datos)
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
        <Row
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>

          <Col>
            <input className="form-control form-control-sm" id="inputFile" type="file" onChange={this.onFileChange} />
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
        {tableTypes.map((tableType, index) => (
          <Row key={index}>
            <Col>
              <Card className="mb-3">
                <CardHeader>Datos</CardHeader>
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
                            {
                              datos && datos.map((fichero, i) =>
                                <tr key={fichero}>
                                  <th scope="row">{i}</th>
                                  <td>{fichero}</td>
                                  <td>
                                  {console.log(fichero)}

                                  <a onClick={() => this.DeleteData(fichero)} className="btn btn-primary active" ><i className="fas fa-trash-alt"></i></a>

                                  </td>
                                </tr>

                              )
                            }

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

        {children}
      </Form>
    );
  }else{
    return(
    <div>No hay datos</div>
    )
  }

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
