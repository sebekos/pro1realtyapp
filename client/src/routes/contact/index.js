import React from "react";
import { Cover, Bar, GenericButton } from "components";
import LandingImg from "img/landing.jpg";

// eslint-disable-next-line
import styles from "./styles.scss";

const ContactUs = ({ setForm }) => {
  return (
    <>
      <Cover text="CONTACT" src={LandingImg} />
      <Bar title="CONTACT" />
      <div className="barContainer">
        <div className="bar">
          <div className="left">
            6900 Main St. Suite #153 <br />
            Downers Grove, IL 60516 <br />
            <a href="tel:630-297-8088" style={{ fontWeight: "bold" }}>
              (630) 297-8088
            </a>
            <br />
            pro1realtyinc@gmail.com
          </div>
        </div>
        <div className="contact-btn-container">
          <a href="tel:630-297-8088" style={{ fontWeight: "bold" }}>
            <GenericButton label="Call Us Today" />
          </a>
        </div>
        <div className="gmap_canvas">
          <iframe
            title="map"
            className="iframe"
            id="gmap_canvas"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2976.0590717582577!2d-88.01109198456253!3d41.7623841792315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e4fe08ddaaaab%3A0x4a6ff28b8ab9a40e!2s6900%20Main%20St%20%23153%2C%20Downers%20Grove%2C%20IL%2060516!5e0!3m2!1sen!2sus!4v1642552078202!5m2!1sen!2sus"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
