import { headers } from "next/headers";
import { notFound } from "next/navigation";

import designConnectJson from "../../../../authority/generated/OLUK-DESIGN-CONNECT-V1.json";
import nodeContractJson from "../../../../authority/generated/OLUK-DESIGN-NODE-CONTRACT-V1.json";
import patchSchemaJson from "../../../../authority/generated/OLUK-DESIGN-PATCH-V1.schema.json";
import digestManifestJson from "../../../../authority/generated/OLUK-VISUAL-WORKBENCH-DIGESTS-V1.json";
import messageContractJson from "../../../../authority/generated/OLUK-WORKBENCH-MESSAGE-V1.json";
import { VisualWorkbenchClient } from "./visual-workbench-client";
import type { WorkbenchContractBundle } from "./workbench-types";

const LOOPBACK_HOSTS = new Set(["127.0.0.1", "localhost", "::1", "[::1]"]);

function hostnameFromHostHeader(host: string | null) {
  if (!host) return "";
  if (host.startsWith("[")) return host.slice(0, host.indexOf("]") + 1);
  return host.split(":")[0]?.toLowerCase() ?? "";
}

export default async function VisualWorkbenchPage() {
  const requestHeaders = await headers();
  const hostname = hostnameFromHostHeader(requestHeaders.get("host"));
  const explicitlyEnabled = process.env.OLUK_VISUAL_WORKBENCH === "1";

  if (process.env.NODE_ENV === "production" || !explicitlyEnabled || !LOOPBACK_HOSTS.has(hostname)) {
    notFound();
  }

  const bundle: WorkbenchContractBundle = {
    nodeContract: nodeContractJson as WorkbenchContractBundle["nodeContract"],
    designConnect: designConnectJson as WorkbenchContractBundle["designConnect"],
    messageContract: messageContractJson as WorkbenchContractBundle["messageContract"],
    patchSchema: patchSchemaJson as WorkbenchContractBundle["patchSchema"],
    digests: digestManifestJson as WorkbenchContractBundle["digests"],
  };

  return <VisualWorkbenchClient bundle={bundle} />;
}
