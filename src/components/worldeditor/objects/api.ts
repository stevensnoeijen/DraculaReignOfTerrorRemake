import { GameObjects } from '~/game/data/ObjectsJson';

export const getObjects = async (): Promise<GameObjects> => {
  const res = await fetch('/assets/objects.json');

  return res.json();
};

export const saveObjects = async (entities: GameObjects) => {
  await fetch('http://localhost:3000/assets/objects.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entities),
  });
};
