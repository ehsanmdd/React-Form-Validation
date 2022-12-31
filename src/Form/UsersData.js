import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "./UsersData.css"
import Table from 'react-bootstrap/Table';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';






function UsersData() {

    const [users, setUsers] = useState([]) 
    const [userID, setUserID] = useState("")
    const [getData, setGetData] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    // State for check data inside the inputs
    const [firtsNameData, setFirstNameData] = useState("");
    const [lastNameData, setLastNameData] = useState("");
    const [emailData, setEmailData] = useState("");


    // Fetching Data realTime 
    useEffect(() => {
        async function getDataBase() {
            await fetch("https://formvalidation-8094b-default-rtdb.asia-southeast1.firebasedatabase.app/users.json")
                .then(res => res.json())
                .then(data => {
                    console.log(Object.entries(data));
                    setUsers(Object.entries(data))
                })
        }
        getDataBase()
    }, [getData])

    // geting Data and edited in form 
    useEffect(() => {
        let mainUserInfo = users.find((userInfo) => userInfo[0] == userID, [userID])

        if (mainUserInfo) {
            setFirstNameData(mainUserInfo[1].firstName)
            setLastNameData(mainUserInfo[1].lastName)
            setEmailData(mainUserInfo[1].email)
        }
    },[userID])

    const removeUserHandeler = async () => {
        console.log(userID)

        await fetch(`https://formvalidation-8094b-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userID}.json`, {
            method: "DELETE"
        }).then(res => console.log(res))

        setShowDeleteModal(false)
        setGetData(prev => !prev)
    }

    const userEdit = async () => {
        let newUserInfo = {
            firstName: firtsNameData,
            lastName: lastNameData,
            email: emailData,
        }


        await fetch(`https://formvalidation-8094b-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userID}.json`, {
            method: "PUT",
            body: JSON.stringify(newUserInfo),
        }).then(res => (console.log(res)))

        setShowEditModal(false)
        setGetData(prev => !prev)
    }

    return (
        <div>
            <Table striped>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user[1].firstName}</td>
                            <td>{user[1].lastName}</td>
                            <td>{user[1].email}</td>

                            <td className='table-actions'>
                                <AiFillDelete className='icons'
                                    onClick={() => {
                                        setShowDeleteModal(true)
                                        setUserID(user[0])
                                    }} />

                                <AiFillEdit className='icons'
                                    onClick={() => {
                                        setShowEditModal(true)
                                        setUserID(user[0])
                                    }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Delete Modal  */}

            <Modal
                show={showDeleteModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Warrning
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Delete User</h4>
                    <p>
                        Are you sure to delete the user?!
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowDeleteModal(false)}>Close</Button>
                    <Button onClick={removeUserHandeler}>Yes, Delete</Button>
                </Modal.Footer>
            </Modal>

            {/* Edite Modal */}

            <Modal
                show={showEditModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editing Form
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name"
                                value={firtsNameData}
                                onChange={(event) => setFirstNameData(event.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name"
                                value={lastNameData}
                                onChange={(event) => setLastNameData(event.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email"
                                value={emailData}
                                onChange={(event) => setEmailData(event.target.value)} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button onClick={() => setShowEditModal(false)}>Close</Button>
                    <Button onClick={userEdit}>Edit</Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UsersData