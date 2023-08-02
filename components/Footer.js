import React from "react";
import { BsFacebook, BsYoutube, BsInstagram } from "react-icons/bs"

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <footer style={{ display: "flex", justifyContent: "space-between",  zIndex: 1, }}>
        <table size="sm">
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>&nbsp;Follow us</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: "left" }}>
                <a href="https://www.facebook.com/learnbuildteach/" className="facebook social">
                  <BsFacebook size={20} />
                </a>
                <a href="https://www.facebook.com/learnbuildteach/" className="youtube social">
                  <BsYoutube size={20} />
                </a>
                <a href="https://www.facebook.com/learnbuildteach/" className="youtube social">
                  <BsInstagram size={20} />
                </a>
              </td>
            </tr>
            <tr>
              <td style={{ verticalAlign: "bottom" }}>
                <p>{`Copyright © ASMR Cleaning Service ${year}`}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <table size="me-auto">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>ASMR CLEANING SERVICE LTD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: "center" }}>
                <p>
                  1750 Finch Ave E, North York, ON M2J 2X5 <br />
                  Hours: 08h00 a.m. 5 p.m <br />
                  Phone (416) 491-5050
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <table size="sm">
          <thead>
            <tr>
              <th style={{ verticalAlign: "bottom" }}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ verticalAlign: "bottom" }}>
                <img alt="Logo" src="/logo-company.jpg" width="100" height="100" className="d-inline-block align-center" />
              </td>
            </tr>
          </tbody>
        </table>
      </footer>
    </>
  )
}

export default Footer