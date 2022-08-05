export type Entity = {
  name: string;
  components: {
    type: string;
    properties: {
      field: string;
      value: string | boolean | number;
    }[];
  }[];
};

export const getEntities = async (): Promise<Entity[]> => {
  const res = await fetch('/assets/entities.json');

  return res.json();
};

export const saveEntities = async (entities: Entity[]) => {
  await fetch('http://localhost:3000/assets/entities.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entities),
  });
};
