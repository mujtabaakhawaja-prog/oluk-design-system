import presentation from "../../../../authority/generated/OLUK-PRESENTATION-SYSTEM-V2.json";
import routeAuthority from "../../../../authority/generated/OLUK-ROUTE-PRESENTATION-AUTHORITY-V1.json";
import { SurfaceReviewStudioClient } from "./surface-review-studio-client";

export default function ReviewStudioPage() {
  return <SurfaceReviewStudioClient presentation={presentation} routeAuthority={routeAuthority}/>;
}
