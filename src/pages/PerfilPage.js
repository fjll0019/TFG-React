import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import Perfil from '../components/Perfil';

class PerfilPage extends React.Component {

    handleLogoClick = () => {
        window.location.href = "/home"
    };
    render() {
        return (
            <Row  style={{
                height: '95vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Col md={2} lg={12}>
                    <Card body>
                        <Perfil {...this.props}
                            onLogoClick={this.handleLogoClick}
                        />
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default PerfilPage;