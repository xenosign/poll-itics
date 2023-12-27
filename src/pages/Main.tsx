import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Main.module.css";
import Header from "../components/Header";

export default function Main() {
  return (
    <>
      <div className={styles.body}>
        <Header />
        <Outlet />
      </div>
    </>
  );
}
