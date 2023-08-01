import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import IconTipName from "../../components/IconTipName";
import { FcHome } from 'react-icons/fc';
import { FaAddressBook } from 'react-icons/fa';
import { getUsersByRole } from "../../lib/user";
import { useAtom } from "jotai";
import { viewInfoAtom } from "../../store";

const Customer = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [customersUser, setCustomersUser] = useState([]);
    const [viewInfo, setViewInfo] = useAtom(viewInfoAtom);

    const filteredCustomers = customersUser.filter(customer => customer.firstName.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.lastName.toLocaleLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        async function fetCustomersUser() {
            try {
                const data = await getUsersByRole("customer");
                setCustomersUser(data.users);
            }
            catch (err) {
                console.error("Error fetching customer users: ", err);
            }
        }
        fetCustomersUser();
    }, []);

    const handleSearch = e => {
        setSearchTerm(e.target.value);
    }

    //hit Back button
    const handleSession = () => {
        sessionStorage.setItem('source', 'managerC');
    }

    const handleResidence = async (customerId, code) => {
        try {
            setViewInfo(code); // 0 - show residence info, 1 - show address info
            sessionStorage.setItem('source', 'managerC');
            router.push(`/employee/${customerId}`);
        }
        catch (err) {
            console.error("Error to redirect to residence page: ", err);
        }
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
                    <Link style={{ textDecoration: "none" }} href='/register' onClick={handleSession}>
                        <Button className="btn btn-outline-success btn-sm"
                            variant="primary"
                            style={{ padding: "10px", height: "40px", width: "180px" }}
                            type="submit">
                            Create customer
                        </Button>
                    </Link>
                </Col>
                <Col className="col col-sm-2" style={{ paddingTop: "10px" }}>
                    <Link style={{ textDecoration: "none" }} href="/employee/userHome">
                        <Button className="btn btn-outline-info btn-sm"
                            variant="primary"
                            style={{ padding: "10px", height: "40px", width: "180px" }}>
                            Back to Home Page
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
                            <th>Customer ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>email</th>
                            <th> Phone </th>
                            <th> </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map(customer => (
                            <tr key={customer._id}>
                                <td>{customer._id}</td>
                                <td>{customer.firstName}</td>
                                <td>{customer.lastName}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>
                                    <IconTipName Icon={FcHome} size={30} name="Residence" onClick={() => handleResidence(customer._id, 0)} />
                                </td>
                                <td>
                                    <IconTipName Icon={FaAddressBook} size={30} name="Address" onClick={() => handleResidence(customer._id, 1)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Row>
            <br />
        </>
    );
}


export default Customer