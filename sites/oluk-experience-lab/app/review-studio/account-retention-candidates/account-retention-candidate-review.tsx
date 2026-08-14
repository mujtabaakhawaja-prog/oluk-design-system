import { Fragment, type CSSProperties } from "react";

import { ActionLink } from "../../design-system/action-control";
import {
  ACCOUNT_RETENTION_CANDIDATES,
  ACCOUNT_RETENTION_CANDIDATE_IDS,
} from "./account-retention-candidate-manifest";

const reviewStyle = {
  page: {
    background: "var(--oluk-canvas)",
    color: "var(--oluk-text-primary)",
    display: "grid",
    gap: "var(--oluk-space-6)",
    minHeight: "100vh",
    padding: "clamp(var(--oluk-space-4), 4vw, var(--oluk-space-16))",
  },
  panel: {
    background: "var(--oluk-surface-card)",
    border: "var(--oluk-border-width) solid var(--oluk-border-card)",
    borderRadius: "var(--oluk-radius-vertical)",
    boxShadow: "var(--oluk-shadow-card)",
    display: "grid",
    gap: "var(--oluk-space-5)",
    margin: "0 auto",
    maxWidth: "1440px",
    padding: "clamp(var(--oluk-space-5), 4vw, var(--oluk-space-8))",
    width: "100%",
  },
  eyebrow: {
    color: "var(--oluk-cobalt)",
    fontSize: "var(--oluk-type-eyebrow-size)",
    fontWeight: 800,
    letterSpacing: "var(--oluk-type-eyebrow-track)",
  },
  title: {
    fontFamily: "var(--oluk-font-display)",
    fontSize: "clamp(var(--oluk-type-display-lg-size), 6vw, var(--oluk-type-display-xl-size))",
    lineHeight: "var(--oluk-type-display-xl-line)",
    margin: 0,
  },
  heading: {
    fontFamily: "var(--oluk-font-display)",
    fontSize: "var(--oluk-type-display-lg-size)",
    margin: 0,
  },
  copy: {
    color: "var(--oluk-text-secondary)",
    fontSize: "var(--oluk-type-body-size)",
    lineHeight: "var(--oluk-type-body-line)",
    margin: 0,
    maxWidth: "78ch",
  },
  facts: {
    display: "grid",
    gap: "var(--oluk-space-3)",
    margin: 0,
  },
  fact: {
    borderTop: "var(--oluk-border-width) solid var(--oluk-border-chip)",
    display: "grid",
    gap: "var(--oluk-space-2)",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    paddingTop: "var(--oluk-space-3)",
  },
  lists: {
    display: "grid",
    gap: "var(--oluk-space-4)",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  },
  list: {
    background: "var(--oluk-surface-family)",
    border: "var(--oluk-border-width) solid var(--oluk-border-family)",
    borderRadius: "var(--oluk-radius-compact)",
    padding: "var(--oluk-space-5)",
  },
  previewHeader: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--oluk-space-4)",
    justifyContent: "space-between",
  },
  frame: {
    background: "var(--oluk-canvas)",
    border: "var(--oluk-border-width) solid var(--oluk-border-card)",
    maxWidth: "100%",
    overflow: "auto",
    position: "relative",
  },
  iframe: {
    border: 0,
    left: 0,
    position: "absolute",
    top: 0,
    transformOrigin: "top left",
  },
} satisfies Record<string, CSSProperties>;

export function AccountRetentionCandidateReview() {
  return (
    <main data-owner-only="true" id="main-content" style={reviewStyle.page}>
      <header style={reviewStyle.panel}>
        <span style={reviewStyle.eyebrow}>OWNER REVIEW · UNSELECTED OPTIONS</span>
        <h1 style={reviewStyle.title}>Three complete account and retention directions.</h1>
        <p style={reviewStyle.copy}>Inspect the same order and product fixtures through three materially different account compositions. Nothing on this page selects, ranks, publishes or promotes an option.</p>
        <ActionLink href="/review-studio" variant="secondary">Return to Champion Review Studio</ActionLink>
      </header>

      {ACCOUNT_RETENTION_CANDIDATE_IDS.map((candidateId) => {
        const candidate = ACCOUNT_RETENTION_CANDIDATES[candidateId];
        const path = `/review-studio/account-retention-candidates/${candidateId}`;
        return (
          <Fragment key={candidateId}>
            <section style={reviewStyle.panel}>
              <div>
                <span style={reviewStyle.eyebrow}>{candidate.status} · UNRANKED · UNSELECTED</span>
                <h2 style={reviewStyle.heading}>{candidate.label}</h2>
                <p style={reviewStyle.copy}>{candidate.commercialThesis}</p>
              </div>
              <dl style={reviewStyle.facts}>
                <div style={reviewStyle.fact}><dt>Friction removed</dt><dd>{candidate.customerFrictionRemoved}</dd></div>
                <div style={reviewStyle.fact}><dt>Desktop grid</dt><dd>{candidate.desktopGrid}</dd></div>
                <div style={reviewStyle.fact}><dt>Differentiator</dt><dd>{candidate.differentiator}</dd></div>
                <div style={reviewStyle.fact}><dt>Owner selection</dt><dd>Pending complete candidate review</dd></div>
              </dl>
              <div style={reviewStyle.lists}>
                <div style={reviewStyle.list}><h3>Section order</h3><ol>{candidate.sectionOrder.map((section) => <li key={section}>{section}</li>)}</ol></div>
                <div style={reviewStyle.list}><h3>Mobile journey</h3><ol>{candidate.mobileJourney.map((step) => <li key={step}>{step}</li>)}</ol></div>
                <div style={reviewStyle.list}><h3>Trade-offs</h3><ul>{candidate.tradeoffs.map((tradeoff) => <li key={tradeoff}>{tradeoff}</li>)}</ul></div>
              </div>
            </section>

            <section style={reviewStyle.panel}>
              <header style={reviewStyle.previewHeader}>
                <div><span style={reviewStyle.eyebrow}>LIVE SITES CANDIDATE</span><h2 style={reviewStyle.heading}>{candidate.label} · 1440px</h2></div>
                <ActionLink href={path} rel="noreferrer" target="_blank" variant="secondary">Open unscaled candidate</ActionLink>
              </header>
              <div style={{ ...reviewStyle.frame, height: "645px" }}>
                <iframe
                  src={path}
                  style={{ ...reviewStyle.iframe, height: "1040px", transform: "scale(0.62)", width: "1440px" }}
                  title={`${candidate.label}, 1440px`}
                />
              </div>
            </section>

            <section style={reviewStyle.panel}>
              <header style={reviewStyle.previewHeader}><div><span style={reviewStyle.eyebrow}>LIVE SITES CANDIDATE</span><h2 style={reviewStyle.heading}>{candidate.label} · 390px</h2></div></header>
              <div style={{ ...reviewStyle.frame, height: "900px", width: "390px" }}>
                <iframe src={path} style={{ ...reviewStyle.iframe, height: "900px", width: "390px" }} title={`${candidate.label}, 390px`} />
              </div>
            </section>
          </Fragment>
        );
      })}
    </main>
  );
}
