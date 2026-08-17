import type { Metadata } from "next";
import { ExperienceLab } from "../experience-lab";

export const metadata: Metadata = { title: "Search the catalogue", robots: { index: false, follow: false } };

export default function SearchPage() {
  return <ExperienceLab route="search" />;
}
