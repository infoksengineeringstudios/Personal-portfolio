import type { Metadata } from "next";
import { MapClient } from "./MapClient";

export const metadata: Metadata = {
  title: "Capability Map",
  description:
    "Krishiraj Santchurn's engineering capability map \u2014 structural, digital, construction, commercial and leadership, each linked to the work.",
  alternates: { canonical: "/map" },
};

export default function MapPage() {
  return <MapClient />;
}
