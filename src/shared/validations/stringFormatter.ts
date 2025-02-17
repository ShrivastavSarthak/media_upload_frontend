export const formatString = (
  template: string,
  variables: Record<string, string | number>
) => {
  return template.replace(
    /\{(\w+)\}/g,
    (_, key) => variables[key]?.toString() || `{${key}}`
  );
};
