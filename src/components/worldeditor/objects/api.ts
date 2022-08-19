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
