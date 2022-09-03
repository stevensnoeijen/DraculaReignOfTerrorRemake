import { Entity } from 'sim-ecs';
import 'jest-location-mock';
import fetchMock from 'jest-fetch-mock';
import { nanoid } from 'nanoid';

fetchMock.enableMocks();

Entity.uuidFn = nanoid;
