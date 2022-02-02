import React from "react"
import { useUsers } from '../hooks/useUsers'
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, } from 'reactstrap';
import logo200Image from 'assets/img/logo/icono.png';
import httpClient from '../httpClient';
import Swal from "sweetalert2"

import UserData from "./UserData";


const tableTypes = ['striped'];

class UserLists extends React.Component {


  state = {
    modalList: [],
    booleanList: [],
    modal: false,
    options: [
      { text: 'doNothing', value: 'doNothing' },
      { text: 'openModal', value: 'openModal' }
    ],
    open: true,
    lista: [],
  }

  modalBorrar = (email) => {
    Swal.fire({
      title: "Vas a eliminar un usuario ¿Estás seguro?",
      showDenyButton: true,
      denyButtonText: "Cancelar",
      denyButtonColor: "grey",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
    }).then((res) => {
      if (res.isConfirmed) {
        this.deleteUser(email)
        window.location.reload();
      }
    });
  };

  toggle = modalType => () => {
    if (modalType != null) {
      // eslint-disable-next-line
      this.state.booleanList[modalType] = !this.state.booleanList[modalType]
      return this.setState({
   
      });
    }

    this.setState({
    
    });
  };

  deleteUser(email) {
    try {
      httpClient.post("//localhost:5000/deleteUser", {
        email
      })
    } catch (error) {
      alert("No ha sido posible eliminar la cuenta")
    }
  }

  cargaModalList(users) {
    // eslint-disable-next-line
    this.state.modalList = []
    if (users !== undefined) {
      var cont = 0
      // eslint-disable-next-line
      for (let user of users) {
        this.state.modalList.push(cont);
        cont++;
        if (users.length !== this.state.booleanList.length) {
          this.state.booleanList.push(false);
        }
      }
    }

  }

  async getUsuarios() {

    const datos = []
    const name = ""
    const email = ""
    var usuarios = { datos, name, email }
    await useUsers().then(users => {
      usuarios = users
      this.existe = true
    })

    return usuarios
  }


  componentDidMount() {
    this._asyncRequest = this.getUsuarios().then(
      lista => {
        this._asyncRequest = null;
        this.setState({ lista });
      }
    );
    /*  this.modalOnClick().then(modal =>{
        this.setState({modal})
      })
  */
  }

  render() {
    const {
      showLogo,

      onLogoClick,

    } = this.props;

    if (this.state.lista) {
      var users = [];
      users = this.state.lista.usuarios;
      this.cargaModalList(users);


      return (
        <>
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
          <div>
            <>
              {tableTypes.map((tableType, index) => (
                <Row key={index}>
                  <Col>
                    <Card className="mb-3">
                      <CardHeader> <h3 className="text-center"> Lista de usuarios</h3></CardHeader>
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
                                      <th>Email</th>
                                      <th>Datos</th>
                                      <th>Eliminar</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      users && users.map((user, i) =>
                                        <tr key={user.email}>
                                          <th scope="row">{i}</th>
                                          <td>{user.name}</td>
                                          <td>{user.email}</td>
                                          <td>
                                            <div>
                                              <button onClick={this.toggle(this.state.modalList[i])} className="btn btn-primary active"> <i className="fas fa-eye"></i> </button>
                                              <Modal
                                                isOpen={this.state.booleanList[i]}
                                                toggle={this.toggle(this.state.modalList[i])}
                                              >
                                                <ModalHeader toggle={this.toggle(this.state.modalList[i])}> Lista de Ficheros</ModalHeader>
                                                <ModalBody>
                                                  <UserData email={user.email} datos={user.datos} />
                                                </ModalBody>
                                              </Modal>

                                            </div>
                                          </td>

                                          <td>
                                            <button className="btn btn-primary active" onClick={() => this.modalBorrar(user.email)}> <i className="fas fa-trash-alt"></i> </button></td>
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
            </>

          </div>
        </>
      )
    } else {

      return (
        <>
          <div>
            <h3> Cargando Lista de usuarios...</h3>
          </div>
        </>
      )
    }


  }

}
UserLists.defaultProps = {
  showLogo: true,
};
export default UserLists;