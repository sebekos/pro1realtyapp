import React, { useEffect } from "react";
import { TitleBar, TopImage, Loader } from "../";
import { useSelector, useDispatch } from "react-redux";
import { getAgents } from "../../reduxToolKit/mainSlice";
import Agent from "./Agent";
import "./styles.css";

const Agents = () => {
  const { agents, agentsLoading } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAgents());
  }, []);
  return (
    <div className="agents-page-container">
      <TopImage />
      <TitleBar text="Our Agents" />
      {agentsLoading ? (
        <Loader />
      ) : (
        <div className="agents-container">
          {agents.map((agent, i) => (
            <Agent key={`agent-key-${i}`} data={agent} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Agents;
