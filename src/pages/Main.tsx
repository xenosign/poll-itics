import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Main.module.css";
import Header from "../components/Header";

export default function Main() {
  return (
    <>
      <Header />
      <div className={styles.body}>
        <Outlet />
      </div>
    </>
  );
}
