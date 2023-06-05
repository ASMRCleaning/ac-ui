import React from "react";
import { Container, Row, Col, Card, Button, CardGroup } from "react-bootstrap";

const MainCard = (props) => {
  return (
    <>
      <div className="homepage-content">
        <Card className="mb-3" style={{ width: "100%" }}>
          <Card.Header>
            <h3 style={{ textAlign: "center", fontSize: "2.5rem" }}>
              {props.title}
            </h3>
          </Card.Header>
          <Card.Body>
            <p style={{ fontSize: "1.5rem", textAlign: "center" }}>
             {props.body}
            </p>
          </Card.Body>
          <Container fluid>
          <Row>
            <Col>
              <div style={{ position: "relative", paddingTop: "50.25%" }}>
                <img
                  src={props.src}
                  alt={props.alt}
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
                     href="/questionnaire"
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

export default MainCard