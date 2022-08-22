import { emit } from "https://deno.land/x/emit@0.6.0/mod.ts";
import { assertEquals } from "https://deno.land/std@0.152.0/testing/asserts.ts";

Deno.test("text test", async () => {
  const url = new URL("./testdata/text.tsx", import.meta.url);
  const result = await emit(url);

  const code = result[url.href];

  const codeMinusInlineSourceMap = code.substring(0, code.lastIndexOf("\n"));
  const jsxOnlyCode = codeMinusInlineSourceMap.substring(
    codeMinusInlineSourceMap.indexOf("/*#__PURE__*/ ") + 14,
    codeMinusInlineSourceMap.lastIndexOf(";"),
  );

  assertEquals(jsxOnlyCode, `testPmJsxFactory("text", null, "This is a test")`);
});
