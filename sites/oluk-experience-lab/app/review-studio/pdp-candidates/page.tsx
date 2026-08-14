import type { Metadata } from "next";

import { PdpCandidateReview } from "./pdp-candidate-review";

export const metadata: Metadata = {
  title: "PDP candidate review | Olympus Labs UK",
  robots: { index: false, follow: false },
};

export default function PdpCandidateReviewPage() {
  return <PdpCandidateReview />;
}
