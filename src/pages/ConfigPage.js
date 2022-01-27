import React from 'react';
import {Col, Row } from 'reactstrap';
import Config from '../components/Config';

class ConfigPage extends React.Component {
    handleLogoClick = () => {
        window.location.href = "/home"
    };

    render() {
        return (
            <Row
                style={{
                    height: '45vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Col md={1} lg={3}>
                        <>
                        <main className="cr-app bg-light">
                            <Config onLogoClick={this.handleLogoClick} />
                            
                        </main>
                        </>
                    
                </Col>
            </Row>
        );
    }
}

export default ConfigPage;