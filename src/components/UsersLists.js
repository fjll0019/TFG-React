import React from "react"
import ListOfUsers from '../components/ListOfUsers'
import { useUsers } from '../hooks/useUsers'
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Button, Form, } from 'reactstrap';
import logo200Image from 'assets/img/logo/icono.png';

import {

  MdDelete,

} from 'react-icons/md';

import bn from 'utils/bemnames';


const navItems = [
  { to: '/deleteData', name: '', exact: false, Icon: MdDelete }
];
const tableTypes = ['striped'];

class UserLists extends React.Component {

  state = {
    lista: [],
  }
  existe=false;

  async getUsuarios() {

    const datos = []
    const name = ""
    const email = ""
    var usuarios = { datos, name, email }
    await useUsers().then(users => {
      usuarios = users
      this.existe=true
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
  }

  render() {
    const {
      showLogo,
      
      onLogoClick,

    } = this.props;

    if (this.state.lista) {
      let users = []
      users = this.state.lista.usuarios;
      console.log(users)
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
                      <CardHeader> <h3 class="text-center"> Lista de usuarios</h3></CardHeader>
                      <CardBody>
                        <Row>
                          <Col>
                            <Card body>
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
                                      <tr>
                                        <th scope="row">{i}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.datos}</td>
                                        <td><a href='home' ><i class="fas fa-trash-alt"></i></a></td>

                                      </tr>

                                    )
                                  }
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