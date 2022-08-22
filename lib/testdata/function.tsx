/** @jsx testPmJsxFactory */
import { testPmJsxFactory } from "./__test-pm-jsx-factory.ts";

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
