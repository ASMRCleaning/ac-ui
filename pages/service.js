import React from "react";
import MainCard from "../components/MainCard";
import { Card, Container, Row } from "react-bootstrap";

const Service = () => {
    return (
        <>
            <MainCard title="We offer a wide variety of House Cleaning Services"
                body={`What do we include? ${"\n"}
                       Whether your house needs deep cleaning, you are moving or are simply looking for a regular maid cleaning service, ${"\n"}
                       ASMR Cleaning can help!`}
                src="/office-cleaning-service.jpg"
                alt="Office Cleaning service"
            />
            <br/>
            <Container className="fluid">
                <Row>
                    <Card id="house-cleaning">
                        <div style={{ display: 'flex' }}>
                            <Card.Img variant="top" src="/card-service-1.jpg" style={{ width: '40%' }} />
                            <Card.Body style={{ width: '50%' }}>
                                <Card.Header style={{ fontWeight: 'bold', fontSize: '2rem' }}>House Cleaning</Card.Header>
                                <Card.Text>
                                    Treat yourself and your house to a top-quality house cleaning service. Born out of a vision to create the best residential cleaning services, AspenClean delivers professional-grade house cleaning services without bringing any harmful chemicals into your home. Our trained teams use AspenClean green & organic cleaning products and eco friendly cloths exclusively, giving your house an all-natural zero waste shine that you can trust.
                                </Card.Text>
                            </Card.Body>
                        </div>
                    </Card>
                </Row>
                <br />
                <Row>
                    <Card id="movein-cleaning">
                        <div style={{ display: 'flex' }}>
                            <Card.Img variant="top" src="/card-service-2.jpg" style={{ width: '40%' }} />
                            <Card.Body style={{ width: '50%' }}>
                                <Card.Header style={{ fontWeight: 'bold', fontSize: '2rem' }}>Move-in</Card.Header>
                                <Card.Text>
                                    <br />
                                    With our Move-In cleaning service, our AspenClean team covers all of your cleaning needs. Carpets will be vacuumed and floors mopped. Bathrooms will be sanitized and sparkling. Your new (or old) kitchen will be made clean enough for your first meal. From countertops to closets, we’ll clean areas that you didn’t even know were dirty.
                                </Card.Text>
                            </Card.Body>
                        </div>
                    </Card>
                </Row>
                <br />
                <Row>
                    <Card id="moveout-cleaning">
                        <div style={{ display: 'flex' }}>
                            <Card.Img variant="top" src="/card-service-3.jpg" style={{ width: '40%' }} />
                            <Card.Body style={{ width: '50%' }}>
                                <Card.Header style={{ fontWeight: 'bold', fontSize: '2rem' }}>Move out</Card.Header>
                                <Card.Text>
                                    <br />
                                    If you’re moving, chances are high that you need to leave your former home spotless for a move-out inspection. And, of course, you’d love for your new space to be at your standard of cleanliness upon moving in.
                                    Whether you need one last clean in your former home, a fresh start at your new place, or both—our specially-trained team members provide eco-friendly cleaning services for an effortless move.
                                </Card.Text>
                            </Card.Body>
                        </div>
                    </Card>
                </Row>
                <br />
                <Row>
                    <Card id="green-cleaning">
                        <div style={{ display: 'flex' }}>
                            <Card.Img variant="top" src="/card-service-4.jpg" style={{ width: '175%' }} />
                            <Card.Body>
                                <Card.Header style={{ fontWeight: 'bold', fontSize: '2rem' }}>Green Cleaning</Card.Header>
                                <br/>
                                <Card.Title>All Natural Cleaners</Card.Title>
                                <Card.Text>
                                    <br />
                                    High-quality cleaning, low environmental impact
                                    Our customers are a testament to our commitment to quality work and environmental responsibility. With a 100% customer satisfaction guarantee to back up our service, you can rest assured knowing you get the best every time.
                                    <br />
                                    Our green cleaning products are made from 100% natural ingredients (all of which we list) derived from plants or minerals, and enhanced with organic essential oils for effective yet green cleaning power. Zero toxins, chemical residues or offensive odors allow for cleaner, healthier homes and a greener environment. And, each product in the AspenClean range comes Ecocert Certified, meaning all ingredients are listed and sourced from renewable resources.                               </Card.Text>
                            </Card.Body>
                        </div>
                    </Card>
                </Row>
            </Container>
        </>

    )
}

export default Service