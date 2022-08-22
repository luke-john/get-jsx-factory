import { schema } from "https://esm.sh/prosemirror-schema-basic@1.2.0";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      doc: Record<string, never>;
      paragraph: Record<string, never>;
      text: Record<string, never>;
    }
  }
}

import { getJSXFactory } from "../get-jsx-factory.ts";

const handlers: { [key: string]: any } = {};

for (const [nodeName, node] of Object.entries(schema.nodes)) {
  handlers[nodeName] = ({ marks, attrs, children }: any) =>
    schema.node(nodeName, attrs, children, marks);
}

handlers["text"] = ({ marks, children }: any) => {
  if (children.length === 1) {
    return schema.text(children[0], marks);
  }
  return schema.text(children, marks);
};

export const testPmJsxFactory = getJSXFactory(handlers);
