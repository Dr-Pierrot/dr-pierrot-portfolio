import { mdxComponents } from "./lib/mdx-components";

export function useMDXComponents(components: any) {
  return {
    ...mdxComponents,
    ...components,
  };
}
