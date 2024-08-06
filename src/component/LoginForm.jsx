import React, { useState } from 'react';
import { Container, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { LuUser2 } from "react-icons/lu";
import axios from 'axios';

const LoginForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let validationErrors = {};
        if (!formData.name) {
            validationErrors.name = 'Name is required';
        }
        if (!formData.email) {
            validationErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
            validationErrors.email = 'Email address is invalid';
        }
        if (!formData.password) {
            validationErrors.password = 'Password is required';
        }
        if (!formData.confirmPassword) {
            validationErrors.confirmPassword = 'Confirm Password is required';
        } else if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match';
        }
        return validationErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Fetch all users to check for existing email
            axios.get('https://66a1e9a6967c89168f1e00a0.mockapi.io/login-form')
                .then(response => {
                    const userExists = response.data.some(user => user.email === formData.email);
                    if (userExists) {
                        setErrors({ email: 'Email already exists' });
                    } else {
                        // Handle form submission
                        axios.post('https://66a1e9a6967c89168f1e00a0.mockapi.io/login-form', {
                            name: formData.name,
                            email: formData.email,
                            password: formData.password,
                        })
                            .then(response => {
                                console.log(response.data);
                                navigate("/user-list");
                            })
                            .catch(error => {
                                console.error('There was an error!', error);
                            });
                    }
                })
                .catch(error => {
                    console.error('There was an error fetching user data!', error);
                });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            <Container className="my-5">
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Name :</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text><LuUser2 /></InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </InputGroup>

                    <Form.Label>Email :</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text><TfiEmail /></InputGroup.Text>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </InputGroup>

                    <Form.Label>Password :</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text><RiLockPasswordLine /></InputGroup.Text>
                        <Form.Control
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Your Password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                        />
                        <InputGroup.Text style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </InputGroup>

                    <Form.Label>Confirm Password :</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text><RiLockPasswordLine /></InputGroup.Text>
                        <Form.Control
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Your Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            isInvalid={!!errors.confirmPassword}
                        />
                        <InputGroup.Text style={{ cursor: 'pointer' }} onClick={toggleConfirmPasswordVisibility}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                        </Form.Control.Feedback>
                    </InputGroup>

                    <Form.Group className="linkTag">
                        <Form.Check
                            required
                            name="terms"
                            label="I agree to the all Terms & Conditions"
                            isInvalid={!!errors.terms}
                            feedback={errors.terms}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Button type="submit" className="btn-blue2 my-3">Submit</Button>
                    </Form.Group>
                </Form>
            </Container>
        </>
    )
}

export default LoginForm;
