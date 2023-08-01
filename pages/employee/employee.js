import React, { useState, useEffect } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import IconTipName from "../../components/IconTipName";
import { FcSearch } from 'react-icons/fc';
import { AiTwotoneDelete } from "react-icons/ai";
import { getUsersByRole } from "../../lib/user";

const Employee = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [showModalD, setShowModalD] = useState(false);
    const [employeesUser, setEmployeesUser] = useState([]);

    const filteredEmployees = employeesUser.filter(employee => employee.firstName.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLocaleLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        async function fetEmployeesUser() {
            try {
                const data = await getUsersByRole("employee");
                setEmployeesUser(data.users);
            }catch (err) {
                console.error("Error fetching employee users: ", err);
            }
        }
        fetEmployeesUser();
    }, []);    

    const handleSearch = e => {
        setSearchTerm(e.target.value);
    }

    //hit Back button
    const handleRedirect = () => {
        router.push("/employee/userHome")
    }

    //store information about the previous page to use in next page
    const handlePreviousSession = () => {
        sessionStorage.setItem('source', 'managerE');
    }

    return (
        <>
            <Row>
                <Col className="col col-sm-7">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by employee name"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Col>
                <Col className="col col-sm-2" style={{ paddingTop: "10px" }}>
                    <Link style={{ textDecoration: "none" }} href='/register'>
                        <Button className="btn btn-outline-success btn-sm"
                            variant="primary"
                            style={{ padding: "10px", height: "40px", width: "180px" }}
                            type="submit"
                            onClick={handlePreviousSession}>
                            Create employee
                        </Button>
                    </Link>
                </Col>
                <Col className="col col-sm-2" style={{ paddingTop: "10px" }}>
                    <Button className="btn btn-outline-info btn-sm"
                        variant="primary"
                        style={{ padding: "10px", height: "40px", width: "180px" }}
                        onClick={handleRedirect}>
                        Back to Home Page
                    </Button>
                </Col>
            </Row>
            <br />
            <br />
            <Row>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map(employee => (
                            <tr key={employee._id}>
                                <td>{employee._id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Row>
            <br />

        </>
    );
}

export default Employee