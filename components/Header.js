import { Navbar, Nav, Button, NavDropdown, Container } from 'react-bootstrap';
import { isAuthenticated, removeToken } from "../lib/authenticate";
import { useRouter } from "next/router";
import Link from 'next/link';
import { useAtom } from "jotai";
import { userInfoAtom } from "../store";

const Header = () => {
    //set userName global variable to show in header navbar
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);
    const router = useRouter();

    function logout() {
        removeToken();

        //clear the session storage value
        sessionStorage.removeItem('source');
        
        router.push("/");
    }

    return (
        <>
            <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Nav className="container-fluid">
                    <Navbar.Brand>
                        <Link href="/" style={{ color: "#f0f5fa", textDecoration: "none" }}>
                            ASMR Cleaning Service
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarColor01"
                        aria-expanded="false"
                        aria-label="Toggle navigation" />
                    <Navbar.Collapse id="navbarColor01">
                        <Nav className="navbar-nav me-auto">
                            <Nav.Item>
                                <NavDropdown title="About" id="basic-nav-dropdown">
                                    <NavDropdown.Item>
                                        <Link href="/about" style={{ textDecoration: "none" }}>About Us</Link></NavDropdown.Item>
                                    <NavDropdown.Item href="https://blog.nationwide.com/home/home-maintenance/how-to-clean-house-fast/">
                                        Blog
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="https://www.goodhousekeeping.com/home/cleaning/g2550/best-cleaning-tips/">
                                        Cleaning Tips
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="https://www.bhg.com/homekeeping/house-cleaning/tips/eco-friendly-cleaning-ideas/">
                                        Green Cleaning
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item>
                            <Nav.Item>
                                <NavDropdown title="Services" id="basic-nav-dropdown">

                                    <NavDropdown.Item>
                                        <Link style={{ textDecoration: "none" }} href="/service">All Service </Link>
                                    </NavDropdown.Item>

                                    <NavDropdown.Item>
                                        <Link style={{ textDecoration: "none" }} href="/service#house-cleaning">House Cleaning
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link style={{ textDecoration: "none" }} href="/service#movein-cleaning"> Move-in Cleaning
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link style={{ textDecoration: "none" }} href="/service#moveout-cleaning"> Move out Cleaning
                                        </Link></NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link style={{ textDecoration: "none" }} href="/service#green-cleaning"> Green Cleaning
                                        </Link></NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link>
                                    <Link style={{ color: "#f0f5fa", textDecoration: "none" }} href="/contactUs"> Contact us </Link> </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="ml-auto">
                                {!isAuthenticated() ? <Nav.Link href="/login">Login</Nav.Link> :
                                    <Nav.Item >
                                        <NavDropdown title={`Hi, ${userInfo.firstName}`} id="basic-nav-dropdown">
                                            {userInfo.role === "customer" && (<>
                                             <NavDropdown.Item>
                                                <Link style={{ textDecoration: "none" }} href="/customer/userHome"> Home Page </Link></NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link style={{ textDecoration: "none" }} href="/customer/residenceAddress">Address</Link></NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link style={{ textDecoration: "none" }} href="/customer/booking"> Booking</Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link style={{ textDecoration: "none" }} href="/profile"> Profile </Link></NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link style={{ textDecoration: "none" }} href="/customer/residence">Residence</Link></NavDropdown.Item>
                                            </>)}
                                            {userInfo.role !== "customer" &&(
                                            <NavDropdown.Item>
                                                <Link style={{ textDecoration: "none" }} href="/employee/userHome"> Home Page </Link></NavDropdown.Item>)}
                                            <NavDropdown.Item onClick={logout}> Logout</NavDropdown.Item>

                                        </NavDropdown>
                                    </Nav.Item>}
                            </Nav.Item>
                            <Nav.Item>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                    {userInfo.role === "customer" || !isAuthenticated() && (
                        <Nav.Item>
                            <Container className="d-grid gap-1">
                                <Link style={{ textDecoration: "none" }} href="/customer/residence">
                                    <Button className="btn btn-outline-success" >Get a free quote here</Button>
                                </Link>
                            </Container>
                        </Nav.Item>
                    )}
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </Nav >
            </Navbar >
        </>
    );
}
export default Header