import React from "react";
import styles from "./CardGroup.module.scss";

export default function Card({ text }) {
  return <div className={styles.card}>{text}</div>;
}
