import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from 'react-router-dom';
import { XLg, List, House, Wallet, GraphUp, Briefcase, Gear, Award, PencilSquare } from 'react-bootstrap-icons';

function Sidebar() {
    const [show, setShow] = useState(true)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="Sidebar">
            <Button variant="dark" onClick={handleShow}>
                <List />
            </Button>

            <Offcanvas className="bg-dark text-light" style={{width: "250px"}} show={show} onHide={handleClose} backdrop={false}>
                <Offcanvas.Header>
                    <Offcanvas.Title>
                        <img src="https://fshcdn.com/hairstyles/business-man_cut/0bc51f5e-7f68-46b2-b5c8-0f839c42537a.jpg?webp=1&w=256" className='rounded-circle me-3' alt="user" style={{width: "40px", height: "40px"}} />My Suite
                    </Offcanvas.Title>
                    <Button variant="dark rounded-circle" onClick={handleClose}>
                        <XLg />
                    </Button>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Button variant="dark">
                        <Link to="/" className='text-decoration-none text-light'>
                            <House className='me-3' />Home
                        </Link>
                    </Button>
                    <Button variant="dark">
                        <Link to="/analytics" className='text-decoration-none text-light'>
                            <GraphUp className='me-3'/>Analytics
                        </Link>
                    </Button>
                    <Button variant="dark">
                        <Link to="/payments" className='text-decoration-none text-light'>
                            <Wallet className='me-3' />Payments
                        </Link>
                    </Button>
                    <Button variant="dark">
                        <Link to="assetmanagement" className='text-decoration-none text-light'>
                            <Briefcase className='me-3' />Asset Management
                        </Link>
                    </Button>
                    <hr />
                    <Button variant="dark" className='offcanvasButtonStyle'>
                        <Gear className='me-3' />Settings
                    </Button>
                    <Button variant="dark" className='offcanvasButtonStyle'>
                        <Award className='me-3' />Subscription
                    </Button>
                    <Button variant="dark" className='offcanvasButtonStyle'>
                        <PencilSquare className='me-3' />Consult an Expert
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Sidebar