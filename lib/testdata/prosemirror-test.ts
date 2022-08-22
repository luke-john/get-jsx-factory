import { schema } from "https://esm.sh/prosemirror-schema-basic@1.2.0";

let doc = schema.node("doc", null, [
  schema.node("paragraph", null, [schema.text("One.")]),
  schema.node("horizontal_rule"),
  schema.node("paragraph", null, [schema.text("Two!")]),
]);

console.log(JSON.stringify(doc.toJSON(), null, 4));
