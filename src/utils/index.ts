export const ellipsize = (value: unknown, maxLength: number) => {
  const stringifiedValue = String(value);

  return (
    stringifiedValue.substring(0, 3) +
    (stringifiedValue.length > maxLength ? '...' : '')
  );
};
