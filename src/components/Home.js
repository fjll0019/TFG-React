import React, { useState, useEffect } from "react";
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
import $ from 'jquery'

export default function Home({ labels, rol, media, energia, indices, nombre }) {
    var date = new Date(2021, 6, 21);
    var dateFinish = new Date(2021, 7, 15)
 /*   var dateStr =
        ("00" + date.getDate()).slice(-2) + "/" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
        date.getFullYear() + ":" +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);
    console.log(dateStr);*/

    const [startDate, setStartDate] = useState(date);
    const deviceList = []
    const [finishDate, setFinishtDate] = useState(dateFinish);
    const [addedDevices, setDevices] = useState([]);
    const [selectValue, setSelectValue] = useState("default");

    var colors = ['#FF6633', '#6a82fb', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

    //Datasets para las gráficas
    const [datasetPowerFactor, setPowerFactor] = useState([])
    const [datasetApparentPower, setApparentPower] = useState([])
    const [datasetCurrent, setCurrent] = useState([])
    const [datasetVoltage, setVoltage] = useState([])
    const [datasetEnergia, setEnergia] = useState([])
    const [datasetActivePower, setActivePower] = useState([])
    //const [labels, setLabels] = useState([])
    //Máximos de cada gráfcia
    const [maxPowerFactor, setmaxPowerFactor] = useState(0)
    const [maxApparentPower, setmaxApparentPower] = useState(0)
    const [maxCurrent, setmaxCurrent] = useState(0)
    const [maxVoltage, setmaxVoltage] = useState(0)
    const [maxEnergia, setmaxEnergia] = useState(0)
    const [maxActivePower, setmaxActivePower] = useState(0)

    let arrayPowerFactor = []
    let arrayApparentPower = []
    let arrayCurrent = []
    let arrayVoltage = []
    let arrayEnergia = []
    let arrayActivePower = []

    useEffect(() => {
        if (rol === "ADMIN") {
            setPowerFactor(arrayPowerFactor)
            setApparentPower(arrayApparentPower)
            setCurrent(arrayCurrent)
            setVoltage(arrayVoltage)
            setEnergia(arrayEnergia)
            setActivePower(arrayActivePower)
        }
    }, []);

    useEffect(() => {
        console.log("getDataUseEffect")
        getData()
    }, [addedDevices], [startDate], [finishDate], [datasetActivePower], [datasetApparentPower], [datasetCurrent], [datasetEnergia], [datasetPowerFactor], [datasetVoltage], [maxPowerFactor], [maxActivePower], [maxApparentPower], [maxCurrent], [maxEnergia], [maxVoltage]);


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
    const getData = () => {
        var parsedStartDate = startDate.toISOString().split('T')[0]
        var parsedFinishDate = finishDate.toISOString().split('T')[0]
        console.log(parsedStartDate)
        console.log(parsedFinishDate)
        if (parsedStartDate !== parsedFinishDate) {
            addedDevices.map((fichero) =>
                deviceList.push(fichero["selectValue"])
            );

            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                params: {
                    startDate: parsedStartDate,
                    finishDate: parsedFinishDate,
                    deviceList: deviceList
                }
            }
            try {
                //   console.log("llama api")
                httpClient.get("//localhost:5000/getData", config).then((response) => {
                    const resp = response.data
                    console.log(response.data)
                    //    setLabels(resp.labels)
                    cargarDatos(resp.data)
                });

            } catch (error) {

            }
        } else {
            modalFechaIncorrecta();
        }
    }

    if (rol === "ADMIN") {
        console.log(media.energia)
        arrayPowerFactor.push({
            label: 'Media',
            borderColor: '#FFFF00',
            backgroundColor: 'rgba(255, 10, 13, 0.1)',
            data: media.powerFactor,
            fill: false
        })
        arrayApparentPower.push({
            label: 'Media',
            borderColor: '#FFFF00',
            backgroundColor: 'rgba(255, 10, 13, 0.1)',
            data: media.apparentPower,
            fill: false
        })
        arrayCurrent.push({
            label: 'Media',
            borderColor: '#FFFF00',
            backgroundColor: 'rgba(255, 10, 13, 0.1)',
            data: media.current,
            fill: false
        })
        arrayVoltage.push({
            label: 'Media',
            borderColor: '#FFFF00',
            backgroundColor: 'rgba(255, 10, 13, 0.1)',
            data: media.voltage,
            fill: false
        })
        arrayEnergia.push({
            label: 'Media',
            borderColor: '#FFFF00',
            backgroundColor: 'rgba(255, 10, 13, 0.1)',
            data: media.energia,
            fill: false
        })
        arrayActivePower.push({
            label: 'Media',
            borderColor: '#FFFF00',
            backgroundColor: 'rgba(255, 10, 13, 0.1)',
            data: media.activePower,
            fill: false
        })
    }

    function cargarDatos(datos) {
    var cont=0

        for (let i = 0; i < datos.length; i++) {
            if(cont<datos.length){
           
            arrayPowerFactor.push({
                label: datos[i].name,
                borderColor: colors[i],
                backgroundColor: colors[i],
                data: datos[i].powerFactor,
                fill: false
            })

            arrayApparentPower.push({
                label: datos[i].name,
                borderColor: colors[i],
                backgroundColor: colors[i],
                data: datos[i].apPower,
                fill: false
            })

            arrayCurrent.push({
                label: datos[i].name,
                borderColor: colors[i],
                backgroundColor: colors[i],
                data: datos[i].current,
                fill: false
            })

            arrayVoltage.push({
                label: datos[i].name,
                borderColor: colors[i],
                backgroundColor: colors[i],
                data: datos[i].voltage,
                fill: false
            })


            arrayEnergia.push({
                label: datos[i].name,
                borderColor: colors[i],
                backgroundColor: colors[i],
                data: datos[i].energia,
                fill: false
            })

            arrayActivePower.push({
                label: datos[i].name,
                borderColor: colors[i],
                backgroundColor: colors[i],
                data: datos[i].acPower,
                fill: false
            })
            cont+=1;
        }
        }
        
        if(datos.length<labels.length){
            console.log("menor")
        }


        getMaximos()


        setVoltage(arrayVoltage)
        setCurrent(arrayCurrent)
        setApparentPower(arrayApparentPower)
        setPowerFactor(arrayPowerFactor);
        setEnergia(arrayEnergia)
        setActivePower(arrayActivePower)
    }

    const chartPowerFactor = {
        line: {
            data: {
                labels: labels,
                datasets: datasetPowerFactor,
            },
            options: {
                responsive: true,
                legend: {
                    display: true,
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
            },
        },
    };
    const chartApparentPower = {
        line: {
            data: {
                labels: labels,
                datasets: datasetApparentPower,
            },
            options: {
                legend: {
                    display: true,
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
            },
        },
    };
    const chartCurrent = {
        line: {
            data: {
                labels: labels,
                datasets: datasetCurrent,
            },
            options: {
                responsive: true,
                legend: {
                    display: true,
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
            },
        },
    };

    const chartVoltage = {
        line: {
            data: {
                labels: labels,
                datasets: datasetVoltage,
            },
            options: {
                responsive: true,
                legend: {
                    display: true,
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
            },
        },
    };

    const chartEnergia = {
        line: {
            data: {
                labels: labels,
                datasets: datasetEnergia,
            },
            options: {
                responsive: true,
                legend: {
                    display: true,
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
            },
        },
    };

    const chartActivePower = {
        line: {
            data: {
                labels: labels,
                datasets: datasetActivePower,
            },
            options: {
                responsive: true,
                legend: {
                    display: true,
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
            },
        },
    };

    const chartjs = {
        line: {
            data: {
                labels: ['Enero', 'Febrero', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'october'],
                datasets: [
                    {
                        label: 'Ev',
                        borderColor: '#6a82fb',
                        backgroundColor: '#6a82fb',
                        data: energia,
                        fill: false
                    },

                    {
                        label: 'Casa',
                        borderColor: '#fc5c7d',
                        backgroundColor: '#fc5c7d',
                        data: [0, 600, 1200, 860, 800, 2400, 1900],
                        fill: false

                    },
                    {
                        label: 'Media',
                        borderColor: '#FFFF00',
                        backgroundColor: '#FFFF00',
                        data: [0, 750, 1150, 820, 1225, 1800, 1850],
                        fill: false

                    },


                ],
            },
            options: {
                responsive: true,
                legend: {
                    display: true,
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
            },
        },
    };

    //Calcula los máximos de las gráficas
    function getMaximos() {
        var auxMaxActivePower = 0
        var auxMaxApparentPower = 0
        var auxMaxPowerFactor = 0
        var auxMaxCurrent = 0
        var auxMaxEnergia = 0
        var auxMaxVoltage = 0
        for (let i = 0; i < arrayApparentPower.length; i++) {
            if (arrayApparentPower[i].label !== "Media") {
                for (let j = 0; j < arrayPowerFactor[i].data.length; j++) {
                    if (arrayApparentPower[i].data[j] > auxMaxApparentPower) {
                        auxMaxApparentPower = arrayApparentPower[i].data[j]
                    }
                }
            }

        }
        for (let i = 0; i < arrayPowerFactor.length; i++) {
            if (arrayPowerFactor[i].label !== "Media") {
                for (let j = 0; j < arrayPowerFactor[i].data.length; j++) {
                    if (arrayPowerFactor[i].data[j] > auxMaxPowerFactor) {
                        auxMaxPowerFactor = arrayPowerFactor[i].data[j]
                    }
                }
            }
        }
        for (let i = 0; i < arrayCurrent.length; i++) {
            if (arrayCurrent[i].label !== "Media") {
                for (let j = 0; j < arrayCurrent[i].data.length; j++) {
                    if (arrayCurrent[i].data[j] > auxMaxCurrent) {
                        auxMaxCurrent = arrayCurrent[i].data[j]
                    }
                }
            }
        }
        for (let i = 0; i < arrayEnergia.length; i++) {
            if (arrayEnergia[i].label !== "Media") {
                for (let j = 0; j < arrayEnergia[i].data.length; j++) {
                    if (arrayEnergia[i].data[j] > auxMaxEnergia) {
                        auxMaxEnergia = arrayEnergia[i].data[j]
                    }
                }
            }
        }
        for (let i = 0; i < arrayVoltage.length; i++) {
            if (arrayVoltage[i].label !== "Media") {
                for (let j = 0; j < arrayVoltage[i].data.length; j++) {
                    if (arrayVoltage[i].data[j] > auxMaxVoltage) {
                        auxMaxVoltage = arrayVoltage[i].data[j]
                    }
                }
            }
        }

        for (let i = 0; i < arrayActivePower.length; i++) {
            if (arrayActivePower[i].label !== "Media") {
                for (let j = 0; j < arrayActivePower[i].data.length; j++) {
                    if (arrayActivePower[i].data[j] > auxMaxActivePower) {
                        auxMaxActivePower = arrayActivePower[i].data[j]
                    }
                }
            }
        }
        setmaxApparentPower(auxMaxApparentPower)
        setmaxActivePower(auxMaxActivePower)
        setmaxCurrent(auxMaxCurrent)
        setmaxEnergia(auxMaxEnergia)
        setmaxPowerFactor(auxMaxPowerFactor)
        setmaxVoltage(auxMaxVoltage)
    }

    // const colors = ["bg-primary","bg-secondary","bg-success","bg-danger","bg-info","bg-dark"];
    function handleChange(e) {
        setSelectValue({ selectValue: e.target.value });
        $("#selectDevice option[value=default]").attr('disabled', 'disabled')
        $('.id_100 option[value=val2]').attr('selected', 'selected');
    }
    function handleStartDate(date) {
        setStartDate(date)

    }
    function handlefinishDate(date) {
        setFinishtDate(date)

    }

    function addDevice() {
        if (selectValue !== "default") {
            let newDevice = selectValue
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
            <Row>
                <Col xs="1"></Col>
                <Col xs="3">
                    <h5>Dispositivos disponibles</h5>
                    {indices.length !== 0 &&
                        <select onChange={handleChange} id="selectDevice">
                            <option key={"default"} id="default" value="default" >Elige un Dispositivo</option>
                            {
                                indices && indices.map((fichero, i) =>
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

                {

                    <Col xs="4" >
                        <Card >
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
                }
                <Col>
                    <h5>Fecha Inicio</h5>
                    <DatePicker selected={startDate} onChange={(date) => handleStartDate(date)} dateFormat="dd/MM/yyyy" />
                </Col>
                <Col>
                    <h5>Fecha Fin</h5>

                    <DatePicker selected={finishDate} onChange={(date) => handlefinishDate(date)} dateFormat="dd/MM/yyyy" />
                </Col>
                <Col xs="2"></Col>
            </Row>

            <Row >
                <Col xs="2"></Col>
                <Col xs="6" >

                    <Card >
                        <CardHeader>
                            Energia(Wh)
                        </CardHeader>
                        <CardBody >

                            <Line data={chartEnergia.line.data} options={chartEnergia.line.options} />
                        </CardBody>

                    </Card>

                </Col>

                <Col xs="2">

                    <Card >
                        <CardHeader>
                            Máximo Energia(Wh)
                        </CardHeader>
                        <CardBody>
                            <div className="d-flex justify-content-center">
                                <h4 > {nombre}</h4>
                            </div>
                            <span className="d-flex justify-content-center">{maxEnergia} Wh</span>

                        </CardBody>

                    </Card>

                </Col>
            </Row>
            <Row>
                <Col xs="2"></Col>
                <Col xs="6" >
                    <Card >
                        <CardHeader>
                            Active power(W)
                        </CardHeader>
                        <CardBody>

                            <Line data={chartActivePower.line.data} options={chartActivePower.line.options} />

                        </CardBody>

                    </Card>

                </Col>
                <Col xs="2">

                    <Card >
                        <CardHeader>
                            Active Power(W)
                        </CardHeader>
                        <CardBody className="tab-content">
                            <div className="d-flex justify-content-center">
                                <h4 > {nombre}</h4>
                            </div>
                            <span className="d-flex justify-content-center">{maxActivePower} W</span>

                        </CardBody>

                    </Card>

                </Col>
            </Row>
            <Row>
                <Col xs="2"></Col>
                <Col xs="6">
                    <Card >
                        <CardHeader>
                            Voltage(V)
                        </CardHeader>
                        <CardBody className="tab-content">

                            <Line data={chartVoltage.line.data} options={chartVoltage.line.options} />

                        </CardBody>

                    </Card>

                </Col>
                <Col xs="2">

                    <Card >
                        <CardHeader>
                            Voltage(V)
                        </CardHeader>
                        <CardBody className="tab-content">
                            <div className="d-flex justify-content-center">
                                <h4 > {nombre}</h4>
                            </div>
                            <span className="d-flex justify-content-center">{maxVoltage} V</span>

                        </CardBody>

                    </Card>

                </Col>
            </Row>
            <Row>
                <Col xs="2"></Col>

                <Col xs="6">
                    <Card >
                        <CardHeader>
                            Power factor(pu)
                        </CardHeader>
                        <CardBody>

                            <Line data={chartPowerFactor.line.data} options={chartPowerFactor.line.options} />

                        </CardBody>

                    </Card>

                </Col>

                <Col xs="2">

                    <Card >
                        <CardHeader>
                            Power factor(pu)
                        </CardHeader>
                        <CardBody className="tab-content">
                            <div className="d-flex justify-content-center">
                                <h4 > {nombre}</h4>
                            </div>
                            <span className="d-flex justify-content-center">{maxPowerFactor} pu</span>

                        </CardBody>

                    </Card>

                </Col>
            </Row>
            <Row>
                <Col xs="2"></Col>

                <Col xs="6">
                    <Card >
                        <CardHeader>
                            Apparent power(VA)
                        </CardHeader>
                        <CardBody >

                            <Line data={chartApparentPower.line.data} options={chartApparentPower.line.options} />

                        </CardBody>

                    </Card>

                </Col>
                <Col xs="2">

                    <Card >
                        <CardHeader>
                            Apparent power (VA)
                        </CardHeader>
                        <CardBody className="tab-content">
                            <div className="d-flex justify-content-center">
                                <h4 > {nombre}</h4>
                            </div>
                            <span className="d-flex justify-content-center">{maxApparentPower} VA</span>

                        </CardBody>

                    </Card>

                </Col>
            </Row>
            <Row>
                <Col xs="2"></Col>

                <Col xs="6" >
                    <Card >
                        <CardHeader>
                            Current(A)
                        </CardHeader>
                        <CardBody >

                            <Line data={chartCurrent.line.data} options={chartCurrent.line.options} />

                        </CardBody>

                    </Card>

                </Col>
                <Col xs="2">

                    <Card >
                        <CardHeader>
                            Current (A)
                        </CardHeader>
                        <CardBody className="tab-content">
                            <div className="d-flex justify-content-center">
                                <h4 > {nombre}</h4>
                            </div>
                            <span className="d-flex justify-content-center">{maxCurrent} A</span>

                        </CardBody>

                    </Card>

                </Col>
            </Row>
            <Row>
                <Col xs="2"></Col>

                <Col xs="6">
                    <Card >
                        <CardHeader>
                            ReactivePower(VA)
                        </CardHeader>
                        <CardBody className="tab-content">

                            <Line data={chartjs.line.data} options={chartjs.line.options} />

                        </CardBody>

                    </Card>

                </Col>
                <Col xs="2">

                    <Card >
                        <CardHeader>
                            ReactivePower (VA)
                        </CardHeader>
                        <CardBody className="tab-content">
                            <div className="d-flex justify-content-center">
                                <h4 > {nombre}</h4>
                            </div>
                            <span className="d-flex justify-content-center">2400 VA</span>

                        </CardBody>

                    </Card>

                </Col>
            </Row>
        </>
    );
}