export type MobileStrategy = "reorder" | "collapse" | "summary" | "carousel" | "horizontal-scroll" | "stack-allowed";
export type DesignSyncStatus = "sites-built" | "figma-backfilled" | "sync-verified" | "champion-approved" | "superseded";

export interface DesignSyncRecord {
  id: string;
  codeExport: string;
  consumingRoutes: string[];
  siteReference: {
    path: string;
    sourceCommit: string;
    desktopHash: string;
    mobileHash: string;
  };
  figmaReference: {
    fileKey: "BEPMuUt1HroEw8xjz8CVyN";
    nodeId: string | null;
    desktopNodeId: string | null;
    mobileNodeId: string | null;
  };
  canonicalComponents: string[];
  mobileStrategy: MobileStrategy;
  status: DesignSyncStatus;
}
