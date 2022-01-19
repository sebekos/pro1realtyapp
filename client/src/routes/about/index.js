import React from "react";
import Cover from "./Cover";
import About from "./About";
import Schedule from "./Schedule";
import { Sponsors } from "components";

// eslint-disable-next-line
import styles from "./style.scss";

const index = () => {
  return (
    <div>
      <Cover />
      {/* <Sponsors /> */}
      <About />
      <Schedule />
    </div>
  );
};

export default index;
