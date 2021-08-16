import React from "react";
import Profile from "features/Profile";
import { useSelector } from "react-redux";
import loading from "assets/image/loading.svg";

function Student() {
  const isLoading = useSelector((state) => state.user.loading);
  if (!isLoading) return <Profile />;
  else
    return (
      <div className="userloading">
        <img src={loading} className="loading" alt="loading" />
      </div>
    );
}

export default Student;
