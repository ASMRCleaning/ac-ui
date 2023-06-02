// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import React from "react"
import { Row, Col, Image } from 'react-bootstrap';
import MainCard from "../components/MainCard";

export default function Home() {
  return (
    <>
      <MainCard title="House Cleaning Services: Toronto and GTA" 
                body={`Award-winning eco-friendly house cleaning service & Maid service
                       in Toronto where your satisfaction is guaranteed! ${"\n"}
                       We use only natural cleaning products for all home cleaning services.`}
                src="/cleaning-homepage.jpg"
                alt="Cleaning Services"/>
    </>
  )
}
