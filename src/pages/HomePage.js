import Page from 'components/Page';
import httpClient from '../httpClient';
import Home from 'components/Home'
import React, { } from 'react';
import 'react-tabs/style/react-tabs.css';

class HomePage extends React.Component {
    state = {
        lista: [],
    };

    async checkLoginStatus() {
        try {
            var data = []
            const resp = await httpClient.get("//localhost:5000/@me")

            sessionStorage.setItem("email", resp.data["email"])
            sessionStorage.setItem("data", resp.data["data"])
            data = resp.data["data"]
            return data
        } catch (error) {

        }
    }

    componentDidMount() {
        this._isMounted = true;
        this._asyncRequest = this.checkLoginStatus().then(
            lista => {
                this._asyncRequest = null;
                this.setState({ lista });
            }
        );
    }

    render() {
        if (this.state.lista.length !== 0) {
            let datos = []
            datos = this.state.lista;
            return (
                <Page
                    className="DashboardPage"
                    title="Home"
                    breadcrumbs={[{ name: 'Home', active: true }]}>
                    <Home datos={datos} />
                </Page >
            );
        } else {
            return (
                <Page
                    className="DashboardPage"
                    title="Home"
                    breadcrumbs={[{ name: 'Home', active: true }]}>
                    <div></div>
                </Page>
            )
        }
    }
}
export default HomePage;
