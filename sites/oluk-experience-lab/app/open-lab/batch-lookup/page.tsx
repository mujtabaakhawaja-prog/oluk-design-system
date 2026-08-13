import { ExperienceLab } from "../../experience-lab";

type LookupPageProps = Readonly<{
  searchParams: Promise<Readonly<{ reference?: string | string[] }>>;
}>;

export default async function LookupPage({ searchParams }: LookupPageProps) {
  const { reference } = await searchParams;
  const lookupReference = Array.isArray(reference) ? reference[0] : reference;

  return <ExperienceLab lookupReference={lookupReference} route="lookup" />;
}
