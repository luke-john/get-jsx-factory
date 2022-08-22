# Get JSX Factory

Utils for creating and maintaining custom jsx factories.

## Example usage

The following (deno) usage sets up a jsx factory that creates prosemirror nodes
using the prosmirror schema from "prosemirror-schema-basic".

```ts
import { schema } from "https://esm.sh/prosemirror-schema-basic@1.2.0";
import { getJSXFactory } from "https://raw.githubusercontent.com/luke-john/get-jsx-factory/mod.ts";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      doc: Record<string, never>;
      paragraph: Record<string, never>;
      text: Record<string, never>;
    }
  }
}

const handlers: { [key: string]: any } = {};

for (const [nodeName, node] of Object.entries(schema.nodes)) {
  handlers[nodeName] = ({ marks, attrs, children }: any) =>
    schema.node(nodeName, attrs, children, marks);
}

handlers["text"] = ({ marks, children }: any) => schema.text(children, marks);

export const pmJsxFactory = getJSXFactory(handlers);
```

And can then be used as follows

```tsx
/** @jsx pmJsxFactory */
import { pmJsxFactory } from "./ ... .ts";

function DemoFunction() {
  return <text>This is a test</text>;
}

export const functionTest = (
  <doc>
    <paragraph>
      <DemoFunction />
    </paragraph>
  </doc>
);
```
