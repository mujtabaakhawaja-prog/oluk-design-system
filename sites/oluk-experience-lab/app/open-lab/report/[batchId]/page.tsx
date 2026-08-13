import { OpenLabReportPage } from "../../../program-routes";
export default async function Page({ params }: { params: Promise<{ batchId: string }> }) { return <OpenLabReportPage batchId={(await params).batchId}/>; }
