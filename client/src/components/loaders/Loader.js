import React from "react";
import LoaderGif from "img/loader.gif";

// eslint-disable-next-line
import styles from "./styles.scss";

const Loader = () => {
  return (
    <div className="loader-container">
      <img className="loader-gif" alt="loading..." src={LoaderGif} />
    </div>
  );
};

export default Loader;
