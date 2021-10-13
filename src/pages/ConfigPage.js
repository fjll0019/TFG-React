import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import Config from '../components/Config';

class ConfigPage extends React.Component {
    handleLogoClick = () => {
        window.location.href = "/"
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
                        <Config
                            onLogoClick={this.handleLogoClick}
                        />
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default ConfigPage;