export const firstWordCapitalize = (string: string) => {
  const upperCase = string.replace(string[0], string[0].toUpperCase());

  return `${upperCase}${string.slice(1, 0)}`;
};
