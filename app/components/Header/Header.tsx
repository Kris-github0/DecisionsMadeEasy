import React from "react";
import CardGroup from "../CardGroup/CardGroup";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header>
      <h1 className={styles.mainHeading}>DecisionsMadeEasy</h1>
      <CardGroup />
    </header>
  );
}
