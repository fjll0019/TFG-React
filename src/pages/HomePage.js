import Page from 'components/Page';
import Home from 'components/Home'
import React, { } from 'react';
import 'react-tabs/style/react-tabs.css';

class HomePage extends React.Component {
    state = {
        lista: [],
        nombre:"",
    };

    media={
        energia:this.props.mediaEnergia,
        activePower:this.props.mediaActivePower,
        voltage:this.props.mediaVoltage,
        powerFactor:this.props.mediaPowerFactor,
        apparentPower:this.props.mediaApparentPower,
        current:this.props.mediaCurrent
    }

    render() {
            let indices = []
            let nombre =this.state.nombre;
            indices = this.props.indices;
            return (
                <Page
                    className="DashboardPage"
                    title="Home"
                    breadcrumbs={[{ name: 'Home', active: true }]}>
                    <Home labels={this.props.labels} rol={this.props.rol} media={this.media}  indices={indices} nombre={nombre}
                     />
                </Page >
            );
       
    }
}
export default HomePage;
