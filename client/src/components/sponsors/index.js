import React from "react";
import { uuid } from "utils";
import Sponsor1 from "img/sponsor1.jpg";
import Sponsor2 from "img/sponsor2.jpg";

// eslint-disable-next-line
import styles from "./styles.scss";

const sponsors = [
  {
    name: "Sponder1",
    logo: Sponsor1,
  },
  {
    name: "Sponsor2",
    logo: Sponsor2,
  },
];

const Sponsors = () => {
  return (
    <div className="sponsor-container">
      <div className="sponsors">
        {sponsors.map((o) => (
          <div key={uuid()} className="sponsor-img-container">
            <img className="sponsor-img" alt="sponsor" src={o.logo} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
