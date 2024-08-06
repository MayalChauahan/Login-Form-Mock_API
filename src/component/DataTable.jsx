import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const DataTable = ({ data,currentPage,itemsPerPage, handleDelete, setToLocalStorage }) => {
    return (
        <>
            {data.map((eatchData, index) => {
                const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
                return (
                    <>
                        <tr key={index}>
                            <td>{globalIndex}</td>
                            <td>{eatchData.name}</td>
                            <td>{eatchData.email}</td>
                            <td>{eatchData.password}</td>
                            <td>
                                <Link to={"/update"}>
                                    <Button
                                        className="btn-success"
                                        onClick={() => setToLocalStorage(eatchData.id, eatchData.name, eatchData.email)}>
                                        Edit
                                    </Button>
                                </Link>
                                <Button className="btn-danger ms-4" onClick={() => handleDelete(eatchData.id)}>Delete</Button>
                            </td>
                        </tr>
                    </>
                )
            })
            }
        </>
    )
}

export default DataTable