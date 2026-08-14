import { ActionButton, ActionLink } from "../../design-system/action-control";
import {
  DecisionSurface,
  EditorialSurface,
  TechnicalSurface,
  TransactionIntroCard,
} from "../../design-system/content-surfaces";
import {
  SectionIntroduction,
  SurfaceGrid,
  SurfaceGridZone,
} from "../../design-system/surface-grid";
import styles from "./surface-grammar.module.css";

export default function SurfaceGrammarSpecimenPage() {
  return (
    <main className={styles.page} data-grammar-strict="true" id="main-content">
      <SurfaceGrid>
        <SurfaceGridZone className={styles.intro} zone="lead">
          <SectionIntroduction
            eyebrow="GRID + COPY SURFACE GRAMMAR"
            headingLevel="h1"
            title="A luminous canvas. Governed objects. Readable customer decisions."
          />
        </SurfaceGridZone>

        <SurfaceGridZone zone="full">
          <EditorialSurface
            copy="The canvas separates independent objects. Customer explanation, product value and the next decision stay inside a declared surface with a readable secondary-text role."
            eyebrow="EDITORIAL SURFACE"
            secondaryCopy="Only a bounded eyebrow and heading may introduce a section directly on the canvas; supporting copy, actions, media and chips move into the governed object below."
            title="Keep the story and its explanation together."
          />
        </SurfaceGridZone>

        <SurfaceGridZone zone="split-start">
          <DecisionSurface
            actions={<ActionButton>Confirm this decision</ActionButton>}
            copy="Use a decision surface when the customer must understand a choice and act without hunting across the page."
            eyebrow="DECISION SURFACE"
            title="Put the reason beside the action."
          />
        </SurfaceGridZone>

        <SurfaceGridZone zone="split-end">
          <TechnicalSurface
            actions={<ActionLink href="/open-lab/methodology" variant="secondary">See the method</ActionLink>}
            copy="Technical detail gains confidence when its source, meaning and onward customer path remain visibly connected."
            eyebrow="TECHNICAL SURFACE"
            title="Make evidence useful, not decorative."
          />
        </SurfaceGridZone>

        <SurfaceGridZone zone="centre">
          <TransactionIntroCard
            actions={
              <>
                <ActionButton disabled>Unavailable action</ActionButton>
                <ActionButton pending pendingLabel="Preparing your next step">Pending action</ActionButton>
                <ActionLink href="/shop" variant="quiet">A deliberately long quiet action label that remains readable at 390</ActionLink>
              </>
            }
            copy="Transaction copy explains the current step before a customer commits. Disabled and pending states remain semantic, legible and at least 44 pixels high."
            eyebrow="ACTION CONTROL STATES"
            title="One control family for links and buttons."
          />
        </SurfaceGridZone>

        <SurfaceGridZone zone="pdp-media">
          <div aria-label="PDP media chamber exception specimen" className={styles.mediaSpecimen}>
            <span>PDP MEDIA CHAMBER</span>
          </div>
        </SurfaceGridZone>
        <SurfaceGridZone zone="pdp-purchase">
          <DecisionSurface
            copy="The PDP first fold is the sole media-and-purchase decision-pair exception. Product explanation still belongs inside the purchase surface."
            eyebrow="DECLARED PDP EXCEPTION"
            title="Media and purchase remain one decision."
          />
        </SurfaceGridZone>
      </SurfaceGrid>
    </main>
  );
}
