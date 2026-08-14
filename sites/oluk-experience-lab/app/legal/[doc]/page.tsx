import { LegalDocumentSurface } from "../../design-system/support-surface";
import { CustomerSiteChrome } from "../../experience-lab";

export function generateStaticParams() {
  return ["privacy", "terms", "cookies"].map((doc) => ({ doc }));
}

export default async function LegalDocumentPage({
  params,
}: Readonly<{ params: Promise<{ doc: string }> }>) {
  const { doc } = await params;
  return (
    <CustomerSiteChrome route={doc === "terms" ? "terms" : "privacy"}>
      <LegalDocumentSurface doc={doc} />
    </CustomerSiteChrome>
  );
}
