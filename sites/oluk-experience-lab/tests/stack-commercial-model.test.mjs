import assert from "node:assert/strict";
import test from "node:test";

import {
  stackLevelFor,
  stackTotalFor,
  uniqueStackContributions,
} from "../app/design-system/stack-commercial-model.mjs";

test("stack completeness levels follow selected product count exactly", () => {
  assert.equal(stackLevelFor(1), "FOUNDATION");
  assert.equal(stackLevelFor(2), "STRONGER");
  assert.equal(stackLevelFor(3), "MAXIMUM");
  assert.equal(stackLevelFor(6), "MAXIMUM");
  assert.throws(() => stackLevelFor(0), /at least one selected product/);
});

test("MK-2866 plus LGD-4033 plus RAD-140 compiles the exact total", () => {
  assert.equal(stackTotalFor("£43", ["£44", "£55"]), 142);
});

test("stack contributions remain positive, bounded and deduplicated", () => {
  assert.deepEqual(
    uniqueStackContributions([
      ["LEAN MASS", "BODY COMPOSITION"],
      ["LEAN MASS"],
      ["STRENGTH", "LEAN MASS"],
    ]),
    ["LEAN MASS", "BODY COMPOSITION", "STRENGTH"],
  );
});
