import React, { useState } from "react";
import Avatar from "img/avatar.jpg";
import { Loader } from "components";

// eslint-disable-next-line
import styles from "./styles.scss";

const GridItem = ({ o }) => {
  const [show, setShow] = useState(false);
  console.log("show", show);
  return (
    <div className="griditem">
      <div className="griditem-info-icon-container">
        <div onClick={() => setShow(!show)} className="griditem-info-icon">
          &#9432;
        </div>
      </div>
      {o.info && show && <div className="griditem-hoverinfo">{o.info}</div>}
      <div className="griditem-img-container">
        <img
          className="griditem-img"
          alt="griditem"
          src={o.avatar_link ? o.avatar_link : Avatar}
        />
      </div>
      <div className="griditem-info">
        {o.firstName || o.lastName ? (
          <div className="griditem-info1">
            {o.firstName} {o.lastName}
          </div>
        ) : null}
        <div className="griditem-info2">{o.title}</div>
      </div>
    </div>
  );
};

const Grid = ({ data, loading }) => {
  if (loading) return <Loader />;
  return (
    <div className="grid-container">
      <div className="grid">
        {data.map((o) => (
          <GridItem key={`griditem-${o.id}`} o={o} />
        ))}
      </div>
    </div>
  );
};

export default Grid;
