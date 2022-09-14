import * as audiosprite from 'audiosprite';

export const getSounds = async (): Promise<audiosprite.Result> => {
  const res = await fetch('assets/sounds.json');

  return res.json();
};
