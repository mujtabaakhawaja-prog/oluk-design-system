# Localhost Capture and Figma Proof Pipeline

## Purpose

Use browser tooling to render Make bundles at deterministic viewports, inspect
layout defects and create exact proof artifacts before native Figma adoption or
production implementation.

This lane can baseline-capture existing bundles now. It becomes the formal
acceptance lane after the new foundation and completion runs produce source
bundles.

## Pipeline

```text
Make bundle or ZIP
→ provenance and manifest check
→ normalized local source directory
→ dependency install using the bundle's lockfile
→ deterministic localhost render
→ exact viewport and full-page captures
→ contact sheet and QA readback
→ Figma review-page import
→ human promotion decision
→ native Figma reconstruction
→ selective production implementation
```

## Preserve provenance

For every bundle retain:

- original archive and checksum;
- source file/project name;
- Make run and prompt identity;
- export time when available;
- source path and asset manifest;
- package manager and lockfile;
- route list;
- build/commit identifier;
- known missing assets or external dependencies.

Do not overwrite one run with another.

## Render matrix

At minimum capture:

- `1440×1000` desktop viewport;
- full-page 1440 desktop;
- `1024px` tablet;
- `390×844` mobile viewport;
- full-page 390 mobile.

Capture relevant open/active states:

- header and mega-menu;
- mobile drawer;
- PDP gallery;
- cart drawer and sticky CTA;
- collection filters and comparison;
- OpenLab source drawer and report preview;
- checkout validation;
- loading, empty, error, warning and success.

## QA readback

Record for every route:

- route and source bundle;
- viewport;
- original and rendered dimensions;
- capture path;
- crop mode;
- missing assets/fonts;
- overflow or text collision;
- sticky and overlay defects;
- image crop/fidelity;
- focus and reduced-motion observation;
- product/evidence truth issue;
- import readiness;
- disposition: accept, revise or block.

## Figma import roles

Browser captures can be imported as exact raster/image-fill nodes. They are
valuable for:

- pixel evidence;
- review contact sheets;
- crop and layout comparison;
- annotation;
- side-by-side fidelity checking.

Existing SVG assets can usually be imported as editable vectors.

React/HTML/CSS cannot be converted automatically into a production-grade native
Figma library. DOM import may create editable-looking layers, but it will not
reliably preserve Auto Layout, variables, component properties, nested
components or semantic variants.

For production editability, reconstruct the accepted design natively after the
champion lock. Keep exact raster evidence beside the editable reconstruction
and label its fidelity status.

## Authority rule

Imported captures remain staging evidence until human review. Do not promote
them into runtime code or final native Figma authority merely because the local
render succeeded.

