import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import Password from '../components/Password';

class PasswordPage extends React.Component {

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
                        <Password
                            onLogoClick={this.handleLogoClick}
                        />
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default PasswordPage;