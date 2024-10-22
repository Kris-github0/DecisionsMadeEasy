"use client";

import React from "react";
import HowToUse from "./HowToUse";
import styles from "./Matrix.module.scss";
import { AddIcon, DeleteIcon, strDeleteIcon } from "./Icons";

export default function Matrix() {
  function addFactor() {
    const tableHeader = document.getElementById("optionsList");
    const tableBody = document.querySelector("tbody");
    const numInputEl = `<td><input type="number" value="" min="1" max="10" class="${styles.numberChange}" onwheel="this.blur()"/></td>`;
    const numToFillRow = tableHeader.childElementCount - 1;
    const defaultName = `Factor ${tableBody.childElementCount + 1}`;

    const fragment = new DocumentFragment();
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
              <button class="${styles.deleteButton}">${strDeleteIcon}</button>
              <input type="text" value="${defaultName}" class="${
      styles.nameChange
    }"/>
            </td>
            ${numInputEl.repeat(numToFillRow)}
          `;
    row.setAttribute("class", styles.factorRow);
    fragment.append(row);
    tableBody.append(fragment);

    calculateTotals();
  }

  function deleteFactor(e) {
    const FACTOR_COUNT = e.currentTarget.children.length;

    if (e.target.tagName !== "BUTTON" || FACTOR_COUNT === 1) {
      return;
    }

    const factor = e.target.parentElement.parentElement;
    factor.remove();

    calculateTotals();
  }

  function addOption() {
    const tableHeader = document.getElementById("optionsList");
    const tableBody = document.querySelector("tbody");
    const totalsRow = document.getElementById("total");
    const defaultName = `Option ${tableHeader.childElementCount - 1}`;

    const fragment = new DocumentFragment();
    const option = document.createElement("th");
    option.innerHTML = `<button class="${styles.deleteButton}">${strDeleteIcon}</button><input type="text" value="${defaultName}" class="${styles.nameChange}"/>`;
    option.setAttribute("class", styles.option);
    tableBody.childNodes.forEach((row) => {
      const cell = document.createElement("td");
      cell.innerHTML = `<input type="number" value="" min="1" max="10" class="${styles.numberChange}" onwheel="this.blur()"/>`;
      row.appendChild(cell);
    });

    fragment.append(option);
    tableHeader.append(fragment);
    totalsRow.append(document.createElement("td"));

    const OPTION_COUNT = tableHeader.childElementCount - 2;
    setOptionsHeadingColSpan(OPTION_COUNT);

    calculateTotals();
  }

  function deleteOption(e) {
    let optionCount = e.currentTarget.children.length - 2;

    if (e.target.tagName !== "BUTTON" || optionCount === 2) {
      return;
    }

    let index = getOptionIndex(e);
    const option = e.target.parentElement;

    option.remove();
    optionCount--;
    removeAllOptionCells(index);
    setOptionsHeadingColSpan(optionCount);

    calculateTotals();
  }

  function setOptionsHeadingColSpan(x) {
    const optionsHeading = document.querySelector("#optionsHeading");
    optionsHeading.setAttribute("colspan", `${x}`);
  }

  function getOptionIndex(e) {
    let index;
    const option = e.target.parentElement;
    const optionsRow = e.target.parentElement.parentElement;

    for (let i = 0; i < optionsRow.childElementCount; i++) {
      if (optionsRow.children[i] === option) {
        index = i;
      }
    }

    return index;
  }

  function removeAllOptionCells(cellIndex) {
    const tableBody = document.querySelector("tbody");

    for (let i = 0; i < tableBody.children.length; i++) {
      tableBody.children[i].children[cellIndex].remove();
    }
  }

  function validNum(num) {
    if (
      Number(num) <= 0 ||
      Number(num) > 10 ||
      !Number.isInteger(Number(num)) ||
      num[0] === "0" ||
      num.length >= 3
    ) {
      return false;
    }
    return true;
  }

  function calculateTotals() {
    const tableBody = document.querySelector("tbody");
    const numOfOptions = tableBody.children[0].children.length - 2;
    const totals = new Array(numOfOptions).fill(0);
    const totalsRow = document.getElementById("total");

    for (let i = 0; i < tableBody.children.length; i++) {
      for (let j = 2; j < tableBody.children[i].children.length; j++) {
        const weight =
          tableBody.children[i].children[1].firstElementChild.value;
        const score = tableBody.children[i].children[j].firstElementChild.value;

        if (weight === "" || !validNum(weight)) {
          break;
        }

        if (score === "" || !validNum(score)) {
          continue;
        }

        totals[j - 2] += Number(weight) * Number(score);
      }
    }

    let highScore = 0;
    for (let i = 0; i < totals.length; i++) {
      if (totals[i] > highScore) {
        highScore = totals[i];
      }
    }

    let scoreTally = "";
    for (let i = 0; i < totals.length; i++) {
      if (totals[i] === highScore && totals[i] !== 0) {
        scoreTally += `<td class="${styles.total} ${styles.highScore}">${totals[i]}</td>`;
      } else {
        scoreTally += `<td class="${styles.total}">${totals[i]}</td>`;
      }
    }

    totalsRow.innerHTML = `<td colspan="2" class="${styles.fixedHeading}">Total</td> ${scoreTally}`;
  }

  function AddButton({ cellType, typeClass }) {
    return (
      <td>
        <button
          onClick={cellType}
          className={`${typeClass} ${styles.addButton}`}
        >
          <AddIcon />
        </button>
      </td>
    );
  }

  function DeleteButton() {
    return (
      <button className={styles.deleteButton}>
        <DeleteIcon />
      </button>
    );
  }

  function NumberCell() {
    return (
      <td>
        <input
          type="number"
          defaultValue=""
          min={1}
          max={10}
          className={styles.numberChange}
          onWheel={(e) => e.target.blur()}
        />
      </td>
    );
  }

  return (
    <>
      <HowToUse />
      <main className={styles.main}>
        <table
          id="wadmTable"
          className={styles.table}
          onKeyUp={calculateTotals}
        >
          <thead>
            <tr>
              <AddButton cellType={addFactor} typeClass={styles.addFactor} />
              <AddButton cellType={addOption} typeClass={styles.addOption} />

              <th
                className={styles.optionsHeading}
                id="optionsHeading"
                colSpan={2}
              >
                Options
              </th>
            </tr>
            <tr
              className="optionsList"
              id="optionsList"
              onClick={(e) => {
                deleteOption(e);
              }}
            >
              <th className={styles.fixedHeading}>Factors</th>
              <th className={styles.fixedHeading}>Weight</th>

              <th className={styles.option}>
                <DeleteButton />
                <input
                  type="text"
                  defaultValue="Option 1"
                  className={styles.nameChange}
                />
              </th>
              <th className={styles.option}>
                <DeleteButton />
                <input
                  type="text"
                  defaultValue="Option 2"
                  className={styles.nameChange}
                />
              </th>
            </tr>
          </thead>
          <tbody
            onClick={(e) => {
              deleteFactor(e);
            }}
          >
            <tr className={styles.factorRow}>
              <td>
                <DeleteButton />
                <input
                  type="text"
                  defaultValue="Factor 1"
                  className={styles.nameChange}
                />
              </td>
              <NumberCell />
              <NumberCell />
              <NumberCell />
            </tr>
          </tbody>
          <tfoot>
            <tr id="total">
              <td colSpan={2} className={styles.fixedHeading}>
                Total
              </td>
              <td className={styles.total}>0</td>
              <td className={styles.total}>0</td>
            </tr>
          </tfoot>
        </table>
      </main>
    </>
  );
}
