import React from "react";
import "./global.scss";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "DecisionsMadeEasy",
  description:
    "Decision Matrix tool for simplifying multifaceted decisions. Get the clarity you need to get the outcomes you desire.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
