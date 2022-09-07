import { removeNullable } from '~/utils/array';

export class Options {
  [key: string]: string[] | undefined;
}

export const getOptions = (): Options => {
  if (window.location.hash.indexOf('?') === -1) {
    return new Options();
  }

  return window.location.hash
    .substring(window.location.hash.indexOf('?') + 1)
    .split('&')
    .filter(removeNullable)
    .map((option) => option.split('='))
    .reduce((acc, curr) => {
      acc[curr[0]] = curr[1].split(',').filter(removeNullable);
      return acc;
    }, new Options());
};
