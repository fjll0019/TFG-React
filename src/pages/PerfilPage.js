import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import Perfil from '../components/Perfil';

class PerfilPage extends React.Component {

    handleLogoClick = () => {
        window.location.href = "/home"
    };
    render() {
        return (
            <Row
                style={{
                    height: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Col md={6} lg={4}>
                    <Card body>
                        <Perfil
                            onLogoClick={this.handleLogoClick}
                        />
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default PerfilPage;