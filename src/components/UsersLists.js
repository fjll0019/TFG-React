import React from "react"
import ListOfUsers from '../components/ListOfUsers'
import { useUsers } from '../hooks/useUsers'

class UserLists extends React.Component {
  
  state={
    lista:null,
  }

  async getUsuarios() {

    const datos = []
    const name = ""
    const email = ""
    var usuarios = { datos, name, email }
    await useUsers().then(users => {
      usuarios = users
    })

    //console.log(usuarios)
    return usuarios
  }

  componentWillMount() {
  this._asyncRequest = this.getUsuarios().then(
    lista => {
        this._asyncRequest = null;
        this.setState({lista});
      }
    );
  }
  render() {


    console.log(this.state.lista)
    return (
      <>
        <div>
          <h3> Lista de usuarios</h3>
          { }
        </div>
      </>
    )
  }

}
export default UserLists;