import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import  UsersLists from '../components/UsersLists'

class UsersListPage extends React.Component {
    handleLogoClick = () => {
        window.location.href = "/home"
    };

    render() {
        return (
            <Row
                style={{
                    weight:'125h',
                    height: '75vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Col md={3} lg={6}>
                    <Card>
                            <UsersLists onLogoClick={this.handleLogoClick} />
                            
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default UsersListPage;