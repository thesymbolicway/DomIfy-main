import React from "react";
import Navbar from './Navbar'


function Header() {
  return (
    <>
      <section className="header">
        <div className="container">
          <section className="header-top">
            <section className="header-top__logo">
            
            <a href="/" className="header-logo">DOMify</a>
            </section>
            <section className="header-top__navbar">
              <section className="header-top__navigation">
                <Navbar />
              </section>
              <hr className="header-top__seperator" />
            </section>
          </section>
        </div>
      </section>
      <div className="header-spacer"></div>
    
    </>
  )
}

export default Header;
