import { headers } from "next/headers";
import { notFound } from "next/navigation";

import designConnectJson from "../../../../authority/generated/OLUK-DESIGN-CONNECT-V1.json";
import nodeContractJson from "../../../../authority/generated/OLUK-DESIGN-NODE-CONTRACT-V1.json";
import patchSchemaJson from "../../../../authority/generated/OLUK-DESIGN-PATCH-V1.schema.json";
import patchTargetsJson from "../../../../authority/generated/OLUK-DESIGN-PATCH-TARGETS-V1.json";
import digestManifestJson from "../../../../authority/generated/OLUK-VISUAL-WORKBENCH-DIGESTS-V1.json";
import messageContractJson from "../../../../authority/generated/OLUK-WORKBENCH-MESSAGE-V1.json";
import { VisualWorkbenchClient } from "./visual-workbench-client";
import type { WorkbenchContractBundle } from "./workbench-types";

declare const __OLUK_VISUAL_WORKBENCH_ENABLED__: boolean;

const LOOPBACK_HOSTS = new Set(["127.0.0.1", "localhost", "::1", "[::1]"]);

function hostnameFromHostHeader(host: string | null) {
  if (!host) return "";
  if (host.startsWith("[")) return host.slice(0, host.indexOf("]") + 1);
  return host.split(":")[0]?.toLowerCase() ?? "";
}

export default async function VisualWorkbenchPage() {
  const requestHeaders = await headers();
  const hostname = hostnameFromHostHeader(requestHeaders.get("host"));
  const explicitlyEnabled = __OLUK_VISUAL_WORKBENCH_ENABLED__;

  // Vinext may render local owner tooling with a production-like NODE_ENV.
  // The enforceable boundary is the explicit capability plus a loopback host;
  // public and production hosts fail closed even if the capability is present.
  if (!explicitlyEnabled || !LOOPBACK_HOSTS.has(hostname)) {
    notFound();
  }

  const bundle: WorkbenchContractBundle = {
    nodeContract: nodeContractJson as WorkbenchContractBundle["nodeContract"],
    designConnect: designConnectJson as WorkbenchContractBundle["designConnect"],
    messageContract: messageContractJson as WorkbenchContractBundle["messageContract"],
    patchSchema: patchSchemaJson as WorkbenchContractBundle["patchSchema"],
    patchTargets: patchTargetsJson as WorkbenchContractBundle["patchTargets"],
    digests: digestManifestJson as WorkbenchContractBundle["digests"],
  };

  return <VisualWorkbenchClient bundle={bundle} />;
}
