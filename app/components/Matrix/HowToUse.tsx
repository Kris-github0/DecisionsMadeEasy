import React from "react";
import styles from "./Matrix.module.scss";

export default function HowToUse() {
  return (
    <section className={styles.htuContainer}>
      <h2 className={styles.htuHeading}>How To Use</h2>
      <ol className={styles.guideSteps}>
        <li>Add the options you wish to compare to the table.</li>
        <li>Add the factors relevant to the decision.</li>
        <li>Rate each factor's relative importance to the decision.</li>
        <li>Rate each option based on how well it matches each factor.</li>
        <li>Choose the option with the highest total.</li>
      </ol>

      <aside>
        <p>Note:</p>
        <ul className={styles.notes}>
          <li>
            • 1 is the <span>lowest</span> rating, 10 is the{" "}
            <span>highest</span> rating.
          </li>
          <li>
            • A <span>minimum</span> of two choices is needed to determine which
            is best.
          </li>
          <li>
            • This tool is only as useful as your honesty,{" "}
            <span>dishonest scores = useless results.</span>
          </li>
        </ul>
      </aside>
    </section>
  );
}
