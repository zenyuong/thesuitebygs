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

  const [loading, setLoading] = useState(true);
  const [cardDetails, setCardDetails] = useState();
  const [filterOption, setFilterOption] = useState("week");

  const [activeUsers, setActiveUsers] = useState(0);
  const [avgNoTransactions, setAvgNoTransactions] = useState(0);
  const [totalNoTransactions, setTotalNoTransactions] = useState(0);
  const [avgTransactionAmt, setAvgTransactionAmt] = useState(0);
  const [totalTransactionAmt, setTotalTransactionAmt] = useState(0);

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
    console.log("HI", name, value);
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
        let transactions = response.data.transactions;
        console.log(transactions);
        let totalAmount = 0;
        let userList = [];
        for (let i = 0; i < transactions.length; i++) {
          totalAmount = totalAmount + transactions[i].transactionAmount;
          if (!userList.includes(transactions[i].userid)) {
            userList.push(transactions[i].userId);
          }
        }
        setTotalNoTransactions(transactions.length);
        setTotalTransactionAmt(totalAmount);
        setActiveUsers(userList.length);
        if (transactions.length > 0) {
          setAvgNoTransactions(
            (transactions.length / userList.length).toFixed(2)
          );
          setAvgTransactionAmt((totalAmount / userList.length).toFixed(2));
        } else {
          setAvgNoTransactions(0);
          setAvgTransactionAmt(0);
        }
      } else {
        alert("Error Occured");
      }
      setLoading(false);
    };
    getUsageInsights();
  }, [filterOption]);

  if (loading) return "Loading...";

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
                  as of {new Date().toLocaleString() + ""}
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
                            <Form.Control
                              onChange={handleInlineEdit}
                              placeholder={cardDetails.interestRate}
                              name="interestRate"
                            ></Form.Control>
                          </Col>
                          <Col>
                            <p className="text-muted">Annual Fee</p>
                            <Form.Control
                              onChange={handleInlineEdit}
                              placeholder={cardDetails.annualFee}
                              name="annualFee"
                            ></Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item className="p-3">
                        <Row>
                          <Col>
                            <p className="text-muted">Balance Transfer Fee</p>
                            <Form.Control
                              onChange={handleInlineEdit}
                              placeholder={cardDetails.balanceTransferFee}
                              name="balanceTransferFee"
                            ></Form.Control>
                          </Col>
                          <Col>
                            <p className="text-muted">Sign Up Bonus</p>
                            <Form.Control
                              onChange={handleInlineEdit}
                              placeholder={cardDetails.signupBonus}
                              name="signupBonus"
                            ></Form.Control>
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
                      as of {new Date().toLocaleString() + ""}
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
