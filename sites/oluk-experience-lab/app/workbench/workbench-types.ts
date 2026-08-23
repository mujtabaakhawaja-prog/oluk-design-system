export type ProjectionMode = "contract" | "fixture" | "real";
export type ViewportMode = "1440" | "1024" | "768" | "390";
export type PreviewTarget = "sites" | "next";

export type DesignControl = Readonly<{
  id: string;
  type: "enum" | "boolean" | "number" | "string";
  values?: readonly (string | number | boolean)[];
  defaultValue?: string | number | boolean;
  patchable: boolean;
}>;

export type DesignNode = Readonly<{
  id: string;
  name: string;
  kind: string;
  renderAs?: string | null;
  ownership: Readonly<{
    repository: string;
    sourcePath: string;
    exportName: string;
  }>;
  relationships: Readonly<{
    parentIds: readonly string[];
    childIds: readonly string[];
    allowedSlotIds: readonly string[];
    allowedRouteIds: readonly string[];
  }>;
  controls: readonly DesignControl[];
  variants: readonly string[];
  states: readonly string[];
  responsiveModes: readonly string[];
  fieldIds: readonly string[];
  contentIds: readonly string[];
  mediaRoleIds: readonly string[];
}>;

export type DesignConnectMapping = Readonly<{
  nodeId: string;
  designSource: string;
  atlasSpecimen: string;
  reviewCandidate: string;
  sitesPlacement: string;
  nextImplementation: string;
  runtimeStudioSpecimen: string;
  nativeNextSlotIds: readonly string[];
}>;

export type WorkbenchEvent = Readonly<{
  type: string;
  direction: string;
  payload: readonly string[];
}>;

export type WorkbenchContractBundle = Readonly<{
  nodeContract: Readonly<{
    contract: "OLUK_DESIGN_NODE_CONTRACT_V1";
    status: string;
    nodes: readonly DesignNode[];
  }>;
  designConnect: Readonly<{
    contract: "OLUK_DESIGN_CONNECT_V1";
    mappings: readonly DesignConnectMapping[];
  }>;
  messageContract: Readonly<{
    contract: "OLUK_WORKBENCH_MESSAGE_V1";
    allowedOrigins: readonly string[];
    events: readonly WorkbenchEvent[];
  }>;
  patchSchema: Readonly<{
    $id: "OLUK_DESIGN_PATCH_V1";
    properties: Readonly<Record<string, unknown>>;
  }>;
  digests: Readonly<{
    contract: "OLUK_VISUAL_WORKBENCH_DIGESTS_V1";
    artifacts: Readonly<Record<string, string>>;
  }>;
}>;

export type WorkbenchAnnotation = Readonly<{
  annotationId: string;
  nodeId: string;
  routeId: string;
  viewport: ViewportMode;
  state: string;
  digest: string;
  text: string;
}>;
