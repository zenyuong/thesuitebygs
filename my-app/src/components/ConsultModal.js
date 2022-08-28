import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ConsultModal(props) {
  return (
      <Modal className="main-modal"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Consult an Expert
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <ConsultForm/> 
          </div>
        </Modal.Body>
      </Modal>
    );
}

function ConsultForm() {
  return (
    <form>
      <Form.Group className="mb-3">
          <Form.Label htmlFor="subjectMatter">Subject Matter</Form.Label>
          <Form.Select required id="subjectMatter">
            <option>Analytics</option>
            <option>Payments</option>
            <option>Asset Management</option>
          </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="subjectMatter">Appointment Date</Form.Label>
        <br></br>
        <Form.Text id="passwordHelpBlock" muted>
            Kindly select a day at least 7 days after today's date.
        </Form.Text>
        <Form.Control required id="apptDate" type="date"></Form.Control>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="apptTime">Appointment Time</Form.Label>
        <Form.Control required id="apptTime" type="time"></Form.Control>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="consultMatter">Consult Matter</Form.Label>
        <br></br>
        <Form.Text id="passwordHelpBlock" muted>
            Kindly provide a detailed description of the specific information you would need Expert advice on. Do note that all Consult Requests are screened to verify the need for a teleconsult.
        </Form.Text>
        <br></br>
        <Form.Control required id="consultMatter" as="textarea"></Form.Control>
      </Form.Group>

      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Attachment(s)</Form.Label>
        <Form.Control required type="file" multiple />
      </Form.Group>
      
      <div className="d-grid">
        <Button variant="primary" size="lg" type="submit">
          Submit
        </Button>
      </div>
      
    </form>
  )
}

export default ConsultModal