import type { ProductFixture } from "./product-fixtures";
import { mk2866Fixture } from "./product-fixtures";

export type EvidenceRecordPresentation = Readonly<{
  slug: "source-bound-record";
  customerPath: "/open-lab/records/source-bound-record";
  product: ProductFixture;
  title: string;
  publication: null;
  method: null;
  result: null;
  reportHref: null;
  presentationStatus: "unavailable";
  authority: Readonly<{
    classification: "route-presentation-fixture";
    runtimeOwner: "openlab-runtime-later";
    live: false;
  }>;
}>;

export const evidenceRecordFixtures = [
  {
    slug: "source-bound-record",
    customerPath: "/open-lab/records/source-bound-record",
    product: mk2866Fixture,
    title: "MK-2866 evidence record",
    publication: null,
    method: null,
    result: null,
    reportHref: null,
    presentationStatus: "unavailable",
    authority: {
      classification: "route-presentation-fixture",
      runtimeOwner: "openlab-runtime-later",
      live: false,
    },
  },
] as const satisfies ReadonlyArray<EvidenceRecordPresentation>;

export const selectedEvidenceRecord = evidenceRecordFixtures[0];
