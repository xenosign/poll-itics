import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Main.module.css";

export default function Main() {
  return (
    <>
      <div className={styles.body}>
        <Outlet />
      </div>
    </>
  );
}
