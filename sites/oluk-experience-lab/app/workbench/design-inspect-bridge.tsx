"use client";

import { useEffect, useState } from "react";

import messageContract from "../../../../authority/generated/OLUK-WORKBENCH-MESSAGE-V1.json";
import styles from "./design-inspect-bridge.module.css";

type Overlay = Readonly<{
  nodeId: string;
  top: number;
  left: number;
  width: number;
  height: number;
}>;

type WorkbenchEnvelope = Readonly<{
  contract: string;
  type: string;
  payload?: Readonly<Record<string, unknown>>;
}>;

const EVENT_TYPES = new Set(messageContract.events.map((event) => event.type));
const WORKBENCH_ORIGINS = new Set(
  messageContract.allowedOrigins.filter((origin) => new URL(origin).port === "4195"),
);

function inspectedNode(target: EventTarget | null) {
  return target instanceof Element ? target.closest<HTMLElement>("[data-oluk-node]") : null;
}

function overlayFor(node: HTMLElement): Overlay {
  const rect = node.getBoundingClientRect();
  return {
    nodeId: node.dataset.olukNode ?? "unknown",
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

function semanticParents(node: HTMLElement) {
  const parents: string[] = [];
  let current = node.parentElement?.closest<HTMLElement>("[data-oluk-node]") ?? null;
  while (current) {
    if (current.dataset.olukNode) parents.push(current.dataset.olukNode);
    current = current.parentElement?.closest<HTMLElement>("[data-oluk-node]") ?? null;
  }
  return parents;
}

export function DesignInspectBridge() {
  const [overlay, setOverlay] = useState<Overlay | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("design") !== "inspect" || window.parent === window) return;

    let parentOrigin = "";
    try {
      parentOrigin = new URL(document.referrer).origin;
    } catch {
      return;
    }
    if (!WORKBENCH_ORIGINS.has(parentOrigin)) return;

    function post(type: string, payload: Readonly<Record<string, unknown>>) {
      if (!EVENT_TYPES.has(type)) return;
      window.parent.postMessage({ contract: messageContract.contract, type, payload }, parentOrigin);
    }

    function inspect(target: EventTarget | null, select: boolean) {
      const node = inspectedNode(target);
      if (!node?.dataset.olukNode) return;
      setOverlay(overlayFor(node));
      if (select) {
        post("node.select", {
          nodeId: node.dataset.olukNode,
          routeId: params.get("route") ?? "route.product",
          viewport: params.get("viewport") ?? "1440",
          state: params.get("state") ?? "default",
          digest: params.get("digest") ?? "preview-runtime",
        });
        post("node.parents", { nodeId: node.dataset.olukNode, parentIds: semanticParents(node) });
      }
    }

    function onPointerOver(event: PointerEvent) {
      inspect(event.target, false);
    }

    function onClick(event: MouseEvent) {
      if (!inspectedNode(event.target)) return;
      event.preventDefault();
      event.stopPropagation();
      inspect(event.target, true);
    }

    function onMessage(event: MessageEvent<WorkbenchEnvelope>) {
      if (event.source !== window.parent || event.origin !== parentOrigin) return;
      if (!event.data || event.data.contract !== messageContract.contract || !EVENT_TYPES.has(event.data.type)) return;

      const nodeId = event.data.payload?.nodeId;
      if ((event.data.type === "node.highlight" || event.data.type === "node.select") && typeof nodeId === "string") {
        const node = [...document.querySelectorAll<HTMLElement>("[data-oluk-node]")]
          .find((candidate) => candidate.dataset.olukNode === nodeId);
        if (node) {
          setOverlay(overlayFor(node));
          node.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
        }
      }
      if (event.data.type === "projection.change" && typeof event.data.payload?.projection === "string") {
        document.documentElement.dataset.olukProjection = event.data.payload.projection;
      }
      if (event.data.type === "state.change" && typeof nodeId === "string" && typeof event.data.payload?.state === "string") {
        const node = [...document.querySelectorAll<HTMLElement>("[data-oluk-node]")]
          .find((candidate) => candidate.dataset.olukNode === nodeId);
        if (node) node.dataset.workbenchState = event.data.payload.state;
      }
    }

    window.addEventListener("message", onMessage);
    document.addEventListener("pointerover", onPointerOver, true);
    document.addEventListener("click", onClick, true);
    post("projection.change", { projection: params.get("projection") ?? "fixture" });

    return () => {
      window.removeEventListener("message", onMessage);
      document.removeEventListener("pointerover", onPointerOver, true);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  if (!overlay) return null;

  return (
    <div
      aria-hidden="true"
      className={styles.overlay}
      style={{ height: overlay.height, left: overlay.left, top: overlay.top, width: overlay.width }}
    >
      <span>{overlay.nodeId}</span>
    </div>
  );
}
