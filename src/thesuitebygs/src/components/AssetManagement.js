import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import BananaPayCard from '../img/BananaPayCard.png';
import Button from 'react-bootstrap/Button';

function AssetManagement() {

    const [date, setDate] = useState("27 August 2022")

    const [intRate, setIntRate] = useState(0.5)
    const [annualFee, setAnnualFee] = useState(50.00)
    const [balTransferFee, setBalTransferFee] = useState(2.5)
    const [signupBonus, setSignupBonus] = useState("OFF")

    const [activeUsers, setActiveUsers] = useState(123)
    const [avgNoTransactions, setAvgNoTransactions] = useState(8)
    const [totalNoTransactions, setTotalNoTransactions] = useState(98)
    const [avgTransactionAmt, setAvgTransactionAmt] = useState(12.52)
    const [totalTransactionAmt, setTotalTransactionAmt] = useState(1072022.00)

     return (
        <div className='Payments'>
            <Row>
                <div className='h1'>
                    Your Asset Management Dashboard
                </div>
            </Row>
            <Row className='mt-2'>
                <Col>
                    <CardGroup>
                        <Card border="white">
                            <Card.Body>
                                <div className='h2'>
                                    Upcoming Listings
                                </div>
                                <Card.Subtitle className="mb-2 text-muted">as of {date}</Card.Subtitle>
                                <div className='text-center'>
                                    <img className='PaymentsCard shadow-sm' src={BananaPayCard}></img>
                                </div>
                                <ListGroup variant="flush" className='text-center'>
                                    <ListGroup.Item className='p-3'>
                                        <Row>
                                            <Col>
                                                <p className='text-muted'>Interest Rate</p>
                                                <h4>{intRate}%</h4>
                                            </Col>
                                            <Col>
                                                <p className='text-muted'>Annual Fee</p>
                                                <h4>SGD {annualFee}</h4> 
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item className='p-3'>
                                        <Row>
                                            <Col>
                                                <p className='text-muted'>Balance Transfer Fee</p>
                                                <h4>{balTransferFee}%</h4>
                                            </Col>
                                            <Col>
                                                <p className='text-muted'>Sign Up Bonus</p>
                                                <h4>{signupBonus}</h4>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                                <div className="d-grid gap-2 mt-2">
                                    <Button variant="outline-dark" size="lg">
                                        Edit Card Details
                                    </Button>
                         
                                </div>
                            </Card.Body>
                        </Card>
                        <Card border='white'>
                            <Card.Body >
                                <Row>
                                    <Col>
                                        <div className='h2'>
                                            Risk Calculator
                                        </div>
                                        <Card.Subtitle className="mb-2 text-muted">as of {date}</Card.Subtitle>
                                    </Col>
                                    <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="dataFilter">Show numbers by</Form.Label>
                                        <Form.Select required id="dataFilter">
                                            <option>Week</option>
                                            <option>Month</option>
                                            <option>Year</option>
                                        </Form.Select>
                                    </Form.Group>
                                    
                                    </Col>
                                </Row>
                            </Card.Body>
                            <ListGroup variant="flush" className='text-center'>
                                <ListGroup.Item className='p-3'>
                                    <p className='text-muted'>Active Users</p>
                                    <h4>{activeUsers}</h4>
                                </ListGroup.Item>
                                <ListGroup.Item className='p-3'>
                                    <p className='text-muted'>Avg. No. Transactions Per User</p>
                                    <h4>{avgNoTransactions}</h4>
                                </ListGroup.Item>
                                <ListGroup.Item className='p-3'>
                                    <p className='text-muted'>Total No. Transactions</p>
                                    <h4>{totalNoTransactions}</h4>
                                </ListGroup.Item>
                                <ListGroup.Item className='p-3'>
                                    <p className='text-muted'>Avg. Transaction per User</p>
                                    <h4>SGD {avgTransactionAmt}</h4>
                                </ListGroup.Item>
                                <ListGroup.Item className='p-3'>
                                    <p className='text-muted'>Total Amount Transacted</p>
                                    <h4>SGD {totalTransactionAmt}</h4>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </div>
     )
}
export default AssetManagement