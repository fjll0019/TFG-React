import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import { Content } from 'components/Layout';
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
                    height: '125vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Col md={3} lg={6}>
                    <Card body>
                     
                            <UsersLists      onLogoClick={this.handleLogoClick} />
                            <Content />
                       
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default UsersListPage;