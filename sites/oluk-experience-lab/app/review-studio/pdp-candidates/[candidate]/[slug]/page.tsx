import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PdpCandidateSuite } from "../../../../design-system/pdp-candidate-suite";
import {
  isPdpCandidateId,
  isPdpStressProductSlug,
  PDP_CANDIDATE_IDS,
  PDP_STRESS_PRODUCT_SLUGS,
} from "../../../../design-system/pdp-candidate-manifest";
import { SiteHeader } from "../../../../design-system/site-header";
import { SiteFooter } from "../../../../experience-lab";

type CandidatePageProps = Readonly<{ params: { candidate: string; slug: string } }>;

export const metadata: Metadata = {
  title: "PDP candidate | Olympus Labs UK",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return PDP_CANDIDATE_IDS.flatMap((candidate) =>
    PDP_STRESS_PRODUCT_SLUGS.map((slug) => ({ candidate, slug })),
  );
}

export default function PdpCandidatePage({ params }: CandidatePageProps) {
  if (!isPdpCandidateId(params.candidate) || !isPdpStressProductSlug(params.slug)) return notFound();

  return (
    <>
      <div data-copy-surface="decision"><SiteHeader route="product" /></div>
      <PdpCandidateSuite candidateId={params.candidate} productSlug={params.slug} />
      <div data-copy-surface="editorial"><SiteFooter /></div>
    </>
  );
}
