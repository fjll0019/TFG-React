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
                <Col md={1} lg={3}>
                    <Card body>
                        <main className="cr-app bg-light">
                            <UsersLists />
                            <Content />
                        </main>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default UsersListPage;