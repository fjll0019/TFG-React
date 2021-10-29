import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import Config from '../components/Config';
import { Content } from 'components/Layout';

class ConfigPage extends React.Component {
    handleLogoClick = () => {
        window.location.href = "/"
    };

    render() {
        return (
            <Row
                style={{
                    height: '125vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Col md={1} lg={3}>
                    <Card body>
                        <main className="cr-app bg-light">
                            <Config onLogoClick={this.handleLogoClick} />
                            <Content />
                        </main>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default ConfigPage;