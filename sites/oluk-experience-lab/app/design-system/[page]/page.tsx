import { PhaseOneSystem, phaseOnePages } from "../phase-one-system";

export function generateStaticParams() {
  return phaseOnePages.map(({ slug }) => ({ page: slug }));
}

export default async function DesignSystemDetailPage({ params }: Readonly<{ params: Promise<{ page: string }> }>) {
  const { page } = await params;
  return <PhaseOneSystem page={page} />;
}
