import React from "react";
import { uuid } from "utils";
import moment from "moment";
import { Loader } from "components";

// eslint-disable-next-line
import styles from "./styles.scss";

const index = ({ rows, max, loading }) => {
  if (loading) return <Loader />;
  if (!loading && rows && rows.length === 0)
    return <div className="table-no-rows">No Upcoming Races</div>;
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Dates</th>
            <th>Race</th>
            <th>Location</th>
            <th>Results</th>
          </tr>
        </thead>
        <tbody>
          {rows &&
            rows.length > 0 &&
            rows.map((o) => (
              <tr key={uuid()}>
                <td>
                  {moment(o.startDate).format("l")} -{" "}
                  {moment(o.endDate).format("l")}
                </td>
                <td>{o.race}</td>
                <td>{o.location}</td>
                <td>{o.results}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default index;
