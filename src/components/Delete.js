import React from 'react';
import httpClient from '../httpClient';

class Delete extends React.Component {

    DeleteUser = async () => {
        try {

            await httpClient.post("//localhost:5000/delete")
            sessionStorage.removeItem("jwt")
            sessionStorage.removeItem("UserName")
            sessionStorage.removeItem("Email")
            sessionStorage.removeItem("avatar")

            window.location.href = "/"
        } catch (error) {
            console.log("No ha sido posible eliminar la cuenta")
            alert("No ha sido posible eliminar la cuenta")
        }
    }

    componentDidMount() {
        this.DeleteUser();

    }
    render() {
        return (
            <div> Se ha eliminado correctamente la cuenta</div>
        )
    }
}

export default Delete;