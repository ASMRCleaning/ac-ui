import React from "react";
import { Container, Row, Col, Card, Button, CardGroup } from "react-bootstrap";

const HomePage = () => {
  return (
    <>
      <div className="homepage-content">
        <Card className="mb-3" style={{ width: "100%" }}>
          <Card.Header>
            <h3 style={{ textAlign: "center", fontSize: "3.5rem" }}>
              House Cleaning Services: Toronto and GTA
            </h3>
          </Card.Header>
          <Card.Body>
            <p style={{ fontSize: "1.8rem", textAlign: "center" }}>
              Award-winning eco-friendly house cleaning service & Maid service
              in Toronto where your satisfaction is guaranteed! <br />
              We use only natural cleaning products for all home cleaning services.
            </p>
          </Card.Body>
          <Container fluid>
          <Row>
            <Col>
              <div style={{ position: "relative", paddingTop: "50.25%" }}>
                <img
                  src="/cleaning-homepage.jpg"
                  alt="Cleaning Services"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "5rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                  }}
                >
                  <Button
                    variant="outline-success"
                    style={{ fontSize: "2.5rem", padding: "1rem 2rem" }}
                  >
                    Get a free quote here
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        </Card>
        
      </div>
    </>
  );
};

export default HomePage