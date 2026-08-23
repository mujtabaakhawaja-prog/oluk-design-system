import { notFound } from "next/navigation";
import { ComponentProofSpecimen } from "../component-proof-specimens";
import { isComponentProofFamilyId } from "../component-proof-contract";

type ComponentProofSpecimenPageProps = Readonly<{
  searchParams: Promise<Readonly<{ family?: string | string[] }>>;
}>;

export default async function ComponentProofSpecimenPage({ searchParams }: ComponentProofSpecimenPageProps) {
  const { family } = await searchParams;
  const familyId = Array.isArray(family) ? family[0] : family;
  if (!familyId || !isComponentProofFamilyId(familyId)) notFound();

  return <ComponentProofSpecimen familyId={familyId} />;
}
