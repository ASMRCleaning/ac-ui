import React, { useState, useEffect } from "react";
import { Row, Col, Button, Pagination, Alert } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { getUsersByRole } from "../../lib/user";

const Employee = () => {
    const [page, setPage] = useState(1);
    const itemPerPage = 15;
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [employeesUser, setEmployeesUser] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const filteredEmployees = employeesUser.filter(employee => employee.firstName.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLocaleLowerCase().includes(searchTerm.toLowerCase())
    );

    //if get a huge list of visits divide in page with 5 items
    const totalPages = Math.ceil(filteredEmployees.length / itemPerPage);

    const startIndex = (page - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;

    const pagesEmployees = filteredEmployees.slice(startIndex, endIndex);

    useEffect(() => {
        async function fetEmployeesUser() {
            try {
                const data = await getUsersByRole("employee");
                setEmployeesUser(data.users);
            } catch (err) {
                console.error("Error fetching employee users: ", err);
                setErrorMessage("Something went wrong while deleting the booking. Please try again later.");
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
            <Row style={{ marginTop: "50px" }}>
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
            {errorMessage && <Alert className="col col-sm-6" style={{ marginLeft: '350px' }} variant="danger">{errorMessage}</Alert>}
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
                        {pagesEmployees.map(employee => (
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
                <Pagination>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item key={index + 1} active={index + 1 === page} onClick={() => setPage(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </Row>
            <br />

        </>
    );
}

export default Employee