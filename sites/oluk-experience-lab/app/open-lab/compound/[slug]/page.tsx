import { OpenLabCompoundPage } from "../../../program-routes";
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { return <OpenLabCompoundPage slug={(await params).slug}/>; }
