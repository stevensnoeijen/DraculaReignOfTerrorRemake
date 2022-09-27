import { TypedJSON } from 'typedjson';

import { EntityDefinitions } from './EntityDefinitions';

export const serializer = new TypedJSON(EntityDefinitions);
