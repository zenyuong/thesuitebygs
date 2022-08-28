import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import API from '../API'

function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMarketData() {
    const data = [
        {
          "name": "Page A",
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


function changeLiveData(liveData){

    const retData = []
    console.log('THIS IS THE LVIE DATA', liveData.data.highestPrices)

    for (let i=0; i<liveData.data['highestPrices'].length; i++){
        retData.push(
            {
                'name': i, 
                'Stock Prices' : liveData.data.highestPrices[i]
            }
        )
    }

    return retData
}

function Analytics() {

        // Fetching endpoints from API.js
        const {fetchLiveMarketStatistics, visualiseData} = API()
        const [newData, setLiveData] = useState()
        const [profit, setProfit] = useState()

    
        useEffect(() => {
            const getLiveData = async () => {
                const liveData = await fetchLiveMarketStatistics({ticker:'AAPL'});
                console.log("THIS IS THE liveData", liveData);
                if (liveData.data.ok) {
                const newData = changeLiveData(liveData.data)
                console.log("New Data", newData)
                setLiveData(newData)
                
                } else {
                return 'Data Not Found!';
                }
            };
            getLiveData();
            }, []);


            useEffect(() => {
                const getProfit = async () => {
                    const profit = await visualiseData({file:'placeholder'});
                    console.log("THIS IS THE profit", profit);
                    if (profit.ok) {
                    console.log("Profit", profit)
                    setProfit(profit)
                    
                    } else {
                    return 'Data Not Found!';
                    }
                };
                getProfit();
                }, []);

    return (
        <div>
            <Row>
                <div className='h1'>
                    Your <b>Analytics</b> at a Glance
                </div>
            </Row>
            <Row className='mt-2'>
                <Col>
                    <CardGroup>
                        <Card className='shadow-sm'>
                            <Card.Body>
                                <Card.Title>Today's Trends</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">as of {new Date().toLocaleString() + ""}</Card.Subtitle>
                                <ResponsiveContainer width="100%" height={250} className='d-flex flex-column h-100 justify-content-center align-items-center'>
                                    <LineChart data={newData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            {/* <XAxis dataKey="name" /> */}
                                            {/* <YAxis /> */}
                                            <YAxis type="number" domain={[100, 200]}/>
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="Stock Prices" stroke="#8884d8" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                        {/* <Card className='shadow-sm'>
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
                        </Card> */}
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