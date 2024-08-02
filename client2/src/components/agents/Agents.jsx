import React, { useEffect } from "react";
import { TitleBar, TopImage } from "../";
import { useSelector, useDispatch } from "react-redux";
import { getAgents } from "../../reduxToolKit/mainSlice";

const Agents = () => {
  const main = useSelector((state) => state.main);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAgents());
  }, []);
  console.log("main", main);
  return (
    <div>
      <TopImage />
      <TitleBar />
    </div>
  );
};

export default Agents;
