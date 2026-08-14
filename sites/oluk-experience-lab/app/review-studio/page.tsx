import payload from "../design-system/review-studio-payload.json";
import { ReviewStudioClient, type ReviewStudioPayload } from "./review-studio-client";

export default async function ReviewStudioPage({searchParams}:{searchParams:Promise<{family?:string;module?:string}>}) {
  const params=await searchParams;
  return <ReviewStudioClient initialFamily={params.family} initialModule={params.module} payload={payload as ReviewStudioPayload}/>;
}
