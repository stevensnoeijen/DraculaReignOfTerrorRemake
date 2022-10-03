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
