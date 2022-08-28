import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import BananaPayCard from "../img/BananaPayCard.png";
import Button from "react-bootstrap/Button";
import API from "../API";

function Payments() {
  const {
    fetchCreditCardDetails,
    updateCreditCardDetails,
    fetchCreditCardTransactions,
  } = API();
  const [date, setDate] = useState("27 August 2022");
  const [loading, setLoading] = useState(true);
  const [cardDetails, setCardDetails] = useState();
  const [filterOption, setFilterOption] = useState("week");

  const [activeUsers, setActiveUsers] = useState(123);
  const [avgNoTransactions, setAvgNoTransactions] = useState(8);
  const [totalNoTransactions, setTotalNoTransactions] = useState(98);
  const [avgTransactionAmt, setAvgTransactionAmt] = useState(12.52);
  const [totalTransactionAmt, setTotalTransactionAmt] = useState(1072022.0);

  const [editStatus, setEditStatus] = useState(false);

  useEffect(() => {
    const getCreditCardDetails = async () => {
      const cardDetails = await fetchCreditCardDetails({ data: "ok" });
      if (cardDetails.data.ok) {
        console.log("YO");
        setCardDetails(cardDetails.data.card);
      } else {
        alert("Error Occured");
      }
      setLoading(false);
    };
    getCreditCardDetails();
  }, []);

  const handleEditStatus = () => {
    setEditStatus(!editStatus);
  };

  const handleInlineEdit = (event) => {
    const { name, value } = event.currentTarget;
    console.log(name, value);
    setCardDetails((cardDetails) => ({
      ...cardDetails,
      ...{ [name]: value },
    }));
  };

  const handleSave = async () => {
    handleEditStatus();
    const response = await updateCreditCardDetails({
      cardDetails: cardDetails,
    });

    if (response.data.ok) {
      console.log("YO");
    } else {
      alert("Error Occured");
    }
    setLoading(false);
  };

  const handleSelectEdit = async (event) => {
    const option = event.currentTarget?.value;
    setFilterOption(option);
  };

  //OVER HERE
  useEffect(() => {
    const getUsageInsights = async () => {
      const response = await fetchCreditCardTransactions({
        filter: filterOption,
      });

      if (response.data.ok) {
        console.log(response.data.transactions);
      } else {
        alert("Error Occured");
      }
      setLoading(false);
    };
    getUsageInsights();
  }, [filterOption]);

  if (loading) return "loading...";

  return (
    <div className="Payments">
      <Row>
        <div className="h1">
          The <b>BananaPay</b> Dashboard
        </div>
      </Row>
      <Row className="mt-2">
        <Col>
          <CardGroup>
            <Card border="white">
              <Card.Body>
                <div className="h2">Card Details</div>
                <Card.Subtitle className="mb-2 text-muted">
                  as of {date}
                </Card.Subtitle>
                <div className="text-center">
                  <img
                    className="PaymentsCard shadow-sm"
                    src={BananaPayCard}
                  ></img>
                </div>
                <ListGroup variant="flush" className="text-center">
                  {editStatus === false ? (
                    <>
                      <ListGroup.Item className="p-3">
                        <Row>
                          <Col>
                            <p className="text-muted">Interest Rate</p>
                            <h4>{cardDetails.interestRate}%</h4>
                          </Col>
                          <Col>
                            <p className="text-muted">Annual Fee</p>
                            <h4>SGD {cardDetails.annualFee}</h4>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item className="p-3">
                        <Row>
                          <Col>
                            <p className="text-muted">Balance Transfer Fee</p>
                            <h4>{cardDetails.balanceTransferFee}%</h4>
                          </Col>
                          <Col>
                            <p className="text-muted">Sign Up Bonus</p>
                            <h4>{cardDetails.signupBonus}</h4>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </>
                  ) : (
                    <>
                      <ListGroup.Item className="p-3">
                        <Row>
                          <Col>
                            <p className="text-muted">Interest Rate</p>
                            <input
                              type="text"
                              name="interestRate"
                              onChange={handleInlineEdit}
                              value={cardDetails.interestRate}
                            ></input>
                          </Col>
                          <Col>
                            <p className="text-muted">Annual Fee</p>
                            <input
                              type="text"
                              name="annualFee"
                              onChange={handleInlineEdit}
                              value={cardDetails.annualFee}
                            ></input>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item className="p-3">
                        <Row>
                          <Col>
                            <p className="text-muted">Balance Transfer Fee</p>
                            <input
                              type="text"
                              name="balanceTransferFee"
                              onChange={handleInlineEdit}
                              value={cardDetails.balanceTransferFee}
                            ></input>
                          </Col>
                          <Col>
                            <p className="text-muted">Sign Up Bonus</p>
                            <input
                              type="text"
                              name="signupBonus"
                              onChange={handleInlineEdit}
                              value={cardDetails.signupBonus}
                            ></input>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </>
                  )}
                </ListGroup>
                <div className="d-grid gap-2 mt-2">
                  {editStatus === false ? (
                    <Button
                      variant="outline-dark"
                      size="lg"
                      onClick={handleEditStatus}
                    >
                      Edit Card Details
                    </Button>
                  ) : (
                    <Button
                      variant="outline-dark"
                      size="lg"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
            <Card border="white">
              <Card.Body>
                <Row>
                  <Col>
                    <div className="h2">Usage Insights</div>
                    <Card.Subtitle className="mb-2 text-muted">
                      as of {date}
                    </Card.Subtitle>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="subjectMatter">
                        Show numbers by
                      </Form.Label>
                      <Form.Select
                        required
                        id="subjectMatter"
                        value={filterOption}
                        onChange={handleSelectEdit}
                      >
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
              <ListGroup variant="flush" className="text-center">
                <ListGroup.Item className="p-3">
                  <p className="text-muted">Active Users</p>
                  <h4>{activeUsers}</h4>
                </ListGroup.Item>
                <ListGroup.Item className="p-3">
                  <p className="text-muted">Avg. No. Transactions Per User</p>
                  <h4>{avgNoTransactions}</h4>
                </ListGroup.Item>
                <ListGroup.Item className="p-3">
                  <p className="text-muted">Total No. Transactions</p>
                  <h4>{totalNoTransactions}</h4>
                </ListGroup.Item>
                <ListGroup.Item className="p-3">
                  <p className="text-muted">Avg. Transaction per User</p>
                  <h4>SGD {avgTransactionAmt}</h4>
                </ListGroup.Item>
                <ListGroup.Item className="p-3">
                  <p className="text-muted">Total Amount Transacted</p>
                  <h4>SGD {totalTransactionAmt}</h4>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </div>
  );
}

export default Payments;
