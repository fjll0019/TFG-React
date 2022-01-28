import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import AddData from '../components/AddData';

class AddDataPage extends React.Component {

    handleLogoClick = () => {
        window.location.href = "/home"
    };
    render() {
        return (
            <Row
                style={{
                    height: '90vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Col md={4} lg={6}>
                    <Card body>
                        <AddData
                            onLogoClick={this.handleLogoClick}
                        />
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default AddDataPage;