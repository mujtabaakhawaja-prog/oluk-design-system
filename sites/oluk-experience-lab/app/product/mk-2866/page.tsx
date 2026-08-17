import type { Metadata } from "next";
import DynamicProductPage, { generateMetadata as dynamicProductMetadata } from "../[slug]/page";

const params = { slug: "mk-2866" };
export function generateMetadata(): Metadata { return dynamicProductMetadata({ params }); }
export default function Mk2866CompatibilityPage() { return <DynamicProductPage params={params} />; }
