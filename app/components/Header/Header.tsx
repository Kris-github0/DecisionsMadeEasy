import React from "react";
import Example from "../Example/Example";
import CardGroup from "../CardGroup/CardGroup";
import styles from "./Header.module.scss";
import Typewriter from "./typewriter";

export default function Header() {
  return (
    <div className={styles.headerWrapper}>
      <header>
        <h1 className={styles.mainHeading}>DecisionsMadeEasy</h1>
        <div className={styles.typewriterContainer}>
          <span>For </span>
          <Typewriter
            options={{
              strings: ["Entrepreneurs", "Decision Makers", "Humans"],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <div className={styles.midHeader}>
          <div className={styles.tagline}>
            <p>
              Choose a better tomorrow, <span>today</span>.
            </p>
          </div>
          <Example />
        </div>
        <button className={styles.cta}>Get Started</button>
        <CardGroup />
      </header>
    </div>
  );
}
