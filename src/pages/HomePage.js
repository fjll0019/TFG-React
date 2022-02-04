import Page from 'components/Page';
import { NumberWidget } from 'components/Widget';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';

import {
    chartjs,
} from 'demos/dashboardPage';
import React from 'react';
import { Line } from 'react-chartjs-2';

import {
    Card,
    CardBody,
    Col,
    Row,
} from 'reactstrap';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class HomePage extends React.Component {

    render() {

        return (
            <Page
                className="DashboardPage"
                title="Home"
                breadcrumbs={[{ name: 'Home', active: true }]}>
                <Row>
                    <Col lg={3} md={6} sm={6} xs={12}>
                        <NumberWidget
                            title="Total Profit"
                            subtitle="This month"
                            number="9.8k"
                            color="secondary"
                            progress={{
                                value: 75,
                                label: 'Last month',
                            }}
                        />
                    </Col>

                    <Col lg={3} md={6} sm={6} xs={12}>
                        <NumberWidget
                            title="Monthly Visitors"
                            subtitle="This month"
                            number="5,400"
                            color="secondary"
                            progress={{
                                value: 45,
                                label: 'Last month',
                            }}
                        />
                    </Col>

                    <Col lg={3} md={6} sm={6} xs={12}>
                        <NumberWidget
                            title="New Users"
                            subtitle="This month"
                            number="3,400"
                            color="secondary"
                            progress={{
                                value: 90,
                                label: 'Last month',
                            }}
                        />
                    </Col>

                    <Col lg={3} md={6} sm={6} xs={12}>
                        <NumberWidget
                            title="Bounce Rate"
                            subtitle="This month"
                            number="38%"
                            color="secondary"
                            progress={{
                                value: 60,
                                label: 'Last month',
                            }}
                        />
                    </Col>
                </Row>
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
            </Page>
        );
    }
}
export default HomePage;
