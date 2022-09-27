import { EntityDefinitions } from '~/game/data/EntityDefinitions';
import { serializer } from '~/game/data/serializer';

const PATH = '/assets/entity-definitions.json';

export const getEntityDefinitions = async (): Promise<EntityDefinitions> => {
  const res = await fetch(PATH);

  return serializer.parse(await res.json())!;
};

export const saveEntityDefinitions = async (
  entityDefinitions: EntityDefinitions
) => {
  await fetch('http://localhost:3000' + PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: serializer.stringify(entityDefinitions),
  });
};
