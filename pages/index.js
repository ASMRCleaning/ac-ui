// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import React from "react"
import { Row, Col, Image } from 'react-bootstrap';
import HomePage from "../components/HomePage";

export default function Home() {
  return (
    <>
      {/* <Row>
        <Col>
          <figure>
            <blockquote class="blockquote">
              <p class="mb-0">The best house cleaning services in Toronto you always dreamed forAt AspenClean, your satisfaction is guaranteed.
                We carefully select and fully train our cleaning employees to make sure that your house cleaning service in Toronto is performed consistently, every time.
                Our professional maid and cleaning staff is insured and bonded, and your satisfaction is guaranteed. If you're not satisfied, let us know within 24 hours and
                we'll return to correct the issue promptly at no extra charge.We use only our own, natural cleaning products that leave no harmful chemical residues or
                unpleasant odours.  We have been perfecting our green cleaning services since 2004.
                We use a combination of green cleaning products that have been Ecocert certified and rated "A" by the Environmental Working Group together with microfiber cloths,
                Hepa filter vacuums and other earth friendly  supplies to ensure your satisfaction, every time.  We'll leave your home clean and fresh and ready for you to enjoy!
              </p>
            </blockquote>
          </figure>
          </Col>
          <Col>
            <Image fluid rounded src="/cleaning-homepage.jpg" /><br /><br />
        </Col>
      </Row> */}

      <HomePage/>
    </>
  )
}
