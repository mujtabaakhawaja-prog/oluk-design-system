import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  ACCOUNT_RETENTION_CANDIDATE_IDS,
  ACCOUNT_RETENTION_REVIEW_PATH,
  isAccountRetentionCandidateId,
} from "../account-retention-candidate-manifest";
import { AccountRetentionCandidateReview } from "../account-retention-candidate-review";
import { AccountRetentionCandidateSuite } from "../account-retention-candidate-suite";
import { SiteHeader } from "../../../design-system/site-header";
import { SiteFooter } from "../../../experience-lab";

type AccountRetentionCandidatePageProps = Readonly<{
  params: { candidate: string };
}>;

export const metadata: Metadata = {
  title: "Account and retention candidate | Olympus Labs UK",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return [
    ...ACCOUNT_RETENTION_CANDIDATE_IDS.map((candidate) => ({ candidate })),
    { candidate: ACCOUNT_RETENTION_REVIEW_PATH.split("/").at(-1) ?? "catalogue" },
  ];
}

export default function AccountRetentionCandidatePage({
  params,
}: AccountRetentionCandidatePageProps) {
  if (params.candidate === "catalogue") return <AccountRetentionCandidateReview />;
  if (!isAccountRetentionCandidateId(params.candidate)) return notFound();

  return (
    <>
      <div data-copy-surface="decision"><SiteHeader route="account" /></div>
      <AccountRetentionCandidateSuite candidateId={params.candidate} />
      <div data-copy-surface="editorial"><SiteFooter /></div>
    </>
  );
}
