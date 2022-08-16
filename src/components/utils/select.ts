import { SelectOption } from 'naive-ui';

export const stringsToSelectOptions = (
  values: readonly string[]
): SelectOption[] => {
  return values.map((value) => ({
    label: value,
    value: value,
  }));
};
