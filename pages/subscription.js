import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FcSearch, FcEditImage } from "react-icons/fc"
import { AiTwotoneDelete } from "react-icons/ai";
import IconTipName from "../components/IconTipName";
import Link from "next/link";
import { useAtom } from "jotai";
import { userInfoAtom } from "../store";
import { useRouter } from "next/router";

const customers = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', start_date: '01/08/2023', end_date: '01/08/2023', service: 'Green Cleaning' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', start_date: '01/08/2023', end_date: '01/08/2023', service: 'Cleaning' },
    { id: 3, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', start_date: '01/08/2023', end_date: '01/08/2023', service: 'Deep Cleaning' },
];

const Subscription = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    //global variable from store.js
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
                    {/* <Link href="/register"> */}
                        <Button variant="primary" className="btn btn-outline-success btn-sm" style={{ padding: "10px", height: "40px", width: "180px" }} type="submit">
                            Create Subscription
                        </Button>
                    {/* </Link> */}
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
                            <th> Subscription ID </th>
                            <th> First Name </th>
                            <th> Last Name </th>
                            <th> Service </th>
                            <th> Start Date </th>
                            <th> End Date </th>
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
                                <td>{customer.service}</td>
                                <td>{customer.start_date}</td>
                                <td>{customer.end_date}</td>
                                <td>
                                    <IconTipName Icon={FcSearch} size={30} name="Details" />
                                </td>
                                <td>
                                    <IconTipName Icon={FcEditImage} size={30} name="Edit" />
                                </td>
                                <td>
                                    <IconTipName Icon={AiTwotoneDelete} size={30} name="Delete" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Row>
        </>
    );
}

export default Subscription