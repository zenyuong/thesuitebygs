import React from 'react'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'

function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMarketData() {
    const data = [
        {
          "name": "Page A",
          "uv": 4000,
          "pv": 2400
        },
        {
          "name": "Page B",
          "uv": 3000,
          "pv": 1398
        },
        {
          "name": "Page C",
          "uv": 2000,
          "pv": 9800
        },
        {
          "name": "Page D",
          "uv": 2780,
          "pv": 3908
        },
        {
          "name": "Page E",
          "uv": 1890,
          "pv": 4800
        },
        {
          "name": "Page F",
          "uv": 2390,
          "pv": 3800
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300
        }
      ]
    
      return data
}

function getSalesData() {
    const data = [
        {
          "name": "Page A",
          "uv": 4000,
          "pv": 2400
        },
        {
          "name": "Page B",
          "uv": 3000,
          "pv": 1398
        },
        {
          "name": "Page C",
          "uv": 2000,
          "pv": 9800
        },
        {
          "name": "Page D",
          "uv": 2780,
          "pv": 3908
        },
        {
          "name": "Page E",
          "uv": 1890,
          "pv": 4800
        },
        {
          "name": "Page F",
          "uv": 2390,
          "pv": 3800
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300
        }
      ]
    
      return data
}

function calculateRevenue() {
    return '123456'
}

function calculateCost() {
    return 789012
}

function calculateProfit() {
    return 345678
}

function Analytics() {
    return (
        <div>
            <Row>
                <Col>
                    <CardGroup>
                        <Card className='shadow-sm'>
                            <Card.Body>
                                <Card.Title>Today's Trends</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">as of {new Date().toLocaleString() + ""}</Card.Subtitle>
                                <ResponsiveContainer width="100%" height={250} className='d-flex flex-column h-100 justify-content-center align-items-center'>
                                    <LineChart data={getMarketData()}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                        <Card className='shadow-sm'>
                            <ListGroup variant="flush" className='text-center'>
                                <ListGroup.Item className='p-3'>
                                    <p className='text-muted'>Resolved</p>
                                    <h4>{randomNumberInRange(50, 200)}</h4>
                                </ListGroup.Item>
                                <ListGroup.Item className='p-3'>
                                    <p className='text-muted'>Received</p>
                                    <h4>{randomNumberInRange(20, 100)}</h4>
                                </ListGroup.Item>
                                <ListGroup.Item className='p-3'>
                                    <p className='text-muted'>Average first response time</p>
                                    <h4>{randomNumberInRange(20, 50)}m</h4>
                                </ListGroup.Item>
                                <ListGroup.Item className='p-3'>
                                    <p className='text-muted'>Average response time</p>
                                    <h4>{randomNumberInRange(1, 3)}h {randomNumberInRange(10, 60)}m</h4>
                                </ListGroup.Item>
                                <ListGroup.Item className='p-3'>
                                    <p className='text-muted'>Resolution within SLA</p>
                                    <h4>{randomNumberInRange(70, 95)}%</h4>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col xs={4}>
                    <Card className='shadow-sm'>
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">Revenue</Card.Subtitle>
                            <Card.Title>{calculateRevenue()}</Card.Title>
                            <hr></hr>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={getSalesData()}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="pv" fill="#8884d8" />
                                    <Bar dataKey="uv" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={4}>
                    <Card className='shadow-sm'>
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">Cost</Card.Subtitle>
                            <Card.Title>{calculateCost()}</Card.Title>
                            <hr></hr>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={getSalesData()}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="pv" fill="#8884d8" />
                                    <Bar dataKey="uv" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={4}>
                    <Card className='shadow-sm'>
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">Profit</Card.Subtitle>
                            <Card.Title>{calculateProfit()}</Card.Title>
                            <hr></hr>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={getSalesData()}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="pv" fill="#8884d8" />
                                    <Bar dataKey="uv" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Analytics