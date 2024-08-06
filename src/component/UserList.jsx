import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DataTable from './DataTable';

const UserList = () => {
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [tableDark, setTableDark] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    function getData() {
        axios.get("https://66a1e9a6967c89168f1e00a0.mockapi.io/login-form")
            .then(response => {
                setData(response.data);
                setCurrentData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function handleDelete(id) {
        axios.delete(`https://66a1e9a6967c89168f1e00a0.mockapi.io/login-form/${id}`)
            .then(() => {
                getData();
            })
            .then(() => {
                console.log('User deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting data:', error);
            });
    }

    const setToLocalStorage = (id, name, email, password) => {
        localStorage.setItem("id", id);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
    }

    useEffect(() => {
        getData();
    }, []);

    const applySearch = (inputSearch) => {
        const filteredData = data.filter(el => {
            if (el.name.toLowerCase().includes(inputSearch.toLowerCase()) || el.email.toLowerCase().includes(inputSearch.toLowerCase())) {
                return el;
            }
            return null;
        });
        setCurrentData(filteredData);
    }

    const applyPagination = (tempData) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return tempData.slice(startIndex, startIndex + itemsPerPage);
    }

    return (
        <>
            <Container className="py-5">
                <Form>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        onChange={() => setTableDark(!tableDark)}
                        label={tableDark ? "Dark Mode" : "Light Mode"}
                    />
                </Form>
                <div className="d-flex justify-content-between my-3">
                    <h2>User List</h2>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control type="search" placeholder="Search here" onChange={(e) => { applySearch(e.currentTarget.value) }} />
                        </Form.Group>
                    </Form>
                    <Link to={"/"} ><Button className="btn-secondary">Create User</Button></Link>
                </div>
                <Table className={`table ${tableDark ? "table-dark" : ""}`}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <DataTable
                            data={applyPagination(currentData)}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            handleDelete={handleDelete}
                            setToLocalStorage={setToLocalStorage}
                        />
                    </tbody>
                </Table>
                <div className="d-flex justify-content-between">
                    <Button onClick={() => { setCurrentPage(currentPage - 1); }} disabled={currentPage === 1}>Previous</Button>
                    <Button onClick={() => { setCurrentPage(currentPage + 1); }} disabled={currentPage * itemsPerPage >= data.length}>Next</Button>
                </div>
            </Container>
        </>
    )
}

export default UserList;
