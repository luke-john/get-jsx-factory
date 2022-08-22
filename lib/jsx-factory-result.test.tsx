import { assertEquals } from "https://deno.land/std@0.152.0/testing/asserts.ts";

import { textTest } from "./testdata/text.tsx";
import { paragraphTest } from "./testdata/paragraph.tsx";
import { documentTest } from "./testdata/document.tsx";
import { functionTest } from "./testdata/function.tsx";

Deno.test("text test", () => {
  assertEquals(textTest.toJSON(), { text: "This is a test", type: "text" });
});

Deno.test("paragraph test", () => {
  assertEquals(paragraphTest.toString(), `paragraph("This is a test")`);
});

Deno.test("doc test", () => {
  assertEquals(documentTest.toString(), `doc(paragraph("This is a test"))`);
});

Deno.test("function test", () => {
  assertEquals(functionTest.toString(), `doc(paragraph("This is a test"))`);
});
