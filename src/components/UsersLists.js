import React from "react"
import { useUsers } from '../hooks/useUsers'
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, } from 'reactstrap';
import logo200Image from 'assets/img/logo/icono.png';
import httpClient from '../httpClient';
import Swal from "sweetalert2"

import {

  MdDelete,

} from 'react-icons/md';

import UserData from "./UserData";


const navItems = [
  { to: '/deleteData', name: '', exact: false, Icon: MdDelete }
];
const tableTypes = ['striped'];

class UserLists extends React.Component {

  modalList =[]

  state = {
    modal: false,
    modal_backdrop: false,
    modal_nested_parent: false,
    modal_nested: false,
    backdrop: true,
    options: [
      { text: 'doNothing', value: 'doNothing' },
      { text: 'openModal', value: 'openModal' }
    ],
    open: true,
    lista: [],
  }
  modalDelete = () => {
    Swal.fire({
      title: "Eliminado",
      text: 'El usuario se ha eliminado correctamente',
      showDenyButton: false,
      icon: 'success',
      confirmButtonText: "volver",
      confirmButtonColor: "green",
    }).then(function(){
      window.location.reload();
    })
  };

  toggle = modalType => () => {
    if (!modalType) {
      return this.setState({
        modal: !this.state.modal,
      });
    }

    this.setState({
      [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
    });
  };

  deleteUser(email) {
    console.log(email)
    try {
      httpClient.post("//localhost:5000/deleteUser", {
        email
      })
      this.modalDelete();
    } catch (error) {
      console.log("No ha sido posible eliminar la cuenta")
      alert("No ha sido posible eliminar la cuenta")
    }


  }
  cargaModalList(users){
    if(users!== undefined){
      var cont=0
      for(let user of users){
       this.modalList.push(cont);
        cont++;
      }
     // console.log(this.modalList.length)
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

    //console.log(usuarios)
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
      var users= [];
      users = this.state.lista.usuarios;
      console.log(users)
      this.cargaModalList(users);
     // console.log(this.modalList[0])
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
                                            {user.datos
                                            }
                                            
                                              <button onClick={this.toggle(user.name)} className="btn btn-primary active"> <i className="fas fa-eye"></i> </button>
                                              <Modal
                                                isOpen={this.state.modal}
                                                toggle={this.toggle(user.name)}
                                                className={this.props.className}>
                                                <ModalHeader toggle={this.toggle(user.name)}> Lista de Ficheros</ModalHeader>
                                                <ModalBody>
                                                  <UserData datos={user.datos} />
                                                </ModalBody>
                                              </Modal>
                                              
                                            </div>
                                          </td>

                                          <td>
                                            <button className="btn btn-primary active" onClick={() => this.deleteUser(user.email)}> <i className="fas fa-trash-alt"></i> </button></td>
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
      console.log(this.state.lista)

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