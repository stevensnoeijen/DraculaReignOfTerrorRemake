import { SelectOption } from 'naive-ui';
import * as audiosprite from 'audiosprite';

export const soundsToSelectOptions = (
  sounds: audiosprite.Result
): SelectOption[] => {
  return Object.keys(sounds.spritemap).map((key) => ({
    label: key,
    value: key,
  }));
};

export const stringsToSelectOptions = (values: string[]): SelectOption[] => {
  return values.map((value) => ({
    label: value,
    value: value,
  }));
};
