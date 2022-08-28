import React, { useState, useEffect, useRef } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import API from "../API";

function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomListings(listings) {
  var idxList = [];
  var randomListings = [];

  for (let i = 0; i < 3; i++) {
    idxList.push(randomNumberInRange(0, 29));
  }
  for (const idx of idxList) {
    console.log(idx);
    randomListings.push(listings[idx]);
  }

  return randomListings;
}

function AssetManagement() {
  const [loading, setLoading] = useState(true);
  const { fetchUpcomingPublicOfferings, calculateRisk, fetchHistoricalPrices } =
    API();

  const [upcomingListings, setUpcomingPublicListings] = useState();
  const [riskAmt, setRiskAmt] = useState();

  const estimatedProfitPerShare = useRef();
  const numberOfShares = useRef();
  const initialInvestment = useRef();

  const symbol = useRef();
  const startDate = useRef();
  const endDate = useRef();

  const [historicalPrices, setHistoricalPrices] = useState();

  useEffect(() => {
    const getUpcomingListings = async () => {
      const data_upcomingListings = await fetchUpcomingPublicOfferings();
      if (data_upcomingListings.data.ok) {
        setUpcomingPublicListings(
          getRandomListings(data_upcomingListings.data.upcomingPublicOfferings)
        );
        console.log();
      } else {
      }
      setLoading(false);
    };
    getUpcomingListings();
  }, []);

  const handleGenerateGraph = async (event) => {
    event.preventDefault();

    const ticker = `${symbol.current?.value}_${startDate.current?.value}_${endDate.current?.value}`;

    const response = await fetchHistoricalPrices({ ticker: ticker });

    if (response.data.ok) {
      const input = response.data.pricesData.highestPrices;
      console.log(input);
      const data = await changeData(input);
      setHistoricalPrices(data);
    } else {
      alert("Error Occured");
    }
  };

  function changeData(data) {
    const retData = [];
    console.log("THIS IS THE DATA", data);

    for (let i = 0; i < data.length; i++) {
      retData.push({
        name: i,
        "Stock Prices": data[i],
      });
    }
    return retData;
  }

  const handleRiskCalculation = async (event) => {
    event.preventDefault();
    console.log(
      estimatedProfitPerShare.current?.value,
      numberOfShares.current?.value,
      initialInvestment.current?.value
    );

    const response = await calculateRisk({
      estimatedProfitPerShare: estimatedProfitPerShare.current?.value,
      numberOfShares: numberOfShares.current?.value,
      initialInvestment: initialInvestment.current?.value,
    });

    if (response.data.ok) {
      console.log(response.data);
      setRiskAmt(response.data.risk);
    } else {
      alert("Error Occured");
    }
  };

  console.log(upcomingListings);
  if (loading) return "loading...";
  return (
    <div className="Payments">
      <Row>
        <div className="h1">
          Your <b>Asset Management</b> at a Glance
        </div>
      </Row>
      <Row className="mt-2">
        <Col>
          <Card className="" border="white">
            <Card.Body>
              <div className="h2">Upcoming Listings</div>
              <Card.Subtitle className="mb-2 text-muted">
                as of {new Date().toLocaleString() + ""}
              </Card.Subtitle>

              <ListGroup variant="flush" className="text-center">
                <ListGroup.Item className="p-3">
                  <Row>
                    <Col>
                      <p className="text-muted">Symbol</p>
                    </Col>
                    <Col>
                      <p className="text-muted">Name</p>
                    </Col>
                    <Col>
                      <p className="text-muted">List Price</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {upcomingListings.map((item, i) => (
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <h4>{item.ticker}</h4>
                      </Col>
                      <Col>
                        <p>{item.companyName}</p>
                      </Col>
                      <Col>
                        <h4>{item.listPrice}</h4>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="mx-2">
            <form>
              <Card.Body>
                <Row className="mb-1">
                  <Col>
                    <div className="h2">Risk Calculator</div>
                  </Col>
                  <Col>
                    <div className="d-grid gap-2 mt-2">
                      <Button variant="outline-danger" size="lg">
                        Reset
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <ListGroup variant="flush" className="text-center">
                <ListGroup.Item className="p-3">
                  <Row>
                    <Col>
                      <p className="text-muted">Est. Profit Share</p>
                    </Col>
                    <Col>
                      <p className="text-muted">No. of Shares</p>
                    </Col>
                    <Col>
                      <p className="text-muted">Initial Investment</p>
                    </Col>
                  </Row>
                  <Row>
                    <InputGroup className="mb-3">
                      <Form.Control
                        aria-label="Est. Profit Share"
                        ref={estimatedProfitPerShare}
                      />
                      <Form.Control
                        aria-label="No. of Shares"
                        ref={numberOfShares}
                      />
                      <Form.Control
                        aria-label="Initial Investment"
                        ref={initialInvestment}
                      />
                    </InputGroup>
                    <div className="d-grid gap-2 mt-2 mb-3">
                      <Button
                        variant="outline-dark"
                        size="lg"
                        type="submit"
                        onClick={handleRiskCalculation}
                      >
                        Calculate Risk
                      </Button>
                    </div>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="p-3">
                  <Row>
                    <Col>
                      <h4>Risk</h4>
                    </Col>
                    <Col>
                      <h4>{riskAmt}</h4>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </form>
          </Card>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col xs={3}>
          <Card>
            <Card.Body>
              <div className="h2">Historical Prices</div>
              <Card.Subtitle className="mb-2 text-muted">
                as of {new Date().toLocaleString() + ""}
              </Card.Subtitle>
              <div className="mt-3">
                <form>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="consultMatter">Symbol</Form.Label>
                    <Form.Control
                      required
                      id="consultMatter"
                      as="input"
                      ref={symbol}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="subjectMatter">Start Date</Form.Label>
                    <Form.Control
                      required
                      id="apptDate"
                      type="date"
                      ref={startDate}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="subjectMatter">End Date</Form.Label>
                    <Form.Control
                      required
                      id="apptDate"
                      type="date"
                      ref={endDate}
                    ></Form.Control>
                  </Form.Group>
                  <div className="d-grid gap-2 mt-2 mb-3">
                    <Button
                      variant="outline-dark"
                      size="lg"
                      type="submit"
                      onClick={handleGenerateGraph}
                    >
                      Generate Graph
                    </Button>
                  </div>
                </form>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={9}>
          <Card>
            <Card.Body>
              <ResponsiveContainer
                width="100%"
                height={400}
                className=" h-100 justify-content-center align-items-center"
              >
                <LineChart
                  data={historicalPrices}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis type="number" domain={[100, 200]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Stock Prices"
                    stroke="#8884d8"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default AssetManagement;
