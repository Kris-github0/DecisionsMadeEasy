import React from "react";
import Card from "./Card";
import { icons } from "./CardIcons";
import styles from "./CardGroup.module.scss";

export default function CardGroup() {
  return (
    <div className={styles.cardContainer}>
      <section>
        <Card text="Bring clarity to big decisions" icon={icons[0]} />
        <Card text="Measure what matters" icon={icons[1]} />
        <Card text="Combine data with intuition" icon={icons[2]} />
      </section>
    </div>
  );
}
