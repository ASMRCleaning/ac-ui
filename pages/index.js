import React from "react"
import MainCard from "../components/MainCard";

export default function Home() {
  return (
    <>
      <MainCard title="House Cleaning Services: Toronto and GTA" 
                body={`Award-winning eco-friendly house cleaning service & Maid service
                       in Toronto where your satisfaction is guaranteed! ${"\n"}
                       We use only natural cleaning products for all home cleaning services.`}
                src="/home-page.jpg"
                alt="Cleaning Services"/>
    </>
  )
}
