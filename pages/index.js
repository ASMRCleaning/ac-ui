import React from "react"
import MainCard from "../components/MainCard";
import { Container, Row, Card, Col } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <MainCard title="House Cleaning Services: Toronto and GTA"
        body={`Award-winning eco-friendly house cleaning service & Maid service
                       in Toronto where your satisfaction is guaranteed! ${"\n"}
                       We use only natural cleaning products for all home cleaning services.`}
        src="/home-page.jpg"
        alt="Cleaning Services" />
    <br/>
      <Container className="fluid">
        <Row>
            <Col>
          <Card id="home-products" style={{width:'25rem'}}>
              <Card.Img src="/home-products.jpg" style={{ width: '100%' }} />
              <Card.Body>
                <Card.Text style={{fontSize: "1.5rem"}}>
                  <h3>High-performance Green Cleaning with Heart</h3>
                </Card.Text>
              </Card.Body>
          </Card>
          </Col>
          <Col>
          <Card id="home-booking" style={{width:'25rem'}}>
              <Card.Img src="/home-search.jpg" style={{ width: '100%' }} />
              <Card.Body>
                <Card.Text style={{fontSize: "1.5rem"}}>
                  <h3>The easiest way to book a service</h3>
                </Card.Text>
              </Card.Body>
          </Card>
          </Col>
          <Col>
          <Card id="home-employees" style={{width:'25rem'}}>
              <Card.Img src="/home-employees.jpg" style={{ width: '100%' }} />
              <Card.Body>
                <Card.Text style={{fontSize: "1.5rem"}}>
                  <h3>High specialized team prepared for you</h3>
                </Card.Text>
              </Card.Body>
          </Card>
          </Col>
        </Row>
        </Container>
      </>
      )
}
