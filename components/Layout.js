import React from "react";
import Header from "./Header"
import Footer from "./Footer"
import { Container } from "react-bootstrap";

const Layout = (props) => {
    return (
        <>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Header />
          <Container style={{ flex: 1 }}>{props.children}</Container>
          <Footer />
        </div>
      </>
    );
};

export default Layout