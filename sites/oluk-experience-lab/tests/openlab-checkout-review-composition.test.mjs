import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readSite = (file) => readFile(path.join(siteRoot, file), "utf8");

test("OpenLab review leads with Hero Light and keeps confidence below the complete portal opening", async () => {
  const [hero, gallery, route, css, productExperienceCss] = await Promise.all([
    readSite("app/design-system/openlab-hero-light.tsx"),
    readSite("app/design-system/review-studio-gallery.tsx"),
    readSite("app/customer-routes.tsx"),
    readSite("app/design-system/openlab-hero-light.module.css"),
    readSite("app/design-system/openlab-product-experience.module.css"),
  ]);

  assert.match(hero, /data-openlab-composition="primary-portal"/);
  assert.match(hero, /data-openlab-review-role="primary-opening"/);
  assert.match(hero, /<form action="\/open-lab\/records"[^>]*method="get">/);
  assert.match(hero, /<ProductCommerceCard[\s\S]*?posture="destination"[\s\S]*?variant="featured"/);
  assert.match(hero, /const categoryDestinations = \[/);
  assert.match(hero, /aria-label="OpenLab product category destinations"/);
  assert.match(hero, /data-openlab-record-rail="static"/);
  assert.match(hero, /data-presentation-fixture="sites"/);
  assert.match(hero, /data-runtime-methodology-claim="none"/);
  assert.match(hero, /<EvidenceStatus compact state="verified" \/>/);
  assert.match(hero, /data-openlab-review-role="product-confidence"/);

  const openingIndex = hero.indexOf('data-openlab-review-role="primary-opening"');
  const railIndex = hero.indexOf('data-openlab-record-rail="static"');
  const confidenceIndex = hero.indexOf('data-openlab-review-role="product-confidence"');
  assert.ok(openingIndex >= 0 && openingIndex < railIndex, "the record rail follows the primary opening");
  assert.ok(railIndex < confidenceIndex, "product confidence remains below the opening and record rail");

  assert.match(gallery, /data-review-role="openlab-primary-customer-specimen"><OpenLabHeroLight\/>/);
  assert.ok(gallery.indexOf("<OpenLabHeroLight/>") < gallery.indexOf("<EvidenceRecordExplainer/>"));
  assert.doesNotMatch(gallery, /<OpenLabPortalHero\/>/);
  assert.ok(route.indexOf("<OpenLabHeroLight />") < route.indexOf("<OpenLabWayfinding />"));

  assert.doesNotMatch(hero, /Live batch verification feed|Every batch\. Every report\. Public\.|99\.55%|0\s*Failures/i);
  assert.match(css, /grid-template-columns:\s*minmax\(0, 1\.02fr\) minmax\(390px, 1\.05fr\) minmax\(244px, 0\.58fr\)/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 600px\)/);
  assert.doesNotMatch(css, /#(?:[0-9a-f]{3}){1,2}\b/i);
  assert.doesNotMatch(productExperienceCss, /margin-inline:\s*calc\(var\(--oluk-space-4\) \* -1\)/);
});

test("checkout review separates the canonical customer specimen from the owner-only state matrix", async () => {
  const [transaction, gallery, css] = await Promise.all([
    readSite("app/design-system/transaction-presentation.tsx"),
    readSite("app/design-system/review-studio-gallery.tsx"),
    readSite("app/transaction-presentation.module.css"),
  ]);

  const reviewStart = transaction.indexOf("function ReviewContent");
  const reviewEnd = transaction.indexOf("\nfunction HandoffContent", reviewStart);
  const reviewContent = transaction.slice(reviewStart, reviewEnd);
  assert.match(reviewContent, /data-review-role="canonical-customer-specimen"/);
  assert.match(reviewContent, /Everything together before payment\./);
  assert.match(reviewContent, /Secure payment handoff/);
  assert.doesNotMatch(reviewContent, /owner-only-state-matrix|data-owner-only/);

  assert.match(gallery, /data-review-role="checkout-primary-customer-specimen"><TransactionPresentation stage="review" \/>/);
  assert.match(gallery, /<CheckoutOwnerReviewMatrix \/>/);
  assert.ok(
    gallery.indexOf('<TransactionPresentation stage="review" />') < gallery.indexOf("<CheckoutOwnerReviewMatrix />"),
    "the owner-only matrix follows the primary customer specimen",
  );

  const matrixStart = gallery.indexOf("function CheckoutOwnerReviewMatrix");
  const matrixEnd = gallery.indexOf("\nexport function ReviewStudioGallery", matrixStart);
  const matrix = gallery.slice(matrixStart, matrixEnd);
  assert.match(matrix, /data-review-role="owner-only-state-matrix"/);
  assert.match(matrix, /data-owner-only="true"/);
  assert.match(matrix, /data-live-authority="false"/);
  assert.match(matrix, /data-commerce-mutation="none"/);
  assert.match(matrix, /data-payment-topology="preserve-only"/);
  for (const state of ["checkout-step", "lifecycle", "unavailable", "failure", "recovery"]) {
    assert.match(matrix, new RegExp(`data-review-state="${state}"`), state);
  }
  assert.match(matrix, /<CheckoutStepIndicator current=\{step\} \/>/);
  assert.match(matrix, /<LifecycleAmountRecord stage="confirmation" \/>/);
  assert.match(matrix, /<LifecycleAmountRecord stage="receipt" \/>/);
  assert.match(matrix, /<TechnicalSurface[\s\S]*?state="unavailable"[\s\S]*?title="Order details are unavailable\."/);
  assert.doesNotMatch(matrix, /fetch\s*\(|XMLHttpRequest|WebSocket|localStorage|sessionStorage|onSubmit|formAction|use server|server action/i);

  assert.match(css, /\.reviewPanel\s*\{/);
  assert.match(css, /\.reviewFacts\s*\{[\s\S]*?grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.ownerReviewMatrix\s*\{/);
  assert.match(css, /\.ownerReviewGrid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
});
