import React, { useEffect } from 'react'
import { useState } from 'react'
import StatusBadge from './StatusBadge ';
import 'typeface-inter';
import { FaArrowDown } from 'react-icons/fa';
import Fil from '../img/filter.png'
import { Modal, Pagination, Table } from 'react-bootstrap';
import { Form, Button } from "react-bootstrap"
import axios from 'axios';
import deleted from "../img/Icon.png"
import edit from "../img/edit.png"
import Edit from './Edit';
//import Edit from './Edit';


const PeopleDirectory = () => {

    // For modal to get the info when you click on +Add member button 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // useStates to create & post info on api in modal
    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [photo, setPhoto] = useState();
    const [email, setEmail] = useState();
    const [dob, setDob] = useState();
    const [nationality, setNationality] = useState();
    const [contact, setContact] = useState();
    const [worke, setWorke] = useState();

    //
    const [info, setInfo] = useState([]);
    const [currentpage, setCurrentpage] = useState(1);
    const rowsPerPage = 10;
    const [searchquery, setSearchquery] = useState("")

    //
    const [deleteShow, setDeleteShow] = useState(false);
    const [membertodelete, setMembertodelete] = useState(null);

    //
    const [selectedPerson, setSelectedPerson] = useState(null);

    //
    const [editId,setEditId] = useState(null);
    const [showEditModal, setShowEditModal] = useState();

    // Function to put info on mock api
    const sendData = (e) => {
        e.preventDefault();
        axios.post('https://66b2f68a7fba54a5b7eaee35.mockapi.io/yes/post', { name, age, photo, email, dob, nationality, contact, worke })
        getData()
        handleClose()

    }

    // Function to get info from mock api
    const getData = async () => {
        try {
            const response = await axios.get('https://66b2f68a7fba54a5b7eaee35.mockapi.io/yes/post');
            setInfo(response.data);
        }
        catch (error) {
            console.error('Error fetching data', error);
        }
    }

    useEffect(() => {
        getData();
    }, []);




    const filteredInfo = info.filter(person =>
        person.name.toLowerCase().includes(searchquery.toLowerCase()) ||
        person.email.toLowerCase().includes(searchquery.toLowerCase())
    );

    const indexOfLastRow = currentpage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredInfo.slice(indexOfFirstRow, indexOfLastRow)

    const paginate = (pageNumber) => setCurrentpage(pageNumber);

    const totalPages = Math.ceil(filteredInfo.length / rowsPerPage);

    // Functions for Delete & its Modal
    const DeleteShowModal = (id) => {
        console.log("member delete:", id)
        setMembertodelete(id);
        setDeleteShow(true);
    }
    const DeleteCloseModal = () => setDeleteShow(false);

    const handleDelete = () => {
        console.log("deleting member with id:", membertodelete)
        setInfo(info.filter(person => person.id !== membertodelete));
        setDeleteShow(false)
    }

    // Function to open total info on row click
    const handleRowClick = (person) => {
        console.log(person)
        setSelectedPerson(person);
    }

    //
    const handleSearchChange = (e) => {
        setSearchquery(e.target.value);
        setCurrentpage(1);
    };

    // Handle editing a member
    const handleEdit = (id) => {
        setEditId(id);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditId(null);
    };




    return (

        <div className='border border-1  px-2 mt-4' style={{ borderRadius: '10px', height: 'max-content', borderColor: "#E4E7EC" }}>

            {/* Team Member,User,Search,Add Member */}
            <div className='d-flex flex-row justify-content-between pt-2 mx-2 border-bottom pb-2'>
                <div className='d-flex flex-row justify-content-between align-items-center text-nowrap'>
                    <div className='fw-bold me-2'>Team member</div>
                    <div className='rounded-pill px-3' style={{ color: "#6941C6", backgroundColor: "#DDD5EE", border: "2px solid #6941C6" }}>{filteredInfo.length} Users</div>
                </div>
                <div className='d-flex flex-row'>
                    <form>
                        <input className='form-control me-2' type='search' placeholder='Search' aria-label='Search' value={searchquery}
                            onChange={handleSearchChange} />
                    </form>
                    <img src={Fil} alt='Filter Icon' />
                    <button type='button' className='btn text-light text-nowrap' style={{ backgroundColor: "#6941C6" }} onClick={handleShow}>+ Add members</button>
                </div>
            </div>

            {/* Modal for personal info submission {Create & Post}       */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='w-100 text-center'>Personal Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={sendData}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Name:" onChange={(e) => { setName(e.target.value) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="text" placeholder="Age:" onChange={(e) => { setAge(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="text" placeholder="Image link:" onChange={(e) => { setPhoto(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="email" placeholder="Email:" onChange={(e) => { setEmail(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="text" placeholder="DOB:" onChange={(e) => { setDob(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="text" placeholder="Nationality:" onChange={(e) => { setNationality(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="text" placeholder="Contact:" onChange={(e) => { setContact(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="email" placeholder="Work Email:" onChange={(e) => { setWorke(e.target.value) }} />
                        </Form.Group>

                        <Button className='btn text-light text-nowrap w-100 text-center' style={{ backgroundColor: "#6941C6" }} type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>


            <div className='people-table-container mt-4'>
                <Table striped hover responsive>
                    <thead>
                        <tr style={{ fontFamily: 'Inter, sans-serif', fontSize: "12px", fontWeight: "500", color: '#777777' }}>
                            <th style={{ fontWeight: "500", color: '#666666' }}>Name <FaArrowDown /></th>
                            <th style={{ fontWeight: "500", color: '#666666' }}>Status</th>
                            <th style={{ fontWeight: "500", color: '#666666' }}>Role</th>
                            <th style={{ fontWeight: "500", color: '#666666' }}>Email</th>
                            <th style={{ fontWeight: "500", color: '#666666' }}>Teams</th>
                            <th style={{ fontWeight: "500", color: '#666666' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((person) => (
                            <tr key={person.id}
                                style={{ cursor: "pointer" }}
                                onClick={() => handleRowClick(person)}>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <img
                                            src={person.photo}
                                            alt={person.name} className='rounded-circle me-2'
                                            style={{ width: "36px", height: "36px", objectFit: "cover" }}
                                        />
                                        <div>
                                            <div style={{ fontSize: "0.9rem", fontWeight: "500", fontFamily: 'Inter, sans-serif', color: "#101828" }}>{person.name}</div>
                                            <div className='text-muted' style={{ fontSize: "0.8rem" }}>@{person.name.split(' ')[0].toLowerCase()}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <StatusBadge />
                                </td>
                                <td style={{ fontSize: "0.9rem" }}>Developer</td>
                                <td style={{ fontSize: "0.9rem" }}>{person.email || 'example@gmail.com'}</td>
                                <td>
                                    <div className='d-flex flex-wrap align-items-center'>
                                        <div className='rounded-pill fw-bold d-flex justify-content-center align-items-center mx-1 px-2' style={{ color: '#6941C6', backgroundColor: '#f8f5fe', border: '2px solid #e6d6fa', fontSize: '0.8rem' }}>
                                            Design
                                        </div>
                                        <div className='rounded-pill fw-bold d-flex justify-content-center align-items-center mx-1 px-2' style={{ color: '#175cc7', backgroundColor: '#eff8ff', border: '2px solid #b1ddff', fontSize: '0.8rem' }}>
                                            Product
                                        </div>
                                        <div className='rounded-pill fw-bold d-flex justify-content-center align-items-center mx-1 px-2' style={{ color: '#3537c9', backgroundColor: '#edf3ff', border: '2px solid #c6d7f8', fontSize: '0.8rem' }}>
                                            Marketing
                                        </div>
                                        <div className='rounded-pill fw-bold d-flex justify-content-center align-items-center mx-1 px-2' style={{ color: 'black', backgroundColor: '#f9fafc', border: '2px solid #e6e7eb', fontSize: '0.8rem' }}>
                                            +4
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className='d-flex flex-row justify-content-center align-items-center' style={{ height: "2.6rem" }}>
                                        <img
                                            src={deleted} alt="Delete photo"
                                            className='me-2' style={{ cursor: "pointer" }}
                                            onClick={(e) => { e.stopPropagation(); DeleteShowModal(person.id); }} />

                                        <img
                                            src={edit} alt="Edit photo" className='me-2'
                                            style={{ cursor: "pointer" }}
                                            onClick={(e) => { e.stopPropagation(); handleEdit(person.id); }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </Table>
                <Pagination className="justify-content-center">
                    {[...Array(totalPages).keys()].map((pageNumber) => (
                        <Pagination.Item
                            key={pageNumber + 1}
                            active={pageNumber + 1 === currentpage}
                            onClick={() => paginate(pageNumber + 1)}
                        >
                            {pageNumber + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>

            {/* Modal to confirm delete pop-ups when you click on delete */}
            <Modal show={deleteShow} onHide={DeleteCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deleteion.</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Are you sure you want to delete this member?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={DeleteCloseModal}>
                        Cancel</Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Delete</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal to show Full information of person when clicked on row */}

            <Modal show={selectedPerson !== null} onHide={() => setSelectedPerson(null)} centered>
                <Modal.Header style={{ background: '#2A5B7E' }} closeButton>
                    {selectedPerson && (
                        <div className='d-flex flex-row justify-content-between align-items-start w-100'>
                            <img
                                src={selectedPerson.photo || 'https://via.placeholder.com/150'}
                                alt={selectedPerson.name}
                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '100%' }}
                            />
                            <section className='text-white px-4 py-2 rounded' style={{ flex: 1 }}>
                                <p className='fw-bold mb-1'>{selectedPerson.name}</p>
                                <section className='d-flex flex-row justify-content-between'>
                                    <div className=' text-white px-2 py-1 rounded' style={{ flex: 0 }}>
                                        <div className="text-white" style={{ fontSize: '0.7rem' }}>@{selectedPerson.name.split(' ')[0].toLowerCase()}</div>
                                        <p className='mb-0'>User</p>
                                    </div>
                                    <div style={{ borderLeft: '2px solid black', height: '46px' }}></div>

                                    <div className=' text-white px-2 py-1 rounded' style={{ flex: 1 }}>
                                        <p className='mb-0'>Product Designer</p>
                                        <p className='mb-0'>Role</p>
                                    </div>
                                </section>
                            </section>
                        </div>
                    )}
                </Modal.Header>
                <Modal.Body>
                    {selectedPerson && (
                        <div>
                            <p><strong>Date of Birth:</strong> {selectedPerson.dob || 'N/A'}</p>
                            <p><strong>Nationality:</strong> {selectedPerson.nationality || 'N/A'}</p>
                            <p><strong>Contact:</strong> {selectedPerson.contact || 'N/A'}</p>
                            <p><strong>Email Address:</strong> {selectedPerson.email || 'N/A'}</p>
                            <p><strong>Work Email Address:</strong> {selectedPerson.workemail || 'N/A'}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSelectedPerson(null)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


{/* Modal for Editing Member */}
<Modal
                show={showEditModal}
                onHide={handleCloseEditModal}
                backdrop="static"
                keyboard={false}
                centered
            >
                {/* Modal Header */}
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>

                {/* Modal Body */}
                <Modal.Body>
                    <Edit id={editId} handleClose={handleCloseEditModal} />
                </Modal.Body>
            </Modal>






        </div >
    )
}

export default PeopleDirectory