import { EntityDefinitions } from '~/game/data/ObjectsJson';

const PATH = '/assets/entity-definitions.json';

export const getEntityDefinitions = async (): Promise<EntityDefinitions> => {
  const res = await fetch(PATH);

  return res.json();
};

export const saveEntityDefinitions = async (entities: EntityDefinitions) => {
  await fetch('http://localhost:3000' + PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entities),
  });
};
