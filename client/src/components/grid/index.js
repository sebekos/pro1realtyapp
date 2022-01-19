import React from "react";
import { uuid } from "utils";
import Avatar from "img/avatar.jpg";
import { Loader } from "components";

// eslint-disable-next-line
import styles from "./styles.scss";

const index = ({ data, loading }) => {
  if (loading) return <Loader />;
  return (
    <div className="grid-container">
      <div className="grid">
        {data.map((o) => (
          <div key={uuid()} className="griditem">
            {o.info && <div className="griditem-hoverinfo">{o.info}</div>}
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
        ))}
      </div>
    </div>
  );
};

export default index;
