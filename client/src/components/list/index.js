import React from "react";
import { uuid } from "utils";
import moment from "moment";
import { Loader } from "components";

// eslint-disable-next-line
import styles from "./styles.scss";

const index = ({ data, loading }) => {
  if (loading) return <Loader />;
  if (!loading && data && data.length === 0)
    return <div className="list-no-rows">Comeback later for news</div>;
  return (
    <div className="list-container">
      <div className="list">
        {data.map((o) => (
          <div key={uuid()} className="listitem">
            <div className="list-title">{o.title}</div>
            <div className="list-text">{o.text}</div>
            <div className="list-date">
              {moment(o.date, "YYYY-MM-DD").format("l")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;
