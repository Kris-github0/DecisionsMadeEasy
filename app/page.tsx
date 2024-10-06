import React from "react";
import Header from "./components/Header/Header";
import Matrix from "./components/Matrix/Matrix";

export default function Page() {
  return (
    <>
      <div className="globalWrapper">
        <Header />
        <Matrix />
      </div>
    </>
  );
}
