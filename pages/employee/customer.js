import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { FcHome, FcSearch } from 'react-icons/fc';
import { FaAddressBook } from 'react-icons/fa';
import IconTipName from "../../components/IconTipName";

const customers = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
    { id: 3, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com' },
];

const Customer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [resModal, setResModal] = useState(null);

    const filteredCustomers = customers.filter(customer => customer.firstName.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.lastName.toLocaleLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = e => {
        setSearchTerm(e.target.value);
    }

    //hit Back button
    const handleRedirect = () => {
        router.push("/employee/userHome")
    }

    //store information about the previous page to use in next page
    const handlePreviousSession = () => {
        sessionStorage.setItem('source', 'managerC');
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
                    <Link style={{ textDecoration: "none" }} href='/register'>
                        <Button className="btn btn-outline-success btn-sm"
                            variant="primary"
                            style={{ padding: "10px", height: "40px", width: "180px" }}
                            type="submit"
                            onClick={handlePreviousSession}>
                            Create customer
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
                            <th>Customer ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>email</th>
                            <th> </th>
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
                                    <Link href='/profile' onClick={handlePreviousSession}>
                                        <IconTipName Icon={FcSearch} size={30} name="Details" />
                                    </Link>
                                </td>
                                <td>
                                    <Link href='/residence' onClick={handlePreviousSession}>
                                        <IconTipName Icon={FcHome} size={30} name="Residence" />
                                    </Link>
                                </td>
                                <td>
                                    <Link href='/residenceAddress' onClick={handlePreviousSession}>
                                        <IconTipName Icon={FaAddressBook} size={30} name="Address"/>
                                    </Link>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </Row>
        </>
    );
}


export default Customer