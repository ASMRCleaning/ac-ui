import React from "react";
import { Card, Button, Container, Image } from "react-bootstrap";

const About = () => {
    return (
        <>
            <h3 style={{ textAlign: "center", fontSize: "3.5rem" }}>About ASMR Cleaning </h3>
            <Container className="col-lg-12 bg-secondary">
                <Image src="/about-us.jpg"
                    alt="About Us" style={{
                        // alignItems: "center",
                        top: 100,
                        left: -50,
                        width: "100%",
                        height: "80%",
                        objectFit: "cover", zIndex: 1,
                    }} />
            </Container>
            <br />
            <Card className="bg-light mb-12" style={{ paddingTop: "0.5rem", paddingLeft: "1rem", paddingBottom: "05.rem", margin: ".5rem" }}>
                <Card.Body style={{ fontSize: "1.3rem" }} > Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur molestie in justo id finibus. Etiam vel mauris id eros porttitor sagittis et ultricies lectus. Integer nec orci semper, finibus nibh sit amet, condimentum dolor. Vestibulum viverra pellentesque mauris, ac ultricies ligula semper ac. Cras quis eleifend augue, convallis aliquam erat. Etiam tempus velit eget neque feugiat pellentesque vitae a velit. Duis pellentesque ut tortor facilisis volutpat. Praesent condimentum orci sit amet eros lobortis vehicula. Sed vulputate consectetur leo, id pellentesque justo sodales accumsan. Phasellus in mi in turpis sagittis mollis at vel turpis. Morbi porta lorem id aliquet malesuada. Nam posuere malesuada quam at congue. Fusce at finibus dui.

                    Nullam nec cursus mauris. Nam nulla ex, auctor sed auctor id, gravida commodo tortor. Cras at rhoncus dolor, eget ultricies nisl. Nam vitae risus sed sem vulputate facilisis fermentum vel velit. In bibendum varius blandit. Quisque tincidunt tristique tellus, sed ornare neque pulvinar a. Ut vel imperdiet ex. Duis eleifend augue non ante mattis mollis. Phasellus lacinia ligula ac porttitor fermentum. Morbi in massa nec felis euismod scelerisque nec in velit. Vestibulum lacinia arcu in odio interdum hendrerit quis non dui. Phasellus ultricies velit sit amet lorem pharetra ullamcorper. Mauris imperdiet neque ac nibh maximus blandit. Fusce congue pretium condimentum. Sed rutrum dapibus nisl in efficitur. Quisque ante diam, laoreet sed faucibus sit amet, pulvinar eget lectus.

                    Aenean venenatis, enim sed condimentum consequat, ante lorem vulputate odio, non laoreet risus leo a velit. Maecenas dui urna, volutpat non sem ultrices, varius lobortis nisi. Ut faucibus suscipit lorem sit amet elementum. Phasellus at magna sed sem tempus dictum. Nullam tempus bibendum sodales. Donec efficitur accumsan metus, ac feugiat erat. Nulla auctor dolor vel nibh mattis posuere. Phasellus sit amet mauris metus. Cras a felis porttitor, eleifend libero vitae, maximus justo.

                    Curabitur pretium tempus orci, posuere mattis erat vestibulum quis. Nam venenatis libero eu urna luctus, sit amet cursus dolor lobortis. Donec tempor et purus in sagittis. Phasellus porta mattis varius. Ut blandit, purus in vehicula auctor, ligula dui eleifend nisi, vel iaculis urna libero id velit. Proin id neque ligula. Nulla mi ex, facilisis ac aliquet vitae, semper a arcu. Vivamus at faucibus diam, eu feugiat nunc. Fusce condimentum ultrices tellus, a efficitur orci condimentum id. Donec a maximus nunc. Sed ligula neque, euismod sed nisi in, ultrices venenatis est. Sed euismod dignissim hendrerit.

                    Nulla ut ante ultrices, elementum massa at, aliquam risus. Ut accumsan, nulla ac ultrices bibendum, lacus lectus venenatis justo, vitae ullamcorper ipsum justo ut ex. Pellentesque tempus erat lectus, sed condimentum mi consequat id. Aenean malesuada imperdiet venenatis. Sed feugiat, augue ac semper pretium, neque augue dapibus lorem, eu semper risus urna a turpis. In bibendum felis odio, id sagittis erat suscipit vitae. Suspendisse eget metus arcu. Cras a nisl nec nunc gravida condimentum. Integer volutpat gravida elit, a condimentum enim fringilla vel. Curabitur interdum orci ut turpis eleifend interdum. Mauris egestas consectetur massa, ut feugiat mauris feugiat sit amet. Vivamus faucibus elit a leo suscipit vestibulum.
                    <Card.Body style={{textAlign: "center"}}><h2>Get to know our specialist team that will care of your house  </h2> 
                        <Container>
                        <Button variant="secondary" className="btn-outline-success">Meet our Team</Button>
                        </Container>
                    </Card.Body>
                </Card.Body>
            </Card>
        </>
    );
}

export default About