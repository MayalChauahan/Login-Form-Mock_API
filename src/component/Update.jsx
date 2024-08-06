import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Update = () => {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setId(localStorage.getItem("id"));
        setName(localStorage.getItem("name"));
        setEmail(localStorage.getItem("email"));
    }, []);

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put(`https://66a1e9a6967c89168f1e00a0.mockapi.io/login-form/${id}`, {
            name: name,
            email: email,
            password: password,
        })
            .then(() => {
                navigate("/user-list");
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error updating data:', error);
            });
    }

    return (
        <>
            <Container className="py-5">
                <div className="d-flex justify-content-between my-3">
                    <h2>Update User</h2>
                    <div className="d-flex gap-3">
                        {/* <Link to={"/"} ><Button className="btn-secondary">Create User</Button></Link> */}
                        <Link to={"/user-list"} ><Button className="btn-secondary">User List</Button></Link>
                    </div>
                </div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label> Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleUpdate}> Update </Button>
                </Form>
            </Container>
        </>
    )
}

export default Update