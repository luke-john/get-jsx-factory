type StringCreateElementParams = [
  element: string,
  props: any,
  ...children: any[],
];
type FunctionCreateElementParams = [
  element: (props: { [key: string]: any; children: any[] }) => any,
  props: { [key: string]: any },
  ...children: any[],
];

type CreateElementParams =
  | StringCreateElementParams
  | FunctionCreateElementParams;

function isFunctionParams(
  params: CreateElementParams,
): params is FunctionCreateElementParams {
  return typeof params[0] !== "string";
}

export function getJSXFactory<OutputType>(
  components: {
    [key: string]: (props: any) => OutputType;
  },
) {
  function createElement(...params: CreateElementParams): OutputType {
    if (isFunctionParams(params)) {
      const [element, props, ...children] = params;

      const functionElementChildren = element({
        ...(props ?? {}),
        children,
      });

      return functionElementChildren;
    }

    return parseElement(...params);
  }

  function parseElement(...params: StringCreateElementParams): OutputType {
    const [element, props, ...children] = params;

    const elementHandler = components[element];

    if (!elementHandler) {
      throw new Error(`element handler for ${element} not registered`);
    }

    if (children.length === 0) {
      return elementHandler(props);
    }

    if (children.length === 1) {
      return elementHandler({ ...props, children: children[0] });
    }

    return elementHandler({ ...props, children });
  }

  return createElement;
}
