import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <Link to="/vote/1">
        <h1>1</h1>
      </Link>
      <Link to="/vote/2">
        <h1>2</h1>
      </Link>
    </>
  );
}
