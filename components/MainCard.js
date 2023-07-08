import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { isAuthenticated } from "../lib/authenticate";

const MainCard = (props) => {
  const router = useRouter();
  const userFound = isAuthenticated();

    // Store where the redirect login page comes from to then redirect to correct page
  const handleSourceRedirect = () => {
    sessionStorage.setItem('source', 'questionnaire');

    if (userFound) { router.push('/residence'); }
    else { router.push('/login'); }

  };

  return (
    <>
      <Card className="col-lg-12" style={{ width: "100%" }}>
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
                      onClick={handleSourceRedirect}>
                      Get a free quote here
                    </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Card>
    </>
  );
};

export default MainCard