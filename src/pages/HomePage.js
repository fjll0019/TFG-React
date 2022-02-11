import Page from 'components/Page';
import { NumberWidget } from 'components/Widget';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import httpClient from '../httpClient';

import Home from 'components/Home'
import {
    chartjs,
} from 'demos/dashboardPage';
import React, { } from 'react';
import { Line } from 'react-chartjs-2';

import {
    Card,
    CardBody,
    Col,
    Row,
    Table,
    CardHeader
} from 'reactstrap';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const tableTypes = ['striped'];

class HomePage extends React.Component {
    state = {
        lista: [],
    };

    async checkLoginStatus() {
        try {
            var data = []
            const resp = await httpClient.get("//localhost:5000/@me")

            sessionStorage.setItem("email", resp.data["email"])
            sessionStorage.setItem("data", resp.data["data"])
            data = resp.data["data"]
            return data
        } catch (error) {

        }
    }

    componentDidMount() {
        this._isMounted = true;
        this._asyncRequest = this.checkLoginStatus().then(
            lista => {
                this._asyncRequest = null;
                this.setState({ lista });
            }
        );
    }

    render() {
        if (this.state.lista.length !== 0) {
            let datos = []
            datos = this.state.lista;
            return (
                <Page
                    className="DashboardPage"
                    title="Home"
                    breadcrumbs={[{ name: 'Home', active: true }]}>

                    <Home datos={datos} />

                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Card className="w-75">

                                <CardBody className="tab-content">
                                    <Tabs>
                                        <TabList>
                                            <Tab>Inicio</Tab>
                                            <Tab>Prueba</Tab>
                                            <Tab>Prueba</Tab>
                                            <Tab>Prueba</Tab>
                                            <Tab>Prueba</Tab>
                                        </TabList>

                                        <TabPanel>
                                            <Line data={chartjs.line.data} options={chartjs.line.options} />
                                        </TabPanel>
                                        <TabPanel>
                                            <Line
                                                data={getStackLineChart({
                                                    labels: [
                                                        'January',
                                                        'February',
                                                        'March',
                                                        'April',
                                                        'May',
                                                        'June',
                                                        'July',
                                                    ],
                                                    data: [0, 13000, 5000, 24000, 16000, 25000, 10000].reverse(),
                                                })}
                                                options={stackLineChartOptions}
                                            />
                                        </TabPanel>
                                        <TabPanel>
                                            prueba 2
                                        </TabPanel>
                                        <TabPanel>
                                            prueba 3
                                        </TabPanel>
                                        <TabPanel>
                                            prueba 4
                                        </TabPanel>
                                    </Tabs>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Page >
            );
        } else {
            return (
                <Page
                    className="DashboardPage"
                    title="Home"
                    breadcrumbs={[{ name: 'Home', active: true }]}>
                    <div></div>
                </Page>
            )
        }
    }
}
export default HomePage;
