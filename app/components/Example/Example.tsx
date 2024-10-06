"use client";
import React from "react";
import { useState } from "react";
import styles from "./Example.module.scss";

export default function Example() {
  const [count, setCount] = useState(0);

  const exampleDecisions = [
    "How do my options weigh up?",
    "Sell my business?",
    "Which offer should I accept?",
    "Where should I go on holiday?",
    "Which home should I buy?",
    "Stay or relocate?",
    "What career path is best?",
  ];

  function showNextDecision() {
    if (count === exampleDecisions.length - 1) {
      setCount(0);
    } else {
      setCount((count) => count + 1);
    }
  }

  return (
    <div
      onAnimationIteration={showNextDecision}
      className={styles.exampleDecisions}
    >
      {exampleDecisions[count]}
    </div>
  );
}
