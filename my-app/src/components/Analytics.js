import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Analytics() {
    const [date, setDate] = useState("27 August 2022")
    const [revenue, setRevenue] = useState(100000)
    const [cost, setCost] = useState(300000)
    const [profit, setProfit] = useState(700000)

    return (
        <div className='Analytics'>
            <Row>
                <Col>
                    <CardGroup>
                        <Card className='shadow-sm'>
                            <Card.Body>
                                <Card.Title>Today's Trends</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">as of {date}</Card.Subtitle>
                                <Card.Text>
                                    Graph
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className='shadow-sm'>
                            <ListGroup variant="flush" className='text-center'>
                                <ListGroup.Item className='p-3'>
                                    <p className='text-muted'>Resolved</p>
                                    <h4>123</h4>
                                </ListGroup.Item>
                                <ListGroup.Item className='p-3'>
                                    <p className='text-muted'>Received</p>
                                    <h4>456</h4>
                                </ListGroup.Item>
                                <ListGroup.Item className='p-3'>
                                    <p className='text-muted'>Average first response time</p>
                                    <h4>789</h4>
                                </ListGroup.Item>
                                <ListGroup.Item className='p-3'>
                                    <p className='text-muted'>Average response time</p>
                                    <h4>123</h4>
                                </ListGroup.Item>
                                <ListGroup.Item className='p-3'>
                                    <p className='text-muted'>Resolution within SLA</p>
                                    <h4>456</h4>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col>
                    <Card className='shadow-sm'>
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">Revenue by Department</Card.Subtitle>
                            <Card.Title>{revenue}</Card.Title>
                            <hr></hr>
                            <Card.Text>
                                Graph
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className='shadow-sm'>
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">Cost</Card.Subtitle>
                            <Card.Title>{cost}</Card.Title>
                            <hr></hr>
                            <Card.Text>
                                Graph
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className='shadow-sm'>
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">Profit</Card.Subtitle>
                            <Card.Title>{profit}</Card.Title>
                            <hr></hr>
                            <Card.Text>
                                Graph
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Analytics