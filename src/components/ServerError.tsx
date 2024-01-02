import React from "react";
import { handleRefresh } from "../lib/utils";

const nomalWeight = { fontWeight: 400 };

const ServerError = () => {
  return (
    <>
      <h1 style={nomalWeight}>서버 통신 이상</h1>
      <br />
      <h2 style={nomalWeight}>
        <p style={{ cursor: "pointer", color: "#666" }} onClick={handleRefresh}>
          재접속 하기
        </p>
      </h2>
    </>
  );
};

export default ServerError;
