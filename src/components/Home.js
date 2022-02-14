import React, { useState } from "react";
import {
    Col,
    Row,
    Card,
    CardHeader,
    CardBody,
    Table
} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from 'reactstrap';
import Swal from "sweetalert2"
import { Line } from 'react-chartjs-2';
import httpClient from '../httpClient';

export default function Home({ datos }) {

    function modalFechaIncorrecta() {
        Swal.fire({
            title: "Error",
            text: 'La fecha final no puede ser anterior a la fecha de Inicio',
            showDenyButton: false,
            icon: 'info',
            confirmButtonText: "volver",
            confirmButtonColor: "grey",

        })
    };
    function getData() {
        var diff = finishDate.getTime() - startDate.getTime()
        if (diff > 0) {
            console.log("Hola")
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                params: {
                    startDate: startDate,
                    finishDate: finishDate,
                    addedDevices: addedDevices
                }
            }
            try {
                // var data = []
                httpClient.get("//localhost:5000/getData",config)

            } catch (error) {

            }
        } else {
            modalFechaIncorrecta();
        }
    }

    const chartjs = {
        line: {
            data: {
                labels: ['Enero', 'Febrero', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Revenue for this year',
                        borderColor: '#6a82fb',
                        backgroundColor: '#6a82fb',
                        data: [0, 1300, 2200, 3400, 4600, 3500, 3000],
                    },

                    {
                        label: 'Revenue for last year',
                        borderColor: '#fc5c7d',
                        backgroundColor: '#fc5c7d',
                        data: [0, 1300, 2200, 3400, 4600, 3500, 3000],
                    },
                ],
            },
            options: {
                responsive: true,
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                    text: 'Chart.js Line Chart - Stacked Area',
                },
                tooltips: {
                    intersect: false,
                    mode: 'nearest',
                },
                hover: {
                    mode: 'index',
                },
                scales: {
                    xAxes: [
                        {
                            scaleLabel: {
                                display: false,
                                labelString: 'Month',
                            },
                            gridLines: {
                                display: false,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            stacked: true,
                            scaleLabel: {
                                display: false,
                                labelString: 'Value',
                            },
                            gridLines: {
                                display: false,
                            },
                        },
                    ],
                },
            },
        },
    };
    var date = new Date();
    date.setDate(date.getDate() - 5);
    const [startDate, setStartDate] = useState(date);

    const [finishDate, setFinishtDate] = useState(new Date());

    const [addedDevices, setDevices] = useState([]);
    const [selectValue, setSelectValue] = useState("default");

    function handleChange(e) {
        setSelectValue({ selectValue: e.target.value });
    }

    function addDevice() {
        if (selectValue !== "default") {
            let newDevice = selectValue
            console.log(newDevice)
            if (addedDevices.includes(newDevice) === false) {
                setDevices([...addedDevices, newDevice]);
            } else {
                modalDispositivoYaExiste()
            }
        } else {
            modalEligeDispositivo()
        }
    }
    function deleteDevice(device) {
        var index = addedDevices.indexOf(device);
        addedDevices.splice(index, 1);
        setDevices(addedDevices.filter(item => item.name !== device))
    }

    function modalDispositivoYaExiste() {
        Swal.fire({
            title: "Error",
            text: 'El dispositivo ya está añadido.',
            showDenyButton: false,
            icon: 'error',
            confirmButtonText: "volver",
            confirmButtonColor: "grey",

        })
    };
    function modalEligeDispositivo() {
        Swal.fire({
            title: "Error",
            text: 'No ha elegido un dispositivo.',
            showDenyButton: false,
            icon: 'info',
            confirmButtonText: "volver",
            confirmButtonColor: "grey",

        })
    };

    return (

        <>
            {getData()}
            <Row>
                <Col>
                    <h5>Dispositivos disponibles</h5>
                    {datos.length !== 0 &&
                        <select onChange={handleChange}>
                            <option key={"x"} value="default">Elige un Dispositivo</option>
                            {
                                datos && datos.map((fichero, i) =>
                                    <option key={i} value={fichero}>{fichero}</option>)
                            }
                        </select>
                    }
                    <Button
                        size="sm"
                        className="ml-3 bg-gradient-theme-left border-0"
                        onClick={addDevice}
                    >
                        Añadir Dispositivo
                    </Button>
                </Col>
                <Col>
                    <h5>Fecha Inicio</h5>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" />
                </Col>
                <Col>
                    <h5>Fecha Fin</h5>

                    <DatePicker selected={finishDate} onChange={(date) => setFinishtDate(date)} dateFormat="dd/MM/yyyy" />
                </Col>
            </Row>
            {
                <Row >
                    <Col className="d-flex justify-content-center">
                        <Card className="w-75">
                            <CardHeader>Dispositivos añadidos</CardHeader>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <Card body>
                                            <div className="table-responsive">
                                                <Table {...{ ['striped' || 'default']: true }}>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Nombre</th>
                                                            <th>Eliminar</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            addedDevices && addedDevices.map((fichero, i) =>
                                                                <tr key={fichero["selectValue"]}>
                                                                    <th scope="row">{i}</th>
                                                                    <td>{fichero["selectValue"]}</td>
                                                                    <td>
                                                                        <button onClick={() => deleteDevice(fichero)} className="btn btn-primary active" ><i className="fas fa-trash-alt"></i></button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>}
            <Row>
                <Col className="d-flex justify-content-center">
                    <Card className="w-75">
                        <CardHeader>
                            Energia(Wh)
                        </CardHeader>
                        <CardBody className="tab-content">

                            <Line data={chartjs.line.data} options={chartjs.line.options} />

                        </CardBody>

                    </Card>

                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Card className="w-75">
                        <CardHeader>
                            Active power(W)
                        </CardHeader>
                        <CardBody className="tab-content">

                            <Line data={chartjs.line.data} options={chartjs.line.options} />

                        </CardBody>

                    </Card>

                </Col>
            </Row><Row>
                <Col className="d-flex justify-content-center">
                    <Card className="w-75">
                        <CardHeader>
                            Voltage(V)
                        </CardHeader>
                        <CardBody className="tab-content">

                            <Line data={chartjs.line.data} options={chartjs.line.options} />

                        </CardBody>

                    </Card>

                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Card className="w-75">
                        <CardHeader>
                            Power factor(pu)
                        </CardHeader>
                        <CardBody className="tab-content">

                            <Line data={chartjs.line.data} options={chartjs.line.options} />

                        </CardBody>

                    </Card>

                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Card className="w-75">
                        <CardHeader>
                            Apparent power(VA)
                        </CardHeader>
                        <CardBody className="tab-content">

                            <Line data={chartjs.line.data} options={chartjs.line.options} />

                        </CardBody>

                    </Card>

                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Card className="w-75">
                        <CardHeader>
                            Current(A)
                        </CardHeader>
                        <CardBody className="tab-content">

                            <Line data={chartjs.line.data} options={chartjs.line.options} />

                        </CardBody>

                    </Card>

                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Card className="w-75">
                        <CardHeader>
                            ReactivePower(VA)
                        </CardHeader>
                        <CardBody className="tab-content">

                            <Line data={chartjs.line.data} options={chartjs.line.options} />

                        </CardBody>

                    </Card>

                </Col>
            </Row>
        </>
    );
}