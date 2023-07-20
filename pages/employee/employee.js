import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userInfoAtom } from "../../store";

const customers = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
    { id: 3, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com' },
];

const Employee = () => {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState('');
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);
    const filteredCustomers = customers.filter(customer => customer.firstName.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.lastName.toLocaleLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = e => {
        setSearchTerm(e.target.value);
    }

    //hit Back button
    const handleRedirect = () => {
        userInfo.role === "customer" ? router.push("/userHome") : router.push("/employee/userHome")
    }

    return (
        <>
            <Row>
                <Col className="col col-sm-7">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by customer name"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Col>
                <Col className="col col-sm-2" style={{ paddingTop: "10px" }}>
                    <Button className="btn btn-outline-success btn-sm"
                        variant="primary"
                        style={{ padding: "10px", height: "40px", width: "180px" }}>
                        Search
                    </Button>
                </Col>
                <Col className="col col-sm-2" style={{ paddingTop: "10px" }}>
                    <Link style={{ textDecoration: "none" }} href='/register'>
                        <Button className="btn btn-outline-info btn-sm"
                            variant="primary"
                            style={{ padding: "10px", height: "40px", width: "180px" }}>
                            Create Employee
                        </Button>
                    </Link>
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
                            <th>email</th>
                            <th>  </th>
                            <th> </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map(customer => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.firstName}</td>
                                <td>{customer.lastName}</td>
                                <td>{customer.email}</td>
                                <td>
                                    <Link href='/profile'>
                                        <Button className='btn btn-outline-primary' variant="link" style={{ textDecoration: "none", width: '100px' }}>Edit</Button>
                                    </Link>
                                </td>
                                <td>
                                    <Button className='btn btn-outline-primary' variant="link" style={{ textDecoration: "none" }}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Row>
            <br/>
            <Row >
                <Col className="flex" style={{justifyContent: "flex"}}>
                    <Button variant="primary"
                        className="btn btn-outline-info"
                        onClick={handleRedirect}
                        style={{ padding: "15px", margin: "10px", marginLeft:"250px",  width: "50%" }}> Back to Home Page</Button>
                </Col>
            </Row>
        </>
    );
}

export default Employee