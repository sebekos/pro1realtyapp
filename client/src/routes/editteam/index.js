import React from "react";
import AddMember from "./AddMember";
import Members from "./Members";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const index = ({ isAuth }) => {
  if (!isAuth) return <Navigate to="/login" />;
  return (
    <>
      <AddMember />
      <Members />
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, null)(index);
