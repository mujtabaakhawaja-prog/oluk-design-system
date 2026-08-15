import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(
  new URL("../app/design-system/program-components.tsx", import.meta.url),
  "utf8",
);
const css = await readFile(
  new URL("../app/design-system/program-components.module.css", import.meta.url),
  "utf8",
);

test("continuation product and restock modules reuse canonical commerce and decision grammar", () => {
  assert.match(source, /<ProductCommerceCard[\s\S]*?product=\{mk2866Fixture\}[\s\S]*?variant="compact"/);
  assert.match(source, /data-candidate-component="RestockCard"[\s\S]*?<DecisionSurface/);
  assert.match(source, /actions=\{<ActionButton disabled>Not available<\/ActionButton>\}/);
  assert.doesNotMatch(source, /className=\{styles\.action\}|className="action"/);
  assert.doesNotMatch(css, /\.action(?:\b|:)/);
  assert.doesNotMatch(css, /\.recommendation(?:\b|\[)/);
});
