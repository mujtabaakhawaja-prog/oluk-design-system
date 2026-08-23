"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./visual-workbench.module.css";
import type {
  DesignConnectMapping,
  DesignControl,
  DesignNode,
  PreviewTarget,
  ProjectionMode,
  ViewportMode,
  WorkbenchAnnotation,
  WorkbenchContractBundle,
} from "./workbench-types";

const PREVIEW_TARGETS: Readonly<Record<PreviewTarget, string>> = {
  sites: "http://127.0.0.1:4193",
  next: "http://127.0.0.1:4191",
};

const VIEWPORT_WIDTHS: Readonly<Record<ViewportMode, number>> = {
  "1440": 1440,
  "1024": 1024,
  "768": 768,
  "390": 390,
};

const DEFAULT_ROUTE_ID = "route.product";
const DEFAULT_NODE_ID = "component.metric-rail";

type StagedValues = Record<string, string | number | boolean>;

function initialControlValues(node: DesignNode): StagedValues {
  return Object.fromEntries(
    node.controls
      .filter((control) => control.patchable)
      .map((control) => [control.id, control.defaultValue ?? control.values?.[0] ?? ""]),
  );
}

function controlValue(control: DesignControl, value: string) {
  if (control.type === "boolean") return value === "true";
  if (control.type === "number") return Number(value);
  return value;
}

function semanticLabel(node: DesignNode) {
  const [group, detail] = node.name.split(" / ");
  return { group, detail: detail ?? node.id };
}

export function VisualWorkbenchClient({ bundle }: Readonly<{ bundle: WorkbenchContractBundle }>) {
  const [treeMode, setTreeMode] = useState<"semantic" | "raw">("semantic");
  const [target, setTarget] = useState<PreviewTarget>("sites");
  const [projection, setProjection] = useState<ProjectionMode>("fixture");
  const [viewport, setViewport] = useState<ViewportMode>("1440");
  const [selectedNodeId, setSelectedNodeId] = useState(DEFAULT_NODE_ID);
  const [selectedState, setSelectedState] = useState("default");
  const [routeId, setRouteId] = useState(DEFAULT_ROUTE_ID);
  const [query, setQuery] = useState("");
  const [annotationText, setAnnotationText] = useState("");
  const [annotations, setAnnotations] = useState<readonly WorkbenchAnnotation[]>([]);
  const [stagedValues, setStagedValues] = useState<StagedValues>({});
  const [lastBridgeEvent, setLastBridgeEvent] = useState("No preview event received");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const digest = bundle.digests.artifacts.nodeContract;
  const allowedOrigins = useMemo(() => new Set(bundle.messageContract.allowedOrigins), [bundle.messageContract.allowedOrigins]);
  const allowedEvents = useMemo(() => new Set(bundle.messageContract.events.map((event) => event.type)), [bundle.messageContract.events]);
  const nodesById = useMemo(() => new Map(bundle.nodeContract.nodes.map((node) => [node.id, node])), [bundle.nodeContract.nodes]);
  const mappingsById = useMemo(() => new Map(bundle.designConnect.mappings.map((mapping) => [mapping.nodeId, mapping])), [bundle.designConnect.mappings]);
  const selectedNode = nodesById.get(selectedNodeId) ?? bundle.nodeContract.nodes[0];
  const selectedMapping = mappingsById.get(selectedNode.id);

  const visibleNodes = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return bundle.nodeContract.nodes.filter((node) =>
      !normalized || `${node.name} ${node.id} ${node.kind}`.toLowerCase().includes(normalized),
    );
  }, [bundle.nodeContract.nodes, query]);

  const previewUrl = useMemo(() => {
    const origin = PREVIEW_TARGETS[target];
    const path = target === "sites" ? "/product/mk-2866" : "/owner-tools/runtime-studio";
    const url = new URL(path, origin);
    url.searchParams.set("design", "inspect");
    url.searchParams.set("projection", projection);
    url.searchParams.set("node", selectedNode.id);
    url.searchParams.set("viewport", viewport);
    url.searchParams.set("state", selectedState);
    return url.href;
  }, [projection, selectedNode.id, selectedState, target, viewport]);

  function postToPreview(type: string, payload: Readonly<Record<string, unknown>>) {
    if (!allowedEvents.has(type)) return;
    iframeRef.current?.contentWindow?.postMessage(
      { contract: bundle.messageContract.contract, type, payload },
      PREVIEW_TARGETS[target],
    );
  }

  function selectNode(nodeId: string) {
    const node = nodesById.get(nodeId);
    if (!node) return;
    setSelectedNodeId(nodeId);
    setSelectedState(node.states[0] ?? "default");
    setStagedValues(initialControlValues(node));
    postToPreview("node.select", { nodeId, routeId, viewport, state: node.states[0] ?? "default", digest });
  }

  useEffect(() => {
    setStagedValues(initialControlValues(selectedNode));
  }, [selectedNode]);

  useEffect(() => {
    function receivePreviewMessage(event: MessageEvent) {
      if (!allowedOrigins.has(event.origin)) return;
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (!event.data || event.data.contract !== bundle.messageContract.contract) return;
      if (!allowedEvents.has(event.data.type)) return;
      setLastBridgeEvent(`${event.data.type} · ${event.origin}`);
      const candidateNodeId = event.data.payload?.nodeId;
      if (event.data.type === "node.select" && typeof candidateNodeId === "string" && nodesById.has(candidateNodeId)) {
        setSelectedNodeId(candidateNodeId);
      }
    }
    window.addEventListener("message", receivePreviewMessage);
    return () => window.removeEventListener("message", receivePreviewMessage);
  }, [allowedEvents, allowedOrigins, bundle.messageContract.contract, nodesById]);

  const patchPreview = useMemo(() => ({
    contract: bundle.patchSchema.$id,
    mode: "READ_ONLY_PREVIEW",
    nodeId: selectedNode.id,
    baseDigest: digest,
    changes: stagedValues,
    targetRepository: "design",
    targetExport: selectedNode.ownership.exportName,
    writeCapability: "NONE",
  }), [bundle.patchSchema.$id, digest, selectedNode.id, selectedNode.ownership.exportName, stagedValues]);

  function captureAnnotation() {
    const text = annotationText.trim();
    if (!text) return;
    const annotation: WorkbenchAnnotation = {
      annotationId: `annotation-${String(annotations.length + 1).padStart(3, "0")}`,
      nodeId: selectedNode.id,
      routeId,
      viewport,
      state: selectedState,
      digest,
      text,
    };
    setAnnotations((current) => [...current, annotation]);
    setAnnotationText("");
    postToPreview("annotation.create", annotation);
  }

  return (
    <main className={styles.workbench} id="main-content">
      <header className={styles.topbar}>
        <div>
          <span className={styles.eyebrow}>LOCAL OWNER TOOLING · READ ONLY</span>
          <h1>OLUK Visual Workbench</h1>
        </div>
        <nav aria-label="Owner tooling links" className={styles.ownerLinks}>
          <Link href="/system-atlas">System Atlas</Link>
          <Link href="/review-studio">Review Studio</Link>
        </nav>
        <dl className={styles.digest}>
          <div><dt>NODE CONTRACT</dt><dd>{digest.slice(0, 12)}…</dd></div>
          <div><dt>BRIDGE</dt><dd>{lastBridgeEvent}</dd></div>
        </dl>
      </header>

      <section className={styles.controlbar} aria-label="Workbench preview controls">
        <div className={styles.segmented} aria-label="Preview target">
          {(["sites", "next"] as const).map((item) => (
            <button aria-pressed={target === item} key={item} onClick={() => setTarget(item)} type="button">
              {item === "sites" ? "Sites · 4193" : "Next Studio · 4191"}
            </button>
          ))}
        </div>
        <label>Projection
          <select value={projection} onChange={(event) => {
            const value = event.target.value as ProjectionMode;
            setProjection(value);
            postToPreview("projection.change", { projection: value });
          }}>
            <option value="contract">Contract</option>
            <option value="fixture">Fixture</option>
            <option value="real">Real adapter</option>
          </select>
        </label>
        <label>Viewport
          <select value={viewport} onChange={(event) => {
            const value = event.target.value as ViewportMode;
            setViewport(value);
            postToPreview("viewport.change", { viewport: value });
          }}>
            {Object.keys(VIEWPORT_WIDTHS).map((width) => <option key={width} value={width}>{width}px</option>)}
          </select>
        </label>
        <label>State
          <select value={selectedState} onChange={(event) => {
            setSelectedState(event.target.value);
            postToPreview("state.change", { nodeId: selectedNode.id, state: event.target.value });
          }}>
            {selectedNode.states.map((state) => <option key={state}>{state}</option>)}
          </select>
        </label>
        <label>Route
          <input value={routeId} onChange={(event) => setRouteId(event.target.value)} />
        </label>
      </section>

      <div className={styles.workspace}>
        <aside className={styles.layers} aria-label="Semantic layer tree">
          <div className={styles.panelHeading}>
            <div><span>LAYERS</span><strong>{visibleNodes.length}</strong></div>
            <div className={styles.miniToggle}>
              <button aria-pressed={treeMode === "semantic"} onClick={() => setTreeMode("semantic")} type="button">Semantic</button>
              <button aria-pressed={treeMode === "raw"} onClick={() => setTreeMode("raw")} type="button">Raw DOM</button>
            </div>
          </div>
          <label className={styles.search}>Find a node
            <input onChange={(event) => setQuery(event.target.value)} placeholder="MetricRail, status, field…" value={query} />
          </label>
          <div className={styles.tree} role="tree">
            {visibleNodes.map((node) => {
              const label = semanticLabel(node);
              return (
                <button
                  aria-selected={selectedNode.id === node.id}
                  className={styles.treeNode}
                  data-kind={node.kind}
                  key={node.id}
                  onClick={() => selectNode(node.id)}
                  role="treeitem"
                  type="button"
                >
                  {treeMode === "semantic" ? (
                    <><span>{label.group}</span><strong>{label.detail}</strong><small>{node.kind}</small></>
                  ) : (
                    <><span>&lt;{node.renderAs ?? "contract"}&gt;</span><strong>{node.id}</strong><small>advanced DOM view</small></>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        <section className={styles.previewPanel} aria-label="Preview canvas">
          <div className={styles.previewMeta}>
            <div><span>TARGET</span><strong>{previewUrl}</strong></div>
            <div><span>SELECTED</span><strong>{selectedNode.id}</strong></div>
          </div>
          <div className={styles.previewViewport} style={{ maxWidth: VIEWPORT_WIDTHS[viewport] }}>
            <iframe
              key={previewUrl}
              onLoad={() => postToPreview("node.highlight", { nodeId: selectedNode.id })}
              ref={iframeRef}
              sandbox="allow-forms allow-same-origin allow-scripts"
              src={previewUrl}
              title={`${target} ${projection} preview`}
            />
          </div>
        </section>

        <aside className={styles.inspector} aria-label="Node inspector">
          <div className={styles.inspectorTitle}>
            <span>{selectedNode.kind}</span>
            <h2>{selectedNode.name}</h2>
            <code>{selectedNode.id}</code>
          </div>

          <section className={styles.inspectorSection}>
            <h3>Source and adoption</h3>
            <dl className={styles.lookup}>
              <div><dt>Source</dt><dd>{selectedNode.ownership.sourcePath}</dd></div>
              <div><dt>Export</dt><dd>{selectedNode.ownership.exportName}</dd></div>
              <div><dt>Next</dt><dd>{selectedMapping?.nextImplementation ?? "No downstream mapping"}</dd></div>
              <div><dt>Slots</dt><dd>{selectedNode.relationships.allowedSlotIds.join(", ") || "None"}</dd></div>
              <div><dt>Routes</dt><dd>{selectedNode.relationships.allowedRouteIds.join(", ") || "None"}</dd></div>
              <div><dt>Fields</dt><dd>{selectedNode.fieldIds.join(", ") || "None"}</dd></div>
            </dl>
          </section>

          <section className={styles.inspectorSection}>
            <h3>Typed controls</h3>
            {selectedNode.controls.filter((control) => control.patchable).length ? selectedNode.controls.filter((control) => control.patchable).map((control) => (
              <label className={styles.property} key={control.id}>{control.id}
                {control.type === "boolean" ? (
                  <select value={String(stagedValues[control.id] ?? control.defaultValue ?? false)} onChange={(event) => setStagedValues((values) => ({ ...values, [control.id]: controlValue(control, event.target.value) }))}>
                    <option value="false">false</option><option value="true">true</option>
                  </select>
                ) : control.values?.length ? (
                  <select value={String(stagedValues[control.id] ?? control.defaultValue ?? control.values[0])} onChange={(event) => setStagedValues((values) => ({ ...values, [control.id]: controlValue(control, event.target.value) }))}>
                    {control.values.map((value) => <option key={String(value)} value={String(value)}>{String(value)}</option>)}
                  </select>
                ) : (
                  <input value={String(stagedValues[control.id] ?? control.defaultValue ?? "")} onChange={(event) => setStagedValues((values) => ({ ...values, [control.id]: controlValue(control, event.target.value) }))} />
                )}
              </label>
            )) : <p className={styles.muted}>This node has no patchable properties in V1.</p>}
          </section>

          <section className={styles.inspectorSection}>
            <h3>Read-only patch preview</h3>
            <pre>{JSON.stringify(patchPreview, null, 2)}</pre>
            <button className={styles.secondaryButton} onClick={() => setStagedValues(initialControlValues(selectedNode))} type="button">Discard staged values</button>
            <p className={styles.safety}>No apply action exists. This route has no source-writing or commerce endpoint.</p>
          </section>

          <section className={styles.inspectorSection}>
            <h3>Annotation</h3>
            <textarea onChange={(event) => setAnnotationText(event.target.value)} placeholder="Describe the exact node, state, and viewport decision." value={annotationText} />
            <button className={styles.primaryButton} disabled={!annotationText.trim()} onClick={captureAnnotation} type="button">Capture local annotation</button>
            {annotations.map((annotation) => (
              <article className={styles.annotation} key={annotation.annotationId}>
                <strong>{annotation.annotationId}</strong>
                <p>{annotation.text}</p>
                <small>{annotation.nodeId} · {annotation.routeId} · {annotation.viewport} · {annotation.state} · {annotation.digest.slice(0, 10)}…</small>
              </article>
            ))}
          </section>
        </aside>
      </div>
    </main>
  );
}
