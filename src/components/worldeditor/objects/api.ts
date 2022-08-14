import * as audiosprite from 'audiosprite';

import { GameObject } from './ObjectsJson';

export const getObjects = async (): Promise<GameObject[]> => {
  const res = await fetch('/assets/objects.json');

  return res.json();
};

export const saveObjects = async (entities: GameObject[]) => {
  await fetch('http://localhost:3000/assets/objects.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entities),
  });
};

export const getSounds = async (): Promise<audiosprite.Result> => {
  const res = await fetch('/assets/sounds.json');

  return res.json();
};
