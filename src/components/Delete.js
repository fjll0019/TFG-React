import React from 'react';
import httpClient from '../httpClient';
import Swal from "sweetalert2"

class Delete extends React.Component {
    mostrarMensaje = () => {
        alert("Hola");
      };
    
      modalBotones = () => {
        Swal.fire({
          title: "Mostar mensaje",
          showDenyButton: true,
          denyButtonText: "Salir",
          denyButtonColor: "grey",
          confirmButtonText: "Mostrar",
          confirmButtonColor: "#4c4",
        }).then((res) => {
          if (res.isConfirmed) {
            Swal.fire("Mostrar", this.mostrarMensaje(), "success");
          }
          if (res.isDenied) {
            Swal.fire("Saliendo", "");
          }
        });
      };



    componentDidMount() {
        //this.DeleteUser();

    }
    render() {
        return (
            <button onClick={this.modalBotones}>Modal basico</button>
        )
    }
}

export default Delete;