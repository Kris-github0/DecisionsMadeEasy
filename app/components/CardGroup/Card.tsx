import React from "react";
import styles from "./CardGroup.module.scss";

export default function Card({ text, icon }) {
  return (
    <div className={styles.card}>
      {icon}
      {text}
    </div>
  );
}
